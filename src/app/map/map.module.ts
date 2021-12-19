import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MaterialModule } from '../shared/material/materialModule';
import { VillageModalComponent } from './villageModal/villageModal.component';
import { VillageViewComponent } from './VillageView/VillageView.component';
import { VillageService } from './Village.service';
import { VillageCommandComponent } from './VillageCommand/VillageCommand.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommandService } from './Command.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [MapComponent, VillageModalComponent, VillageViewComponent, VillageCommandComponent],
  entryComponents: [
    VillageModalComponent, VillageViewComponent, VillageCommandComponent
  ],
  providers: [VillageService, CommandService]
})
export class MapModule { }
