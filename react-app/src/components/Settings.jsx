import React, { useEffect, useState } from 'react'
import styles from "./Settings.module.css"
import MainView from './MainView'
const ipcRenderer = window.require('electron').ipcRenderer

export default function Settings() {

    const [storageDir, setStorageDir] = useState(null)
    const setStoragePath = async () => {
        const dir = await ipcRenderer.invoke('set-storage');
        if (dir !== null) {
            setStorageDir(dir);
        }
    };

    useEffect(()=>{
        ipcRenderer.invoke('get-storage').then(response => setStorageDir(response)
        )
    },[])

    return (
        <MainView>
            <div className={styles.frame}>
                <p className={styles.inputLabel}>
                    Storage Directory
                </p>
                <div className={styles.customInput} onClick={() => setStoragePath()}>
                    {storageDir !== null ? storageDir : "Загрузка..."}
                    <p className={styles.InputChange}>...</p>
                </div>
                <span className={styles.changePathText}>
                        Нажмите, чтобы сменить путь
                </span>
            </div>
        </MainView>
    )
}
