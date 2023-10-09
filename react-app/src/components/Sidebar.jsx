import { React } from 'react';
import styles from "./Sidebar.module.css";
import SidebarBtn from './SidebarBtn';
import { ReactComponent as GearIcon } from './icons/gear.svg';
import { ReactComponent as FilesIcon } from './icons/files.svg';

export default function Sidebar({setSelectedOption}) {

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarInner}>
                <div className={styles.sidebarfuncs}>
                    <div className="top-btns">
                    <SidebarBtn func={() => setSelectedOption('default')} icon={<FilesIcon/>}/>
                    </div>
                    <div className={styles.bottomBtns}>
                        <SidebarBtn func={() => setSelectedOption('settings')} icon={<GearIcon/>}/>
                    </div>
                </div>
                <div className={styles.sidebarmenu}></div>
            </div>
        </div>
    );
}
