// require app BrowserWindow
const { app, BrowserWindow, Menu, MenuItem } = require('electron');

// create window 
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
    }
    })


  
    win.loadFile('index.html')
    win.maximize();
    win.webContents.openDevTools()
  }

//launch window 
app.whenReady().then(() => {
  createWindow()
})



// custom menu 
const menu = new Menu()
menu.append(new MenuItem({
    label: 'File',
    submenu:[    
                {
                    role: 'help',
                    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
                    click: () => { console.log('Electron rocks!') }
                },
                {
                    role: 'Quit',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => {app.quit()}

                }
    
            ]
}))

Menu.setApplicationMenu(menu)

// create close window
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

