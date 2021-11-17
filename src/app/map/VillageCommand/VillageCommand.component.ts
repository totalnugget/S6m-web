import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnitDTO, villageDataDTO, VillageService } from '../Village.service';

@Component({
  selector: 'app-VillageCommand',
  templateUrl: './VillageCommand.component.html',
  styleUrls: ['./VillageCommand.component.scss']
})
export class VillageCommandComponent implements OnInit {

  public villageData: villageDataDTO;

  public unitdata: UnitDTO[];

  public selection = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number, attacktype: string}, public villageService: VillageService) { }

  ngOnInit() {
    this.villageData = this.villageService.GetVillageData(this.villageService.SelectedVillage);
    this.unitdata = this.villageService.UnitData;
  }

}
