import React from 'react'
import styles from "./SidebarBtn.module.css"

export default function SidebarBtn({func, icon}) {
    return (
        <button className={styles.sidebarBtn} onClick={func}>
            {icon}
        </button>
    )
}
