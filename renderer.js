const ipc = require('electron').ipcRenderer
// ipcRenderer is used to send events to the main process 
const button = document.querySelector("#upload")

button.addEventListener("click", function(event){
    ipc.send('open-file-dialog-for-file')
})

ipc.on('selected-file',(event,paths)=>{
    console.log(event)
    console.log(paths)
})
