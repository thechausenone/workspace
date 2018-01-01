import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { StateManagerService } from '../../../../providers/state-manager.service';
import { IconOptions } from '../icon-options';

@Component({
  selector: 'app-board-dialog',
  templateUrl: './board-dialog.component.html',
  styleUrls: ['./board-dialog.component.scss']
})

export class BoardDialogComponent {
  name: string;
  icon: string;
  icons: Array<string>;

  constructor(private stateManagerService: StateManagerService, 
              public dialogRef: MatDialogRef<BoardDialogComponent>) {
      this.name = 'Default Name';
      this.icon = 'web';
      this.icons = IconOptions;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveBoard(): void {
    this.stateManagerService.AddBoard(this.name, this.icon);
    this.closeDialog();
  }
}
