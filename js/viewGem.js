const {ipcRenderer} = require('electron')

let gem

function changeAmountSold(action, amountSoldEl) {
    let newAmount = Number(amountSoldEl.innerHTML)

    switch(action) {
        case "increment":
            newAmount++;
            break;
        case "decrement":
            if (newAmount > 0) newAmount--;
            break;
    }
    
    amountSoldEl.innerHTML = newAmount
    gem.amountSold = newAmount
}

ipcRenderer.on('gem-details', (event, args) => {
    gem = args[0]
    
    document.title = gem.name
    
    document.getElementById('header').innerHTML = gem.name
    document.getElementById('name').innerHTML = gem.name
    document.getElementById('price').innerHTML = gem.price
    
    let amountSold = document.getElementById('amountSold')
    amountSold.innerHTML = gem.amountSold

    let buttonEls = document.getElementsByClassName('changeAmountSold')
    Array.from(buttonEls).forEach((btn) => {
        btn.onclick = () => changeAmountSold(btn.dataset.action, amountSold)
    })
})

document.getElementById('save-btn').onclick = () => {
    ipcRenderer.send('update-amount-sold', { id: gem.id, amountSold: gem.amountSold })
}