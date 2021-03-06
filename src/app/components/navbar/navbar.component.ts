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
import { WindowSettingsDialogComponent } from '../../modules/dialog/components/window-settings-dialog/window-settings-dialog.component';
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
  focusedItem: string;
  @ViewChild('sidenav') sideNav: any;

  constructor(private stateManagerService: StateManagerService,
              private _electronService: ElectronService, 
              private dialog: MatDialog,
              private authService: AuthenticationService,
              private router: Router) {
    this.GetBoards();
    this.hidden = !this.stateManagerService.GetUserInfo().CheckUserStatus();
    this.dialogSize = '300px';
    this.focusedItem = 'home';
  }

  MapWindowsToDesktop(): void {
    this._electronService.activateBoard(this.GetActiveBoard());
  }

  GetActiveBoard(): Board {
    const index = this.stateManagerService.GetActiveBoardIndex();
    if (index === -1) {
      return null; 
    }
    return this.boards[index];
  }
  
  HandleSideNavToggle(board: Board = null) {
    // case for non-board tab closing
    if (board == null) {
      if (this.sideNav.opened === true) {
        this.sideNav.toggle();
      }
    // case for board tab opening/closing
    }else if (!(this.CheckIfBoardIsActive(board) === false && this.sideNav.opened === true)) {
      this.sideNav.toggle();
      this.SetActiveBoard(board);
      this.windows = board.windows;
    }else {
      this.SetActiveBoard(board);
      this.windows = board.windows;
    }
  }
  
  DeleteBoard() {
    this.stateManagerService.DeleteBoard(this.GetActiveBoard());
    this.stateManagerService.SetActiveBoardIndex(-1);
    this.HandleSideNavToggle();
    this.router.navigateByUrl('/main/home');
  }

  //#region DIALOG METHODS
  OpenCreateBoardDialog() {
    const boardCount = this.boards.length;

    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: this.dialogSize
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (this.boards.length !== boardCount) {
        const newBoardIndex = this.boards.length - 1;
        this.focusedItem  = (newBoardIndex).toString();
        this.HandleSideNavToggle(this.boards[newBoardIndex]);
      }
    });    
  }

  OpenBoardSettingsDialog() {
    this.dialog.open(BoardSettingsDialogComponent, {
      width: this.dialogSize
    });
  }
  OpenWindowSettingsDialog(window: Window) {
    this.dialog.open(WindowSettingsDialogComponent, {
      width: this.dialogSize,
      data: window
    });
  }

  OpenCreateWindowDialog() {
    this.dialog.open(WindowDialogComponent, {
      width: this.dialogSize
    });
  }
  //#endregion

  //#region Private Methods
  private GetBoardIdentifier(board: Board): string {
    return this.boards.findIndex(x => x === board).toString();
  }

  private GetBoards() {
    this.stateManagerService.GetBoardsObservable().subscribe(data => {
      this.boards = data;
      if (this.GetActiveBoard() != null) {
        this.windows =  this.GetActiveBoard().windows;
      }
    });
  }

  private SetActiveBoard(board: Board) {
    this.stateManagerService.SetActiveBoardIndex(this.boards.findIndex(x => x === board));
  }

  private CheckIfBoardIsActive(board: Board): boolean {
    const activeBoardIndex = this.stateManagerService.GetActiveBoardIndex();
    return (this.boards.findIndex(x => x === board) === activeBoardIndex);
  }  
  //#endregion

}
