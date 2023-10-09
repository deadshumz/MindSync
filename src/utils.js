const { dialog } = require('electron')
const settings = require('electron-settings')

/**
 * Получает путь к хранилищу.
 * @returns {Promise<string|null>} возвращает путь к хранилищу или null если путь не установлен.
 */
async function getStoragePath() {
    try {
        const storageDir = await settings.get('storageDir')
        return storageDir
    } catch(err) {
        console.log('Произошла ошибка во время получения пути к хранилищу:', err)
    }
}

async function setStoragePath() {
    try {
        const dialogSettings = {
            title: "Выберите папку для сохранения файлов",
            properties: ['openDirectory']
        }
    
        const dialogResult = await dialog.showOpenDialog(dialogSettings)
    
        if (!dialogResult.canceled && dialogResult.filePaths.length > 0) {
            newPath = dialogResult.filePaths[0]
            await settings.set('storageDir', newPath)
        }
        const newDir = getStoragePath()
        return newDir
    } catch(err) {
        console.log('Произошла ошибка во время смены пути хранилища:', err)
        const oldDir = getStoragePath()
        return oldDir
    }
}

/**
 * Первоначаальная установка пути хранилища
 * @returns {Promise<string|null} Завершает приложение если пользователь отказывается устанавливать путь, возвращает установленный путь или null при ошибке
 */
async function setupStorageOnFirstRun() {
    try {
        const exsitingPath = await getStoragePath()

        if (!exsitingPath) {
            const message = {
                message: "Для работы необходимо указать путь сохранения файлов",
                type: "info",
                buttons: ["Выбрать путь сохранения", "Отмена"],
                defaultId: 0,
            }

            const messageRes = await dialog.showMessageBox(message)

            // Нажатие на кнопку выбрать путь
            if (messageRes.response === 0) {
                const dialogSettings = {
                    title: "Выберите папку для сохранения файлов",
                    properties: ['openDirectory']
                }

                const dialogResult = await dialog.showOpenDialog(dialogSettings)

                if (!dialogResult.canceled && dialogResult.filePaths.length > 0) {
                    const newPath = dialogResult.filePaths[0]
                    await settings.set('storageDir', newPath)
                    return newPath
                } else {
                    const errorDialog = {
                        message: "Путь сохранения не был выбран. Приложение будет закрыто.",
                        type: "error"
                    }
                    await dialog.showMessageBox(errorDialog)
                    // Завершить приложение
                    app.quit()
                }
            } else {
                app.quit()
            }
        }

        return exsitingPath
    } catch(err) {
        console.error('Произошла ошибка во время установки хранилища:', err)
        app.quit()
        return null
    }
}


module.exports = {
    getStoragePath, 
    setStoragePath,
    setupStorageOnFirstRun
}