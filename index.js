var app = require('electron').app

var BrowserWindow = require('electron').BrowserWindow

var mainWindow = null

app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        resizable : true,
        height : 600,
        width : 800,
        webPreferences: {
            nodeIntegration:true
        }
    }
    )

    mainWindow.loadURL("file://"+__dirname+"/main.html")
})

