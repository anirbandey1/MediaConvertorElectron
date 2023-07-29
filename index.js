var app = require('electron').app

var ipc = require("electron").ipcMain
var os = require("os")
// var {dialog} = require("electron")
var dialog = require("electron").dialog

const BrowserWindow = require('electron').BrowserWindow

var mainWindow = null

app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        resizable : true,
        height : 600,
        width : 800,
        webPreferences: {
            nodeIntegration:true,
            contextIsolation: false
        }
    }
    )

    mainWindow.loadURL("file://"+__dirname+"/main.html")
    
    // garbage collection after main window is closed

    mainWindow.on('closed',function(){
    
    })

})

ipc.on('open-file-dialog-for-file', function(event){
    console.log("button pressed")

    if(os.platform() === "linux" || os.platform() === "win32"){
        dialog.showOpenDialog(null, {
            properties:['openFile']
        }).then((result)=>{
            console.log(result.filePaths)
            event.sender.send("selected-file",result.filePaths[0])
        }).catch((err)=>{
            console.log(err)
        })
    }else{
        // in mac
        dialog.showOpenDialog(null, {
            properties:['openFile','openDirectory']

        }).then((result)=>{
            console.log(result.filePaths)
            event.sender.send("selected-file",result.filePaths[0])
        }).catch((err)=>{
            console.log(err)
        })
    }
})
