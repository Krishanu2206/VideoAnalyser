const { contextBridge, ipcRenderer, webUtils } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setDuration : (callback) => ipcRenderer.on('duration:received', (_event, duration) => callback(duration)),
    setVideo: (video) => ipcRenderer.send('video:submit', webUtils.getPathForFile(video)),

})
