const {app, BrowserWindow, ipcMain} = require('electron')

let mainWindow

function createMainWindow() {
    // Create main app window
    mainWindow = new BrowserWindow({width: 800, height: 600})
    mainWindow.loadFile('index.html')

    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
        mainWindow = null // Dereference object
    })
}

app.on('ready', createMainWindow)