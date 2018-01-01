import { Injectable } from '@angular/core';
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, shell, screen } from 'electron';
import * as childProcess from 'child_process';
import { Board } from 'app/components/navbar/objects/board.object';
import { Window } from 'app/components/grid/objects/window.object';

@Injectable()
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  childProcess: typeof childProcess;
  pathToBAT: string;
  pathToNircmd: string;
  screenWidth: number;
  screenHeight: number;

  // note: assume 4x4 grid
  maxCols: number;
  maxRows: number;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.childProcess = window.require('child_process');
    }

    this.pathToBAT = __dirname + '\\assets\\scripts\\activate-board.bat';
    this.pathToNircmd = __dirname + '\\assets\\scripts\\nircmd.exe';
    this.screenHeight = screen.getPrimaryDisplay().size.height;
    this.screenWidth = screen.getPrimaryDisplay().size.width;
    this.maxCols = 4;
    this.maxRows = 4;
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  public openLink(link: string): void {
    shell.openExternal(link);
  }

  public activateBoard(board: Board): void {
      const windows = board.windows;
      let scriptCommand = '@ECHO OFF';

      for (const window of windows){
        scriptCommand += this.createCommand(window);
      }
      
      this.writeToScript(scriptCommand);
      this.executeScript();
  }

  private createCommand(window: Window): string {
    if (window.windowFilePath === '' || window.windowFilePath === null) {
      return '';
    }
    
    const path = window.windowFilePath;
    const x = window.x * (this.screenWidth / this.maxRows);
    const y = window.y * (this.screenHeight / this.maxCols);
    const width = (window.cols / this.maxCols) * this.screenWidth;
    const height = (window.rows / this.maxRows) * this.screenHeight;

    const cmd = `
              start "" "${path}" /n
              ${this.pathToNircmd} wait 1000
              ${this.pathToNircmd} win setsize foreground  ${x} ${y} ${width} ${height}
              `;

    return cmd;
  }

  private writeToScript(scriptContent: string): void {
    const fs = require('file-system');
    fs.writeFile(this.pathToBAT, scriptContent, (err) => {
      if (err) {
          console.log('An error ocurred when writing to the file' + err.message);
          console.log(err);
          return;
      }
  });
  }

  private executeScript(): void {
    const { exec } = require('child_process');
    exec(this.pathToBAT, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  }

}
