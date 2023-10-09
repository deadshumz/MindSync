const { ipcMain } = require('electron')
const { setStoragePath, getStoragePath } = require('./utils')

ipcMain.handle('get-storage', async (event) => {
    const dir = await getStoragePath()
    return dir
})

ipcMain.handle('set-storage', async (event) => {
    const dir = await setStoragePath()
    return dir
});