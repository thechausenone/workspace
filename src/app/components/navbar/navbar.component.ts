import { Component, ViewChild } from '@angular/core';
import {NgIf} from '@angular/common';
import {Board} from './objects/board.object'
import {Window} from '../grid/objects/window.object';
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
   windows: Array<Window>;
  @ViewChild('sidenav') sideNav:any;

  constructor(private _dataService: DataService, private dialog: MatDialog) {
    this.getBoards();
  }

  handleSideNavToggle(board:Board){
    if (!(this.checkIfActiveBoard(board) == false && this.sideNav.opened == true)){
      this.sideNav.toggle();
    }
    this.setActiveBoard(board);
    this.windows = board.windows;
  }

  checkIfActiveBoard(board:Board):boolean{
    return this._dataService.checkIfActiveBoard(board);
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