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

  private _selectedFile: string;
  boardSubscription: Subscription;
  activeBoard:Board;
  boardtitle = '';

  constructor(private _dataService: DataService, 
              public dialogRef: MatDialogRef<BoardSettingsDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this._selectedFile = "";
    this.boardSubscription = this._dataService._activeBoard$.subscribe(data => this.activeBoard = data);
    this.boardtitle = this.activeBoard.title;
  }

  onNoClick(): void {
    this.dialogRef.close();
    this._selectedFile = "";
  }

  deleteBoard(){
    var boardName = this.activeBoard.title;
    this._dataService.deleteBoard(boardName);
    this._dataService.getBoards();
  }

  onChange(event){
    this._selectedFile = event.srcElement.files[0].path;
  }

  renameBoard(){
    this.activeBoard.title = this.boardtitle;
    this.dialogRef.close();
  }
  
}
