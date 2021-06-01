const { Application } = require("spectron"),
    path = require("path"),
    process = require("process");

const app = new Application({
    path: path.join(
        process.cwd(), // This works assuming you run npm test from project root
        // The path to the binary depends on your platform and architecture
        `out/MarkView-win32-x64/markview.exe`
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
