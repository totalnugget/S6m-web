import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Command, CommandService } from '../Command.service';
import { UnitAmountDTO, UnitDTO, villageDataDTO, VillageService } from '../Village.service';

@Component({
  selector: 'app-VillageCommand',
  templateUrl: './VillageCommand.component.html',
  styleUrls: ['./VillageCommand.component.scss']
})
export class VillageCommandComponent implements OnInit {

  public villageData: villageDataDTO;

  public targetVil: villageDataDTO;

  public unitdata: UnitDTO[];

  public selection: number[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number, attacktype: string}, public villageService: VillageService, public commandService: CommandService) { }

  async ngOnInit() {
    this.villageData = await this.villageService.GetVillageData(this.villageService.SelectedVillage);
    this.targetVil = await this.villageService.GetVillageData(this.data.id);
    this.unitdata = this.villageService.UnitData;

    console.log(this.villageData);
  }

  OnAttack()
  {
    // create command
    let newCommand = new Command();
    newCommand.ownerId = this.villageData.ownerId;
    newCommand.targetVillageId = this.targetVil.id;
    newCommand.originVillageId = this.villageData.id;
    newCommand.type = this.data.attacktype;
    
    for (let index = 0; index < this.selection.length; index++) {
      const element = this.selection[index];

      if(!element) continue;

      newCommand.unitCount.push(new UnitAmountDTO({unitId : index + 1, amount : element}))
      
    }

    // send to server
    let result = this.commandService.CreateCommands(newCommand);

    result.then(x => {
      this.commandService.GetCommands(true)
    })

    console.log(result);
  }

  Validate()
  {
    
  }

  getunitamount(unitId: number): number
  {
    let unitCount: UnitAmountDTO = this.villageData.unitCount.find(x => x.unitId == unitId)
    if(unitCount == null)
    {
      return 0;
    }

    return unitCount.amount
   
  }

}
