import { Injectable } from '@angular/core';
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer } from 'electron';
import * as childProcess from 'child_process';
const {fs} = require('file-system');
var { Menu, Tray } = require('electron').remote;
import { Board } from '../components/navbar/objects/board.object';

@Injectable()
export class ElectronService {
  tray:any;
  contextMenu: any;
  defaultTemplates: Array<Object>;
  ipcRenderer: typeof ipcRenderer;
  childProcess: typeof childProcess;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.childProcess = window.require('child_process');
    }

    this.defaultTemplates = [
      {
        label: 'Account',
        click: function () {
          console.log("Clicked on Account")
        }
      },
      {
        label: 'Settings',
        click: function () {
          console.log("Clicked on Settings")
        }
      },
      {
        label: 'Help',
        click: function () {
          console.log("Clicked on Help")
        }
      },
      {
        label: 'Tutorial',
        click: function () {
          console.log("Clicked on Tutorial")
        }
      }
    ];

    this.CreateTray();
    console.log("Electron service is initialized");
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  updateTray(board: Array<Board>){
    var templates = this.defaultTemplates;
    var newTemplates = this.ConvertBoardsToTemplate(board);
    newTemplates.forEach(x => templates.push(x));
    
    this.contextMenu = Menu.buildFromTemplate(templates);
    this.tray.setContextMenu(this.contextMenu);
  }

  private ConvertBoardsToTemplate(boards: Array<Board>): Array<Object>{
    //change the array of boards into the form of the label objects
    var templates = new Array<Object>();
    //foreach...
    return templates;
  }

  private CreateTray(){
    this.tray = new Tray(__dirname + "/assets/icons/icon.png");
    this.contextMenu = Menu.buildFromTemplate(this.defaultTemplates);
    this.tray.setToolTip('Workspace Menu');
    this.tray.setContextMenu(this.contextMenu);
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
}
