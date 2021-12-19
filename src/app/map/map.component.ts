import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Command, CommandService } from './Command.service';
import { VillageService } from './Village.service';
import { VillageModalComponent } from './villageModal/villageModal.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('canvas', { static: true }) 
  private canvas: ElementRef<HTMLCanvasElement> | undefined;

  private ctx: CanvasRenderingContext2D

  ////private testdata = [{x: 0, y: 0, c: "#ff0000", name: "bob's villa"}, {x: 6, y: 1, c: "#00f", name: "harry's villa"}, {x: 7, y: 1, c: "#00f", name: "derpirino"}];

  // position and zoom of the "camera" defines wat to render
  private campos = {x: 0, y: 0, z: 100};


  private centercanvas = {x: 300, y: 300};

  private images: Array<HTMLImageElement> = [];

  private interactors = [{x: 0, y: 0, w: 0, h: 0, callback: () => console.log("default"), name: "", id: 1}];

  private lastmousepos = {x: 0, y: 0, buttons: 0}

  constructor(public dialog: MatDialog, private villageService: VillageService, private commandService: CommandService) { 
    if(this.canvas != null) this.ctx = this.canvas.nativeElement.getContext('2d'); 

  }

  ngOnInit() {

    this.ctx = this.canvas.nativeElement.getContext('2d');

    ////console.log(this.ctx)

    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight - 64;

    this.centercanvas.x = this.canvas.nativeElement.width /2;
    this.centercanvas.y = this.canvas.nativeElement.height /2;

    this.images["town"] = new Image();
    this.images["town"].src = "../../assets/Town.png"
    this.images["ground"] = new Image();
    this.images["ground"].src = "../../assets/ground.png"


    this.canvas.nativeElement.onwheel = (ev: WheelEvent) => this.onmousewheel(ev);
    this.canvas.nativeElement.onmousemove = (ev: MouseEvent) => this.onmousemove(ev);
    this.canvas.nativeElement.onclick = (ev: MouseEvent) => this.onmouseclick(ev);

    ////setInterval(() => this.update(), 100);
    ////this.update()
    window.requestAnimationFrame(this.update.bind(this))
  }

  private async update() {
    let villages = await this.villageService.GetVillages();


    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.generatebackground();
    ////console.log(this.campos)
    this.interactors = [];

    // draw villages
    for (let i = 0; i < villages.length; i++) {
      const element= villages[i];
      
      // todo: user current user here
      this.ctx.fillStyle = element.ownerId == this.villageService.OwnerId ? '#00f' : '#f00'

      if(this.villageService.SelectedVillage == element.id)
      {
        this.ctx.fillStyle = '#0f0';
      }

      let posx = this.centercanvas.x + (element.x + this.campos.x) * this.campos.z;
      let posy = this.centercanvas.y + (element.y + this.campos.y) * this.campos.z;

      ////this.ctx.fillRect(posx, posy, this.campos.z, this.campos.z);
      this.ctx.beginPath();
      
      this.ctx.rect(posx, posy, this.campos.z, this.campos.z);
      ////this.ctx.fill()

      if(this.ctx.isPointInPath(this.lastmousepos.x, this.lastmousepos.y))
      {
        this.ctx.filter = "brightness(120%)";

        if(this.lastmousepos.buttons === 1)
        {
          this.lastmousepos.buttons = 0;
          
        }

      }
      this.ctx.drawImage(this.images["town"], posx, posy, this.campos.z, this.campos.z);

      this.ctx.filter = "none";

      this.ctx.font = `normal ${this.campos.z / 6}px Arial`;
      this.ctx.fillText(element.name, posx + this.campos.z / 10, posy - this.campos.z / 20)

      this.interactors.push({x: posx, y: posy, w: this.campos.z, h: this.campos.z, callback: () => console.log(element.name), name: element.name, id: element.id})

      ////console.log(`drawing at x${posx} and y${posy} - mouse at x${this.lastmousepos.x} y${this.lastmousepos.y}`)
      
    }

    // draw commands
    let commands = await this.commandService.GetCommands()
    for (let index = 0; index < commands.length; index++) {
      const element = commands[index];
      
      let originVil = villages.find( x => x.id == element.originVillageId);

      let originVilPos = this.ToCanvasPos(originVil.x + 0.5, originVil.y + 0.5);

      let targetVil = villages.find( x => x.id == element.targetVillageId);
      let targetVilPos = this.ToCanvasPos(targetVil.x + 0.5, targetVil.y + 0.5);

      this.ctx.beginPath();       // Start a new path
      //this.ctx.setLineDash([20, 40]);
      this.ctx.moveTo(originVilPos.x, originVilPos.y);    // Move the pen 
      this.ctx.lineTo(targetVilPos.x, targetVilPos.y);  // Draw a line 
      this.ctx.stroke();          // Render the path

      let rect = this.ToCanvasPos(targetVil.x + 0.40, targetVil.y + 0.40);
      this.ctx.fillRect(rect.x, rect.y, this.campos.z * 0.2, this.campos.z * 0.2);


      // render army pos
      let totalduration = element.arrivalTime - element.startTime;
      let timeWalked = (Date.now() / 1000 | 0) - element.startTime;
      let timeTillEnd = element.arrivalTime - (Date.now() / 1000 | 0);

      let progress = timeWalked / totalduration;
      if(progress > 1) progress = 1;

      // army position
      let armyx = originVil.x + ((targetVil.x - originVil.x) * progress) + 0.5;
      let armyy = originVil.y + ((targetVil.y - originVil.y) * progress) + 0.5;
      ////console.log(progress)

      let armypos = this.ToCanvasPos(armyx -0.1, armyy - 0.1);

      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(armypos.x, armypos.y, this.campos.z * 0.2, this.campos.z * 0.2);
      this.ctx.fillStyle = '#fff';
      this.ctx.fillText(timeTillEnd.toString() + "", armypos.x + this.campos.z / 100, armypos.y + this.campos.z / 6)

    }

    window.requestAnimationFrame(this.update.bind(this))
  }

  private onmousewheel(ev: WheelEvent)
  {
    ev.preventDefault();

    const wheel = ev.deltaY < 0 ? 1 : -1;
    this.campos.z *=  (10 + wheel) / 10; // scroll by 10% increase / decrease

    if(this.campos.z < 50) this.campos.z = 50;
    if(this.campos.z > 300) this.campos.z = 300;

  }

  private onmousemove(ev: MouseEvent) {
    
    // move map on drag
    if(ev.buttons === 1)
    {
      this.campos.x += ev.movementX / this.campos.z;
      this.campos.y += ev.movementY / this.campos.z;
    }

    this.lastmousepos.x = ev.offsetX;
    this.lastmousepos.y = ev.offsetY;
    this.lastmousepos.buttons = ev.buttons;
  }

  private onmouseclick(ev: MouseEvent) 
  {
    //check hitboxes
    for (let i = 0; i < this.interactors.length; i++) {
      const element = this.interactors[i];

      if(element.x < ev.offsetX && ev.offsetX < element.x + this.campos.z
        && element.y < ev.offsetY && ev.offsetY < element.y + this.campos.z)
      {
        this.openDialog(element.id)
        return;
      }
    }
  }

  private generatebackground() {
    let size = 260 * this.campos.z / 20;

    let pattern = this.ctx.createPattern(this.images["ground"], "repeat");

    this.ctx.fillStyle = pattern;
    this.ctx.fillRect(0, 0, this.centercanvas.x * 2, this.centercanvas.y * 2);
    
    //// for (let x = 0; x < this.centercanvas.x * 2 / size; x++) {
    ////   for (let y = 0; y < this.centercanvas.y * 2 / size; y++) {
        
    ////     this.ctx.drawImage(this.images["ground"], x * size, y * size, size, size)
    ////   }
    //// }

  }

  private ToCanvasPos(x : number, y: number) : {x : number, y: number}
  {
    let canvasx = this.centercanvas.x + (x + this.campos.x) * this.campos.z;
    let canvasy = this.centercanvas.y + (y + this.campos.y) * this.campos.z;

    return {x: canvasx, y: canvasy}
  }

  private openDialog(id :number)
  {
    let rect = this.canvas.nativeElement.getBoundingClientRect();

    let x = rect.left + window.scrollX + this.lastmousepos.x
    let y = rect.top + window.screenY + this.lastmousepos.y
    
    const dialogRef = this.dialog.open(VillageModalComponent, {data: {id}, position: {top: y + 'px', left:  x + 'px'}, panelClass: 'dialog-no-padding'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
