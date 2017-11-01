import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material';

@Component({
  selector: 'app-board-creation',
  templateUrl: './board-creation.component.html',
  styleUrls: ['./board-creation.component.scss']
})

export class BoardCreationComponent {
  
    constructor(
      public dialogRef: MatDialogRef<BoardCreationComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
     // @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
 
