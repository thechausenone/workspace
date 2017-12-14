import { Component, ViewChild } from '@angular/core';
import {NgIf} from '@angular/common';
import {Board} from './objects/board.object'
import {Window} from '../grid/objects/window.object';
import { StateManagerService } from '../../providers/state-manager.service';
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
  windows: Array<Window>;
  @ViewChild('sidenav') sideNav:any;

  constructor(private stateManagerService: StateManagerService,
              private dialog: MatDialog) {
    this.boards = this.stateManagerService.GetBoards();
  }

  MapWindowsToDesktop():void{
    console.log("Map windows to desktop!");
  }

  GetActiveBoard():Board{
    var index = this.stateManagerService.GetActiveBoardIndex();
    if (index == -1){
      return null; 
    }
    return this.boards[index];
  }
  
  HandleSideNavToggle(board:Board = null){
    //case for non-board tab closing
    if (board == null){
      if (this.sideNav.opened == true){
        this.sideNav.toggle();
      }
    }
    //case for board tab opening/closing
    else if (!(this.CheckIfBoardIsActive(board) == false && this.sideNav.opened == true)){
      this.sideNav.toggle();
      this.SetActiveBoard(board);
      this.windows = board.windows;
    }
    else{
      this.SetActiveBoard(board);
      this.windows = board.windows;
    }
  }

  AddBoard(){
    let dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '500px',
      data: {name: "", icon: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  DeleteBoard(){
    //replace these with dynamic board name
    var boardName = "the first board";
    this.stateManagerService.DeleteBoard(boardName);
    this.stateManagerService.GetBoards();
  }

  AddWindow(){
    let dialogRef = this.dialog.open(WindowDialogComponent, {
      width: '500px',
      data: {name: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
    });    
  }

  //#region Private Methods

  private SetActiveBoard(board: Board){
    this.stateManagerService.SetActiveBoardIndex(this.boards.findIndex(x => x == board));
  }

  private CheckIfBoardIsActive(board:Board):boolean{
    var activeBoardIndex = this.stateManagerService.GetActiveBoardIndex();
    return (this.boards.findIndex(x => x == board) === activeBoardIndex);
  }
  
  //#endregion

}