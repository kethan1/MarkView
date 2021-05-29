const fs = require('fs');
const path = require('path');
const { ipcRenderer } = require('electron');
const EasyMDE = require('easymde');
var savePath = path.join(ipcRenderer.sendSync('getPath', 'documents'), "MarkView/");
document.addEventListener("DOMContentLoaded", function (event) {
    var textArea = document.getElementById("editor");
    console.log(textArea);
    var easymde = new EasyMDE({
        element: textArea,
        forceSync: true,
        codeSyntaxHighlighting: true,
        indentWithTabs: false,
        tabSize: 4
    });
    document.addEventListener("keypress", function (key) {
        fs.writeFile(path.join(savePath, "testing123.md"), easymde.value(), 'utf8', function (err) { });
    });
});
if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath);
}
console.log(savePath);
//# sourceMappingURL=render.js.map