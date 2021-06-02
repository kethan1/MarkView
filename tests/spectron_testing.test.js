const { Application } = require("spectron"),
    path = require("path"),
    process = require("process"),
    os = require("os"),
    fs = require("fs");

var current_platform = os.platform();
var current_arch = os.arch();

var extension;
switch (current_platform) {
    case "win32":
        extension = ".exe";
        break;
    case "darwin":
        extension = ".app";
        break;
    default:
        extension = "";
}

var path_to_app = `out/MarkView-${current_platform}-${current_arch === "x86" ? "ia32": current_arch}/markview${extension}${current_platform === "darwin" ? "/Contents/MacOS/markview": ""}`;
console.log(path_to_app)
var files = fs.readdirSync('out/');

const app = new Application({
    path: path.join(
        process.cwd(), // This works assuming you run npm test from project root
        // The path to the binary depends on your platform and architecture
        path_to_app
    )
});

jest.setTimeout(12000)

describe("App", () => {
    beforeEach(() => {
        return app.start();
    });

    afterEach(() => {
        if (app && app.isRunning()) return app.stop()
    });

    test("Test App Launching", () => {
        let isVisible = app.browserWindow.isVisible();
        expect(isVisible).toBe(true);
    });
});  
