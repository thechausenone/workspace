import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { StateManagerService } from '../../../../providers/state-manager.service';

@Component({
  selector: 'app-window-dialog',
  templateUrl: './window-dialog.component.html',
  styleUrls: ['./window-dialog.component.scss']
})
export class WindowDialogComponent {
  filePath: string;
  name: string;

  constructor(private stateManagerService: StateManagerService, 
              public dialogRef: MatDialogRef<WindowDialogComponent>) {
    this.name = "Default Name"
    this.filePath = "";
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createWindow(): void {
    this.stateManagerService.AddWindow(this.name, this.filePath);
    this.closeDialog();
  }

  onChange(event){
    this.filePath = event.srcElement.files[0].path;
  }
}
