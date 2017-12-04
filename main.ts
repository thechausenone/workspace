import { app, BrowserWindow, screen, Menu, Tray } from 'electron';
import * as path from 'path';

let win, serve;
let window = undefined

const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

if (serve) {
  require('electron-reload')(__dirname, {
  });
}


let tray = null
app.on('ready', () => {
  createTray();
  createWindow();
  createTrayWindow();
})

function createTray() {
  tray = new Tray('dist/assets/icons/icon.png')
  /*const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Settings',
      click: function () {
        console.log("Clicked on settings")
      }
    },
    {
      label: 'Help',
      click: function () {
        console.log("Clicked on Help")
      }
    }
  ])
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);*/
  tray.on('click', function (event) {
    toggleWindow()
  })
}

const getWindowPosition = () => {
  const windowBounds = window.getBounds()
  const trayBounds = tray.getBounds()
  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 3)
  return {x: x, y: y}
}

// Creates window & specifies its values
const createTrayWindow = () => {
  window = new BrowserWindow({
        width: 250,
        height: 310,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        transparent: true
    })
    // This is where the index.html file is loaded into the window
    window.loadURL('file://' + __dirname + '/index.html');

  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
}

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow()
  }
}

const showWindow = () => {
  const position = getWindowPosition()
  window.setPosition(position.x, position.y, false)
  window.show()
  window.focus()
}

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  });

  // and load the index.html of the app.
  win.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
