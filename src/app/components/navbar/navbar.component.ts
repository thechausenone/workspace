import { Component, ViewChild } from '@angular/core';
import { Board } from './objects/board.object'
import { Window } from '../grid/objects/window.object';
import { StateManagerService } from '../../providers/state-manager.service';
import { AuthenticationService } from '../../modules/login/providers/authentication.service';
import { ElectronService } from '../../providers/electron.service';
import { MatDialog } from '@angular/material';
import { BoardDialogComponent} from '../../modules/dialog/components/board-dialog/board-dialog.component';
import { WindowDialogComponent } from '../../modules/dialog/components/window-dialog/window-dialog.component';
import { BoardSettingsDialogComponent } from '../../modules/dialog/components/board-settings-dialog/board-settings-dialog.component';
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
  dialogSize: string;
  @ViewChild('sidenav') sideNav:any;

  constructor(private stateManagerService: StateManagerService,
              private _electronService: ElectronService, 
              private dialog: MatDialog,
              private authService: AuthenticationService,
              private router: Router) {
    this.boards = this.stateManagerService.GetBoards();
    this.hidden = !this.authService.GetUserInfo().CheckUserStatus();
    this.dialogSize = "300px";
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
  
  DeleteBoard(){
    this.stateManagerService.DeleteBoard(this.GetActiveBoard());
    this.stateManagerService.SetActiveBoardIndex(-1);
    this.HandleSideNavToggle();
    this.router.navigateByUrl("/main/home");
  }

  //#region DIALOG METHODS
  OpenCreateBoardDialog(){
    this.dialog.open(BoardDialogComponent, {
      width: this.dialogSize
    });
  }

  OpenBoardSettingsDialog(){
    this.dialog.open(BoardSettingsDialogComponent, {
      width: this.dialogSize
    });
  }

  OpenCreateWindowDialog(){
    this.dialog.open(WindowDialogComponent, {
      width: this.dialogSize
    });
  }
  //#endregion

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