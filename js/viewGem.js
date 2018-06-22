const {ipcRenderer} = require('electron')

ipcRenderer.on('gem-details', (event, args) => {
    const gem = args[0]
    
    document.title = gem.name
    
    document.getElementById('header').innerHTML = gem.name
    document.getElementById('name').innerHTML = gem.name
    document.getElementById('price').innerHTML = gem.price
    document.getElementById('amountSold').innerHTML = gem.amountSold
})