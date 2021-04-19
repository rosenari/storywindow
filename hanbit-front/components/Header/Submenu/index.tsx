import React from "react";
import Link from 'next/link';
import styles from "./index.module.css";

interface SubmenuProps {
    AllMenu_up: () => void;
    Menu_down1: () => void;
    Menu_down2: () => void;
    submenu1: boolean;
    submenu2: boolean;
    submenubox: React.RefObject<HTMLDivElement>;
    submenu_1_area: React.RefObject<HTMLDivElement>;
}

const Submenu: React.FC<SubmenuProps> = (props) => {

    return (
        <div className={styles.submenubox} ref={props.submenubox}>
            <div className={props.submenu1 ? styles.submenu_1 : styles.submenu_1_hidden} onMouseOver={props.Menu_down1} onMouseOut={props.AllMenu_up}>
                <div className={styles.submenu_item}>
                    <Link href="/intro"><a>스토리창</a></Link>
                </div>
                <div className={styles.submenu_item}>
                    <Link href="/storymap"><a>찾아오시는길</a></Link>
                </div>
            </div>
            <div className={styles.submenu_1_area} ref={props.submenu_1_area}>
            </div>
            <div className={props.submenu2 ? styles.submenu_2 : styles.submenu_2_hidden} onMouseOver={props.Menu_down2}>
                <div className={styles.submenu_item}>
                    견적요청
				</div>
                <div className={styles.submenu_item}>
                    공지사항
				</div>
            </div>
        </div>
    )
}

export default Submenu;