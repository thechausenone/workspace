import { Component } from '@angular/core';
import { BrowserWindow } from 'electron';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent {
  isFullscreen: boolean;
  window;
  fullscreenIcon: string;

  constructor() {
    this.window =  require('electron').remote.getCurrentWindow();
    this.setIcon();
   }

  minimizeWindow(){
    this.window.minimize();
  }

  toggleFullscreen(){
    if(this.isFullscreen){
      this.window.unmaximize();
    } else {
      this.window.maximize();
    }
    this.setIcon();
  }

  closeWindow(){
    this.window.close();
  }

  setIcon(){
    this.isFullscreen = this.window.isMaximized();
    if(this.isFullscreen){
      this.fullscreenIcon = "filter_none";
    } else {
      this.fullscreenIcon = "fullscreen";
    }
  }
}
