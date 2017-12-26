import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Board} from '../navbar/objects/board.object';
import { Subscription } from "rxjs/Subscription";
import { StateManagerService } from "../../providers/state-manager.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-settings-dialog',
  templateUrl: './board-settings-dialog.component.html',
  styleUrls: ['./board-settings-dialog.component.scss']
})
export class BoardSettingsDialogComponent {
  activeBoard:Board;
  icon = '';
  boardtitle = '';

  constructor(private stateManagerService:StateManagerService,
              public dialogRef: MatDialogRef<BoardSettingsDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) {
    this.activeBoard = (this.stateManagerService.GetBoards())[this.stateManagerService.GetActiveBoardIndex()];
    this.boardtitle = this.activeBoard.title;
    this.icon = this.activeBoard.icon;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  applyChanges(){
    this.activeBoard.title = this.boardtitle;
    this.activeBoard.icon = this.icon;
    this.dialogRef.close();
  }
  
}
