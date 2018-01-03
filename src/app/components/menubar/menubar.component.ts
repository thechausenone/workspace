import { Component } from '@angular/core';
import { BrowserWindow } from 'electron';
import { StateManagerService } from '../../providers/state-manager.service';
import { DatabaseService } from '../../providers/database.service';
import { MatDialog } from '@angular/material';
import { ExitDialogComponent } from '../../modules/dialog/components/exit-dialog/exit-dialog.component';
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent {
  isFullscreen: boolean;
  window: any;
  electron: any;
  fullscreenIcon: string;

  constructor(private stateManagerService: StateManagerService,
              private databaseService: DatabaseService, private dialog: MatDialog) {
    this.electron = require('electron');
    this.window = this.electron.remote.getCurrentWindow();
    this.setIcon();
   }

  ReadBoards(): void {
    this.databaseService.ReadBoardsFromDatabase().subscribe(data => console.log(data));
  }

  SaveBoards(): void {
    this.databaseService.SaveBoardsToDatabase(this.stateManagerService.GetBoards());
  }

  minimizeWindow() {
    this.window.minimize();
  }

  toggleFullscreen() {
    if (this.isFullscreen) {
      this.window.unmaximize();
    } else {
      this.window.maximize();
    }
    this.setIcon();
  }

  closeWindow() {
    this.dialog.open(ExitDialogComponent, {
      width: '500px',
      data: this.window
    });
  }

  setIcon() {
    this.isFullscreen = this.window.isMaximized();
    if (this.isFullscreen) {
      this.fullscreenIcon = 'filter_none';
    } else {
      this.fullscreenIcon = 'fullscreen';
    }
  }
}
