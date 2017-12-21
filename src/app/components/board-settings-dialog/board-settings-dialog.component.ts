import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DataService} from '../../providers/data.service';
import {Board} from '../navbar/objects/board.object';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-board-settings-dialog',
  templateUrl: './board-settings-dialog.component.html',
  styleUrls: ['./board-settings-dialog.component.scss']
})
export class BoardSettingsDialogComponent {
  boardSubscription: Subscription;
  activeBoard:Board;
  icon = '';
  boardtitle = '';

  constructor(private _dataService: DataService, 
              public dialogRef: MatDialogRef<BoardSettingsDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.boardSubscription = this._dataService._activeBoard$.subscribe(data => this.activeBoard = data);
    this.boardtitle = this.activeBoard.title;
    this.icon = this.activeBoard.icon;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteBoard(){
    var boardName = this.activeBoard.title;
    this._dataService.deleteBoard(boardName);
    this._dataService.getBoards();
  }

  renameBoard(){
    this.activeBoard.title = this.boardtitle;
    this.activeBoard.icon = this.icon;
    this.dialogRef.close();
  }
  
}
