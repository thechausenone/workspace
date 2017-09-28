// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron')
const ipc = electron.ipcRenderer

document.getElementById('start').addEventListener('click', () =>{
    ipc.send('countdown-start')
})

ipc.on('countdown', (evt, count) =>{
    document.getElementById('count').innerHTML = count
})