import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnitDTO, villageDataDTO, VillageService } from '../Village.service';

@Component({
  selector: 'app-village-view',
  templateUrl: './VillageView.component.html',
  styleUrls: ['./VillageView.component.scss']
})
export class VillageViewComponent implements OnInit {

  public villageData: villageDataDTO;

  public UnitData: UnitDTO[];

  public selection = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}, private villageService: VillageService) { }

  ngOnInit() {
    this.villageData = this.villageService.GetVillageData(this.data.id);
    this.UnitData = this.villageService.UnitData;
    
    console.log(this.villageData);
  }

}
