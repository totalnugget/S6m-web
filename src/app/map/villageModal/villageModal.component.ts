import { ComponentType } from '@angular/cdk/portal';
import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { villageDataDTO, VillageService } from '../Village.service';
import { VillageCommandComponent } from '../VillageCommand/VillageCommand.component';
import { VillageViewComponent } from '../VillageView/VillageView.component';

@Component({
  selector: 'app-village-modal',
  templateUrl: './villageModal.component.html',
  styleUrls: ['./villageModal.component.scss']
})
export class VillageModalComponent implements OnInit {

  public CurrentVillage: villageDataDTO;
  public id: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}, private dialogRef: MatDialogRef<VillageModalComponent>, public dialog: MatDialog, public vilageService: VillageService, public authService: AuthService) { }

  async ngOnInit() {
    this.CurrentVillage = await this.vilageService.GetVillageData(this.data.id);
    this.id = this.authService.getSubId();
    console.log(this.CurrentVillage);
    console.log(this.CurrentVillage.ownerId);
  }

  onSelect() {
    this.vilageService.SelectedVillage = this.data.id;
  }

  onHome() {
    this.openDialog(VillageViewComponent);
  }

  onCommand(attacktype: string) {
    this.openDialog(VillageCommandComponent, {attacktype});
  }


  private openDialog<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, data: object = null)
  {
    this.dialogRef.close();

    const dialogRef = this.dialog.open(componentOrTemplateRef, {autoFocus: false, data: {...this.data, ...data}, panelClass: ''});
  }

}
