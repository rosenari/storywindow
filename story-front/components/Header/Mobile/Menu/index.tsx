import React from 'react';
import styles from './index.module.css';
import { classFor } from '@/util/index';


interface MenuProps {
    menu_opened: boolean;
    setOpen: (opened: boolean) => void;
}

const get_open_state_style = (opened: boolean) => {
    return opened? styles.opened : styles.closed;
}

const Menu: React.FC<MenuProps> = ({ menu_opened, setOpen }) => {

    return (
        <div className={classFor([styles.menu_container, get_open_state_style(menu_opened)])} onClick={() => setOpen(false)}>
            <div className={classFor([styles.menu, get_open_state_style(menu_opened)])}>{"Menu"}</div>
        </div>
    )
}

export default Menu;
