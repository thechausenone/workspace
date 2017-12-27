import { Component, ViewChild } from '@angular/core';
import {NgIf} from '@angular/common';
import {Board} from './objects/board.object'
import {Window} from '../grid/objects/window.object';
import { StateManagerService } from '../../providers/state-manager.service';
import { AuthenticationService } from '../../modules/login/providers/authentication.service';
import {ElectronService} from '../../providers/electron.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {BoardDialogComponent} from '../../modules/dialog/components/board-dialog/board-dialog.component';
import {WindowDialogComponent} from '../../modules/dialog/components/window-dialog/window-dialog.component';
import {BoardSettingsDialogComponent} from '../../modules/dialog/components/board-settings-dialog/board-settings-dialog.component';
import { Subscription } from "rxjs/Subscription";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  boards: Array<Board>;
  windows: Array<Window>;
  hidden: boolean;
  @ViewChild('sidenav') sideNav:any;

  constructor(private stateManagerService: StateManagerService,
              private _electronService: ElectronService, 
              private dialog: MatDialog,
              private authService: AuthenticationService,
              private router: Router) {
    this.boards = this.stateManagerService.GetBoards();
    this.hidden = !this.authService.GetUserInfo().CheckUserStatus();
    console.log("navbarcomponenet called");
  }

  MapWindowsToDesktop():void{
    this._electronService.openBoard(this.GetActiveBoard());
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
    this.stateManagerService.DeleteBoard(this.GetActiveBoard());
    this.stateManagerService.SetActiveBoardIndex(-1);
    this.HandleSideNavToggle();
    this.router.navigateByUrl("/main/home");
  }

  boardSettings(){
    let dialogRef = this.dialog.open(BoardSettingsDialogComponent, {
      width: '500px'
    });
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