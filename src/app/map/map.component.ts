import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D


  private testdata = [{x: 0, y: 0, c: "#ff0000", name: "bob's villa"}, {x: 6, y: 1, c: "#00f", name: "harry's villa"}, {x: 7, y: 1, c: "#00f", name: "derpirino"}];

  private campos = {x: 0, y: 0, z: 100};

  private centercanvas = {x: 300, y: 300};

  private images: Array<HTMLImageElement> = [];

  constructor() { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.canvas.nativeElement.width = 1000;
    this.canvas.nativeElement.height = 1000;

    this.centercanvas.x = this.canvas.nativeElement.width /2;
    this.centercanvas.y = this.canvas.nativeElement.height /2;

    this.images["town"] = new Image();
    this.images["town"].src = "../../assets/Town.png"
    this.images["ground"] = new Image();
    this.images["ground"].src = "../../assets/ground.png"

    

    this.canvas.nativeElement.onwheel = (ev: WheelEvent) => this.onmousewheel(ev);
    this.canvas.nativeElement.onmousemove = (ev: MouseEvent) => this.onmousemove(ev);

    //setInterval(() => this.update(), 100);
    //this.update()
    window.requestAnimationFrame(this.update.bind(this))
  }
  

  update() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.generatebackground();
    //console.log(this.campos)
    for (let i = 0; i < this.testdata.length; i++) {
      const element= this.testdata[i];
      
      this.ctx.fillStyle = element.c;


      let posx = this.centercanvas.x + (element.x + this.campos.x) * this.campos.z;
      let posy = this.centercanvas.y + (element.y + this.campos.y) * this.campos.z;

      //this.ctx.fillRect(posx, posy, this.campos.z, this.campos.z);
      this.ctx.drawImage(this.images["town"], posx, posy, this.campos.z, this.campos.z);

      this.ctx.font = `normal ${this.campos.z / 6}px Arial`;
      this.ctx.fillText(element.name, posx + this.campos.z / 10, posy - this.campos.z / 20)

      //console.log(`drawing at x${posx} and y${posy}`)
      
    }

    window.requestAnimationFrame(this.update.bind(this))
  }

  onmousewheel(ev: WheelEvent)
  {
    ev.preventDefault();

    const wheel = ev.deltaY < 0 ? 1 : -1;
    this.campos.z *=  (10 + wheel) / 10; // scroll by 10% increase / decrease

    if(this.campos.z < 50) this.campos.z = 50;
    if(this.campos.z > 300) this.campos.z = 300;

  }

  onmousemove(ev: MouseEvent) {
    
    if(ev.buttons === 1)
    {
      this.campos.x += ev.movementX / this.campos.z;
      this.campos.y += ev.movementY / this.campos.z;
    }
  }

  generatebackground() {
    let size = 260 * this.campos.z / 20;


    let pattern = this.ctx.createPattern(this.images["ground"], "repeat");

    this.ctx.fillStyle = pattern;
    this.ctx.fillRect(0, 0, this.centercanvas.x * 2, this.centercanvas.y * 2)
    
    // for (let x = 0; x < this.centercanvas.x * 2 / size; x++) {
    //   for (let y = 0; y < this.centercanvas.y * 2 / size; y++) {
        
    //     this.ctx.drawImage(this.images["ground"], x * size, y * size, size, size)
    //   }
    // }

  }


}
