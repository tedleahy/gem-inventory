const {ipcRenderer} = require('electron')
    
let gems = ipcRenderer.sendSync('gems-request-sync') // get initial gems value

let table = document.getElementById('gems')

for (let i = 0; i < gems.length; i++) {
    const gem = gems[i]

    const row = table.insertRow(i+1)
    row.id = 'gem-' + gem.id

    row.insertCell(0).innerHTML = gem.id
    row.insertCell(1).innerHTML = gem.name
    row.insertCell(2).innerHTML = gem.price
    row.insertCell(3).innerHTML = gem.amountSold
    
    let btn = document.createElement('button')
    btn.className = 'btn btn-lg btn-success'
    btn.innerHTML = 'View'
    btn.onclick = (e) => ipcRenderer.send('view-gem', gem.id)

    row.insertCell(4).appendChild(btn)
}

ipcRenderer.on('amount-sold-updated', (event, args) => {
    amountSoldEl = document.getElementById('gem-' + args.id).children['3']
    amountSoldEl.innerHTML = args.amountSold
})