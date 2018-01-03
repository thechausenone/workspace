import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BrowserWindow } from 'electron';

@Component({
  selector: 'app-exit-dialog',
  templateUrl: './exit-dialog.component.html',
  styleUrls: ['./exit-dialog.component.scss']
})
export class ExitDialogComponent {

  constructor(public dialogRef: MatDialogRef<ExitDialogComponent>,  
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  quitApp(): void {
    this.data.close();
  }

}
