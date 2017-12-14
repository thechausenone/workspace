import { Injectable } from '@angular/core';
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer } from 'electron';
import * as childProcess from 'child_process';
import { Board } from 'app/components/navbar/objects/board.object';
import { Window } from 'app/components/grid/objects/window.object';
const {fs} = require('file-system');

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  childProcess: typeof childProcess;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.childProcess = window.require('child_process');
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  writeToJSON(relativeFilePath:string, content:string){
    var path = relativeFilePath.slice(1, relativeFilePath.length);

    fs.writeFile(__dirname + path, content, (err) => {
      if (err) {
          console.log("An error ocurred updating the file" + err.message);
          console.log(err);
          return;
      }
  });
  }

  public openBoard(board:Board){
      const {shell} = require('electron');
      var windows = board.windows;
      for(var i = 0; i < windows.length; i++){
          var boardWindow:Window = windows[i];
          shell.openItem(boardWindow.windowFilePath);
      }
  }

}
