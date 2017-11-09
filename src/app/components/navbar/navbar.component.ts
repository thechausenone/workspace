import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {Board} from './objects/board.object'
import {DataService} from '../../providers/data.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {BoardDialogComponent} from '../board-dialog/board-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
   boards: Array<Board>;

  constructor(private _dataService: DataService, private dialog: MatDialog) {
    this.getBoards();
  }

  setActiveBoard(board:Board){
    this._dataService.setActiveBoard(board);
  }

  private getBoards(){
    this._dataService.getBoards()
                      .subscribe(
                          boards => {
                              this.boards = boards
                          }
                      );
  }

  addBoard(){
    //replace these with dynamic title/icon
    let dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '500px',
      data: {name: "", icon: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deleteBoard(){
    //replace these with dynamic board name
    var boardName = "the first board";
    this._dataService.deleteBoard(boardName);
    this._dataService.getBoards();
  }
}