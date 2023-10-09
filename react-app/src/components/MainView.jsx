import React from 'react'
import styles from "./MainView.module.css"

export default function ({children}) {
    return (
        <div className={styles.frame}>
            {children}
        </div>
    )
}
