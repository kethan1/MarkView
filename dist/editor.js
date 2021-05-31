/* eslint-disable */
// @ts-ignore
const fs = require('fs'), path = require('path'), { ipcRenderer } = require('electron'), EasyMDE = require('easymde');
/* eslint-disable */
// @ts-ignore
const savePath = path.join(ipcRenderer.sendSync('getPath', 'documents'), "MarkView/");
document.addEventListener("DOMContentLoaded", function (event) {
    var easymde = new EasyMDE({
        element: document.getElementById("editor"),
        forceSync: true,
        codeSyntaxHighlighting: true,
        indentWithTabs: false,
        tabSize: 4
    });
    easymde.value(fs.readFileSync(path.join(savePath, sessionStorage.getItem("editing")), "utf8"));
    document.querySelector(".EasyMDEContainer").addEventListener("keypress", function (key) {
        fs.writeFile(path.join(savePath, sessionStorage.getItem("editing")), easymde.value(), 'utf8', function (err) { if (err)
            throw err; });
    });
});
if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath);
}
