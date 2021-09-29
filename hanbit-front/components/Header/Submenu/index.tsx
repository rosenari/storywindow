import React from "react";
import Link from 'next/link';
import styles from './index.module.scss';

interface SubmenuProps {
    AllMenu_up: () => void;
    Menu_down: () => void;
    subMenuVisible: boolean;
    subMenuBoxRef: React.RefObject<HTMLDivElement>;
    subMenuAreaRef: React.RefObject<HTMLDivElement>;
}

const Submenu: React.FC<SubmenuProps> = (props) => {

    return (
        <div className={styles.submenubox} ref={props.subMenuBoxRef}>
            <div className={props.subMenuVisible ? styles.submenu : styles.submenu_hidden} onMouseOver={props.Menu_down} onMouseOut={props.AllMenu_up}>
                <div className={styles.submenu_item}>
                    <Link href="/intro"><a>스토리창</a></Link>
                </div>
            </div>
            <div className={styles.submenu_1_area} ref={props.subMenuAreaRef}>
            </div>
        </div>
    )
}

export default Submenu;