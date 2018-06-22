const {app, BrowserWindow, ipcMain} = require('electron')
const fs = require('fs')

let mainWindow

function createMainWindow() {
    // Create main app window
    mainWindow = new BrowserWindow({width: 1200, height: 900})
    mainWindow.loadFile('index.html')

    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => mainWindow = null) // Dereference object
}

app.on('ready', createMainWindow)

let gemFileData = fs.readFileSync('gems.json')
let gems = JSON.parse(gemFileData)

ipcMain.on('gems-request-sync', (event, arg) => event.returnValue = gems)