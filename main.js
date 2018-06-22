const {app, BrowserWindow, ipcMain} = require('electron')
const fs = require('fs')

const gemsFile = 'gems.json'
let mainWindow, gemWindow

// Read gems data from JSON file
let gemFileData = fs.readFileSync(gemsFile)
let gems = JSON.parse(gemFileData)

function createMainWindow() {
    // Create main app window
    mainWindow = new BrowserWindow({width: 1200, height: 900})
    mainWindow.loadFile('index.html')

    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => mainWindow = null) // Dereference object
}

function createGemWindow(gemId) {
    // Create window for viewing an individual gem
    gemWindow = new BrowserWindow({width: 800, height: 600})
    gemWindow.loadFile('viewGem.html')

    gemDetails = gems.filter((x) => x.id == gemId)
    gemWindow.webContents.on('did-finish-load', () => {
        gemWindow.webContents.send('gem-details', gemDetails)
    })

    gemWindow.webContents.openDevTools()

    gemWindow.on('closed', () => mainWindow = null) // Dereference object
}

app.on('ready', createMainWindow)

ipcMain.on('gems-request-sync', (event) => event.returnValue = gems)

ipcMain.on('view-gem', (event, gemId) => createGemWindow(gemId))

ipcMain.on('update-amount-sold', (event, args) => {
    gems.map((gem) => { if (gem.id === args.id) gem.amountSold = args.amountSold })
    
    fs.writeFile(gemsFile, JSON.stringify(gems, null, 2), (err) => {
        if (err) console.log(err)
    })
})