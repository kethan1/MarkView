const { Application } = require("spectron"),
    path = require("path"),
    process = require("process"),
    os = require("os");

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

const app = new Application({
    path: path.join(
        process.cwd(), // This works assuming you run npm test from project root
        // The path to the binary depends on your platform and architecture
        path_to_app
    )
});

jest.setTimeout(10000)

describe("App", () => {
    beforeEach(async () => {
        return app.start();
    });

    afterEach(async () => {
        if (app && app.isRunning()) return app.stop()
    });

    test("Launch App", async () => {
        const isVisible = await app.browserWindow.isVisible();
        expect(isVisible).toBe(true);
    });
});  
