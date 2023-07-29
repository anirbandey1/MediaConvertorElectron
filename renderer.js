const ipc = require('electron').ipcRenderer
// ipcRenderer is used to send events to the main process 
const button = document.querySelector("#upload")

var format = 'mp3'
var dir = './media'
const fs = require('fs')
const $ = require('jquery')
const process = require("child_process")
// node runs inside a single process but you can child processes as well


if(!fs.existsSync(dir)){
    fs.mkdirSync(dir)
}

$("#format").change(()=>{
    format = $("#format option:selected").text()
    console.log("New format : "+format)
})

button.addEventListener("click", function(event){
    ipc.send('open-file-dialog-for-file')
})

ipc.on('selected-file',(event,paths)=>{
    console.log(event)
    console.log(paths)
    
    var filename = paths.replace(/^.*[\\\/]/, '')
    // this will convert full path to filename
    filename = filename.replace(/\.[^/.]+$/, "")
    // remove extension

    // execute ffmpeg command to perform file conversion
    process.exec(`ffmpeg -i ${paths} media/${filename}_converted.${format}`, (error,stdout,stderr)=>{
       console.log(stdout)

        if(error != null){
            console.log(error)
        }

    }) 
})
