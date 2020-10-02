const { ipcRenderer } = require('electron') //event emiter

window.message = function() {
    //ipcRenderer tiene dos metodos sincrono y asincrono, su primer parametro es el canal y el segundo los parametros
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong" 

    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg) // prints "pong"
    })

    ipcRenderer.send('asynchronous-message', 'ping')
}