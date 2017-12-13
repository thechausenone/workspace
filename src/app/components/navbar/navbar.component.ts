import { Component, ViewChild } from '@angular/core';
import {NgIf} from '@angular/common';
import {Board} from './objects/board.object'
import {Window} from '../grid/objects/window.object';
import {DataService} from '../../providers/data.service';
import {ElectronService} from '../../providers/electron.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {BoardDialogComponent} from '../board-dialog/board-dialog.component';
import {WindowDialogComponent} from '../window-dialog/window-dialog.component';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
   boards: Array<Board>;
   boardSubscription: Subscription;
   activeBoard:Board;
   windows: Array<Window>;
  @ViewChild('sidenav') sideNav:any;

  constructor(private _dataService: DataService,
              private _electronService: ElectronService, 
              private dialog: MatDialog) {
    this.getBoards();
    this.boardSubscription = this._dataService._activeBoard$.subscribe(data => this.activeBoard = data);
  }

  mapWindowsToDesktop():void{
    console.log("Map windows to desktop!");
    this._electronService.openBoard(this.activeBoard);
  }
  
  handleSideNavToggle(board:Board = null){
    //case for non-board tab closing
    if (board == null){
      if (this.sideNav.opened == true){
        this.sideNav.toggle();
      }
    }
    //case for board tab opening/closing
    else if (!(this.checkIfActiveBoard(board) == false && this.sideNav.opened == true)){
      this.sideNav.toggle();
      this.setActiveBoard(board);
      this.windows = board.windows;
    }
    else{
      this.setActiveBoard(board);
      this.windows = board.windows;
    }
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

  addWindow(){
    let dialogRef = this.dialog.open(WindowDialogComponent, {
      width: '500px',
      data: {name: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
    });    
  }

  //#region Private Methods

  checkIfActiveBoard(board:Board):boolean{
    return this._dataService.checkIfActiveBoard(board);
  }

  setActiveBoard(board:Board){
    this._dataService.setActiveBoard(board);
  }
  
  //#endregion

}