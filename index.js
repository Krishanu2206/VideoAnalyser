const ffmpeg = require('fluent-ffmpeg');
const ffprobe = require('@ffprobe-installer/ffprobe');
ffmpeg.setFfprobePath(ffprobe.path);

const path = require("path");

const {app, BrowserWindow, ipcMain} = require('electron');

let mainWindow;

function createWindow() {
    console.log('Electron app is ready');

    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.webContents.openDevTools()

    mainWindow.loadFile('index.html');

}

function handleVideoSubmit (_event, video) {

    console.log('Received video path : ', video);
    ffmpeg.ffprobe(video, function (err, metadata) {
        if(err){
            console.log(err);
            return;
        }
        console.dir(metadata);
        console.log('Video duration is : ', metadata.streams[0].duration);
        const duration = metadata.streams[0].duration;
        console.log('Duration sent to main process : ', duration);

        mainWindow.webContents.send('duration:received', duration);

    });

}

app.whenReady().then(() => {

    createWindow();
    ipcMain.on('video:submit', handleVideoSubmit)
    console.log('Duration from main process : ', duration);

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow(duration)
    })
})
