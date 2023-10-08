const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const settings = require('electron-settings')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};


async function storagePath() {
  curPath = await settings.get('storageDir')

  while(!curPath) {
    const message = {
      message: "Для работы необхадимо указать путь сохранения файлов",
      type: "info",
      buttons: ["Выбрать путь сохранения", "Отмена"],
      defaultId: 0,
    }

    const messageRes = await dialog.showMessageBox(message);
    if (messageRes.response === 0) {
      const dialogSettings = {
        title: "Выберите папку для сохранения файлов",
        properties: ['openDirectory']
      }

      const dialogResult = await dialog.showOpenDialog(dialogSettings);

      if (!dialogResult.canceled && dialogResult.filePaths.length > 0) {
        const newPath = dialogResult.filePaths[0];
        await settings.set('storageDir', newPath)
      }
    } else {
      return false
    }
  }

  return true
}



app.on('ready', async () => {
  // проверка задан ли путь для файлов
  const isStorageDir = await storagePath()
  if (isStorageDir === true) {
    createWindow()
  } else {
    app.quit()
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
