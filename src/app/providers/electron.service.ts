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
  scriptFilePath: string;
  screenWidth: number;
  screenHeight: number;

  //note: assume 4x4 for now
  maxCols: number;
  maxRows: number;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.childProcess = window.require('child_process');
    }

    this.scriptFilePath = __dirname + "\\assets\\scripts\\open-windows.bat";
    this.screenHeight = screen.getPrimaryDisplay().size.height;
    this.screenWidth = screen.getPrimaryDisplay().size.width;
    this.maxCols = 4;
    this.maxRows = 4;
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  public activateBoard(board:Board){
      var windows = board.windows;
      var scriptContent = `@ECHO OFF
      `;

      for (let window of windows){
        scriptContent += this.createScriptCommand(window);
      }
      console.log(scriptContent);
      console.log(this.scriptFilePath);
      this.writeToScript(scriptContent);
      this.executeScript();
  }

  private createScriptCommand(window: Window): string{
    var cmd = "";

    if (window.windowFilePath === ""){
      return cmd;
    }
    
    var path = window.windowFilePath;
    var path2 =  __dirname + "\\assets\\scripts\\nircmd.exe";
    var x = window.x * (this.screenWidth/this.maxRows);
    var y = window.y * (this.screenHeight/this.maxCols);
    var width = (window.cols/this.maxCols) * this.screenWidth;
    var height = (window.rows/this.maxRows) * this.screenHeight;

    if (path.endsWith(".exe")){
      cmd = `${path2} exec show "${path}" /n
            ${path2} wait 500
            ${path2} win setsize foreground  ${x}, ${y}, ${width}, ${height}
            `;
    }

    return cmd;
  }

  private writeToScript(scriptContent: string){
    var fs = require('file-system');
    fs.writeFile(this.scriptFilePath, scriptContent, (err) => {
      if (err) {
          console.log("An error ocurred updating the file" + err.message);
          console.log(err);
          return;
      }
  });
  }

  private executeScript(): void{
    const { exec } = require('child_process');
    exec(this.scriptFilePath, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });

  }

}
