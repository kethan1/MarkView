const path = require('path'),
    process = require('process'),
    fs = require('fs');

module.exports = {
    packagerConfig: {
        "asar": true,
        "icon": path.join(__dirname, "/assets/app_icons/app_icon"),
        "executableName": "MarkView",
    },
    makers: [
        {
            "name": "@electron-forge/maker-zip",
            "platforms": [
                "darwin"
            ]
        },
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
                "appIconPath": path.join(__dirname, "/assets/app_icons/app_icon.ico"),
                "exe": "MarkView"
            }
        },
        {
            "name": "@electron-forge/maker-deb",
            "config": {
                "maintainer": "Kethan Vegunta",
                "icon": path.join(__dirname, "/assets/app_icons/app_icon.png")
            }
        },
        {
            "name": "@electron-forge/maker-rpm",
            "config": {
                "maintainer": "Kethan Vegunta",
                "homepage": "https://github.com/kethan1/MarkView",
                "license": "MIT",
                "icon": path.join(__dirname, "/assets/app_icons/app_icon.png")
            }
        }
    ],
    hooks: {
        postMake: async (forgeConfig, options) => {
            if (process.env.CI && process.env.CURRENT_WORKFLOW === "Publish") {
                var appName = "MarkView";
                var outputFolder = "./Build-Artifacts";
                // for (var i = 0; i < options.length; i++) {
                //     if (options[i]["arch"] == "ia32") var currentArch = "x86";
                //     else var currentArch = options[i]["arch"];
                //     for (var artifact = 0; artifact < options[i]["artifacts"].length; artifact++) {
                //         if (options[i]["artifacts"][artifact].includes("deb")) fs.rename(options[i]["artifacts"][artifact], path.join(outputFolder, `${appName}-Linux-${currentArch}.deb`), function(err) { if (err) throw err; });
                //         else if (options[i]["artifacts"][artifact].includes("rpm")) fs.rename(options[i]["artifacts"][artifact], path.join(outputFolder, `${appName}-Linux-${currentArch}.rpm`), function(err) { if (err) throw err; });
                //         else if (options[i]["artifacts"][artifact].includes("dmg")) fs.rename(options[i]["artifacts"][artifact], path.join(outputFolder, `${appName}-MacOS-${currentArch}.dmg`), function(err) { if (err) throw err; });
                //         else if (options[i]["artifacts"][artifact].includes("zip")) fs.rename(options[i]["artifacts"][artifact], path.join(outputFolder, `${appName}-MacOS-${currentArch}.zip`), function(err) { if (err) throw err; });
                //         else if (options[i]["artifacts"][artifact].includes("msi")) fs.rename(options[i]["artifacts"][artifact], path.join(outputFolder, `${appName}-Windows-${currentArch}.msi`), function(err) { if (err) throw err; });
                //     }
                // }
                for (let option of options) {
                    if (option["arch"] == "ia32") var currentArch = "x86";
                    else var currentArch = option["arch"];
                    for (let artifact of option["artifacts"]) {
                        if (artifact.includes("deb")) fs.rename(artifact, path.join(outputFolder, `${appName}-Linux-${currentArch}.deb`), function(err) { if (err) throw err; });
                        else if (artifact.includes("rpm")) fs.rename(artifact, path.join(outputFolder, `${appName}-Linux-${currentArch}.rpm`), function(err) { if (err) throw err; });
                        else if (artifact.includes("dmg")) fs.rename(artifact, path.join(outputFolder, `${appName}-MacOS-${currentArch}.dmg`), function(err) { if (err) throw err; });
                        else if (artifact.includes("zip")) fs.rename(artifact, path.join(outputFolder, `${appName}-MacOS-${currentArch}.zip`), function(err) { if (err) throw err; });
                        else if (artifact.includes("msi")) fs.rename(artifact, path.join(outputFolder, `${appName}-Windows-${currentArch}.msi`), function(err) { if (err) throw err; });
                    }
                }
            }
        }
    }
}