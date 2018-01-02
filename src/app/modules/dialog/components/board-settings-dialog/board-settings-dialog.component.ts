import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Board } from '../../../../components/navbar/objects/board.object';
import { StateManagerService } from '../../../../providers/state-manager.service';
import { IconOptions } from '../icon-options';

@Component({
  selector: 'app-board-settings-dialog',
  templateUrl: './board-settings-dialog.component.html',
  styleUrls: ['./board-settings-dialog.component.scss']
})
export class BoardSettingsDialogComponent {
  activeBoard: Board;
  name = '';
  icon = '';
  icons: Array<string>;

  constructor(private stateManagerService: StateManagerService,
              public dialogRef: MatDialogRef<BoardSettingsDialogComponent>) {
    this.activeBoard = (this.stateManagerService.GetBoards())[this.stateManagerService.GetActiveBoardIndex()];
    this.name = this.activeBoard.title;
    this.icon = this.activeBoard.icon;
    this.icons = IconOptions;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  applyChanges() {
    this.activeBoard.title = this.name;
    this.activeBoard.icon = this.icon;
    this.closeDialog();
  }
}
