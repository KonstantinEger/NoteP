const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    // frame: false // Save for later
  });

  // load the dist folder from Angular
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools optionally:
  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null;
  });

  const menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        {
          label: 'New Book',
        },
        {
          type: 'separator'
        },
        {
          label: 'Exit',
          click() {
            app.quit();
          }
        },
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});