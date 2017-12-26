import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { StateManagerService } from '../../providers/state-manager.service';

@Component({
  selector: 'app-window-dialog',
  templateUrl: './window-dialog.component.html',
  styleUrls: ['./window-dialog.component.scss']
})
export class WindowDialogComponent {
  private _selectedFile: string;

  constructor(private stateManagerService: StateManagerService, 
              public dialogRef: MatDialogRef<WindowDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this._selectedFile = "";
  }

  onNoClick(): void {
    this.dialogRef.close();
    this._selectedFile = "";
  }

  createWindow(name): void {
    this.stateManagerService.AddWindow(name, this._selectedFile);
    this.dialogRef.close();
  }

  onChange(event){
    this._selectedFile = event.srcElement.files[0].path;
  }
  
}
