var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
/* eslint-disable */
// @ts-ignore
const fs = require("fs"), path = require("path"), { ipcRenderer } = require('electron');
/* eslint-disable */
// @ts-ignore
const savePath = path.join(ipcRenderer.sendSync('getPath', 'documents'), "MarkView/"), notes = document.getElementById("Notes");
function openEditor(data, page = "editor.html") {
    sessionStorage.setItem("editing", data);
    window.location.href = page;
}
fs.readdir(savePath, (err, files) => {
    files.forEach(async function (file) {
        var e_1, _a;
        const lineReader = require('readline').createInterface({
            input: fs.createReadStream(path.join(savePath, file)),
        });
        let lineCounter = 0, lines = "";
        try {
            for (var lineReader_1 = __asyncValues(lineReader), lineReader_1_1; lineReader_1_1 = await lineReader_1.next(), !lineReader_1_1.done;) {
                const line = lineReader_1_1.value;
                lineCounter++;
                if (lineCounter <= 5)
                    lines += `${line}<br>`;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (lineReader_1_1 && !lineReader_1_1.done && (_a = lineReader_1.return)) await _a.call(lineReader_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        lineReader.close();
        if (lineCounter > 5)
            lines += `and ${lineCounter - 5} lines more...`;
        else
            lines = lines.substring(0, lines.length - 4);
        notes.innerHTML += `
            <div class="card grey lighten-4" style="width: fit-content; height: fit-content; cursor: pointer;" onclick="openEditor('${file}')">
                <div class="card-content black-text">
                    <span class="card-title">File: ${file}</span>
                    <p>
                        Preview:
                        <br>
                        ${lines}
                    </p>
                </div>
            </div>
        `;
    });
});
