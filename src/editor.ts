/* eslint-disable */
// @ts-ignore
const fs = require('fs'),
    // @ts-ignore
    path = require('path'),
    // @ts-ignore
    { ipcRenderer }  = require('electron'),
    // @ts-ignore
    EasyMDE = require('easymde');

/* eslint-disable */
// @ts-ignore
const savePath = path.join(ipcRenderer.sendSync('getPath', 'documents'), "MarkView/")

if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath);
}

document.addEventListener("DOMContentLoaded", function(event) {
    var easymde = new EasyMDE({ 
        element: document.getElementById("editor"),
        forceSync: true,
        codeSyntaxHighlighting: true,
        indentWithTabs: false,
        tabSize: 4
    });

    easymde.value(fs.readFileSync(path.join(savePath, sessionStorage.getItem("editing")), "utf8"))

    // easymde doesn't have a way to listen for changes, but listening for keypress should work just as well
    document.querySelector(".EasyMDEContainer").addEventListener("keypress", function(key) { 
        fs.writeFile(
            path.join(savePath, sessionStorage.getItem("editing")),
            easymde.value(), 'utf8', function(err: Error) { if (err) throw err; }
        )
    });
});
