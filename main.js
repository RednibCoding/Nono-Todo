const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 900,
        // Hide the menu bar at the top (can be toggled by pressing the "alt" key)
        // Use this in development to be able to toggle the menu bar
        // autoHideMenuBar: true,

        webPreferences: {
            // Enable this when publishing your app to prevent users to open the dev tools by pressing "ctrl+shift+I"
            devTools: false,

            nodeIntegration: true,
            contextIsolation: false
        }
    })

    // Hide the menu bar at the top (use this for publishing, the menu bar cannot be toggled by pressing the "alt" key)
    win.setMenuBarVisibility(false)

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
