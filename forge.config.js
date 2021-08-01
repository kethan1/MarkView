const path = require('path'),
    process = require('process'),
    fs = require('fs');

module.exports = {
    packagerConfig: {
        "asar": true,
        "icon": path.join(__dirname, "src/assets/app_icons/app_icon"),
        "executableName": "markview",
    },
    makers: [
        {
            "name": "@electron-forge/maker-dmg",
            "config": {
                "format": "ULFO"
            }
        },
        {
            "name": "@electron-forge/maker-wix",
            "config": {
                "language": 1033,
                "manufacturer": "Kethan Vegunta",
                "description": "Markdown note taking app!",
                "name": "MarkView",
                "shortName": "MarkView",
                "shortcutFolderName": "MarkView",
                "programFilesFolderName": "MarkView",
                "appIconPath": path.join(__dirname, "src/assets/app_icons/app_icon.ico"),
                "exe": "markview"
            }
        },
        {
            "name": "@electron-forge/maker-deb",
            "config": {
                "maintainer": "Kethan Vegunta",
                "icon": path.join(__dirname, "src/assets/app_icons/app_icon.png")
            }
        },
        {
            "name": "@electron-forge/maker-rpm",
            "config": {
                "maintainer": "Kethan Vegunta",
                "homepage": "https://github.com/kethan1/MarkView",
                "license": "MIT",
                "icon": path.join(__dirname, "src/assets/app_icons/app_icon.png")
            }
        }
    ],
    hooks: {
        postMake: async (forgeConfig, options) => {
            if (process.env.CI && process.env.CURRENT_WORKFLOW === "Publish") {
                var appName = "MarkView", 
                    outputFolder = "./Build-Artifacts";
                for (let option of options) {
                    var currentArch = option["arch"] !== "ia32" ? option["arch"] : "ia32";
                    for (let artifact of option["artifacts"]) {
                        if (artifact.includes("deb")) fs.rename(artifact, path.join(outputFolder, `${appName}-Linux-${currentArch}.deb`), function(err) { if (err) throw err; });
                        else if (artifact.includes("rpm")) fs.rename(artifact, path.join(outputFolder, `${appName}-Linux-${currentArch}.rpm`), function(err) { if (err) throw err; });
                        else if (artifact.includes("dmg")) fs.rename(artifact, path.join(outputFolder, `${appName}-MacOS-${currentArch}.dmg`), function(err) { if (err) throw err; });
                        else if (artifact.includes("msi")) fs.rename(artifact, path.join(outputFolder, `${appName}-Windows-${currentArch}.msi`), function(err) { if (err) throw err; });
                    }
                }
            }
        }
    }
}