const { app, BrowserWindow, ipcMain } = require('electron') 
const path = require('path')

function createWindow () {
  // Crea la ventana.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //nodeIntegration: true //integraion de los componentes de esta ventana con los modulos de node
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  })

  // carga el archivo principal_page.html
  win.loadFile('src/views/principal_page.html')

  // abre el DevTools.
  win.webContents.openDevTools()
}

//cuando la aplicacion este lista ejecuta la funcion que crea la ventana, algunas APIs solo pueden ser usadas luego de que la aplicacion se inicialice y este lista
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  //event emiter
  //ipcMain tiene dos metodos sincrono y asincrono, su primer parametro es el canal y el segundo los parametros
  ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.reply('asynchronous-reply', 'pong')
  })

  ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.returnValue = 'pong'
  })