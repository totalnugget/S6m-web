import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MaterialModule } from '../shared/material/materialModule';
import { VillageModalComponent } from './villageModal/villageModal.component';
import { VillageViewComponent } from './VillageView/VillageView.component';
import { VillageService } from './Village.service';
import { VillageCommandComponent } from './VillageCommand/VillageCommand.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [MapComponent, VillageModalComponent, VillageViewComponent, VillageCommandComponent],
  entryComponents: [
    VillageModalComponent, VillageViewComponent, VillageCommandComponent
  ],
  providers: [VillageService]
})
export class MapModule { }
