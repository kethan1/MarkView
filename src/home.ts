/* eslint-disable */
// @ts-ignore
const fs = require('fs'), path = require('path'), { ipcRenderer }  = require('electron');

/* eslint-disable */
// @ts-ignore
const savePath = path.join(ipcRenderer.sendSync('getPath', 'documents'), 'MarkView/'),
    notes = document.getElementById('Notes');

function openEditor(data: string, page = 'editor.html'): void {
    sessionStorage.setItem('editing', data)
    window.location.href = page
}

fs.readdir(savePath, (err: Error, files: string[]) => {
    files.forEach(async function (file: string) {
        const lineReader = require('readline').createInterface({
            input: fs.createReadStream(path.join(savePath, file)),
        });
        let lineCounter = 0,
            lines = ''; 
        for await (const line of lineReader) {
            lineCounter++;
            if (lineCounter <= 5) lines += `${line}<br>`;
        }
        lineReader.close();

        if (lineCounter > 5) lines += `and ${lineCounter - 5} lines more...`
        else lines = lines.substring(0, lines.length - 4);
        
        notes.innerHTML += `
            <div class='card grey lighten-4' style='width: fit-content; height: fit-content; cursor: pointer;' onclick='openEditor('${file}')'>
                <div class='card-content black-text'>
                    <span class='card-title'>File: ${file}</span>
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
