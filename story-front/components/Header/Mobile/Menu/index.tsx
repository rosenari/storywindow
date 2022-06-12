import React from 'react';
import Router from "next/router";
import styles from './index.module.scss';
import { classFor } from '@/util/index';


interface MenuProps {
    menu_opened: boolean;
    setOpen: (opened: boolean) => void;
}

const get_open_state_style = (opened: boolean) => {
    return opened? styles.opened : styles.closed;
}

const menus = [
    { title: '홈', url: '/' },
    { title: '회사소개', url: '/intro' }, 
    { title: '납품업체 시공모음', url: '/product/list' }
].map((v, i) => { return { ...v, no: i } });

const Menu: React.FC<MenuProps> = ({ menu_opened, setOpen }) => {

    return (
        <div className={classFor([styles.menu_container, get_open_state_style(menu_opened)])} onClick={() => setOpen(false)}>
            <div className={classFor([styles.menu, get_open_state_style(menu_opened)])}>
                {menus.map(menu => { return <div key={menu.no} onClick={() => { 
                    if(menu.no == 2) {
                        alert('준비중인 메뉴입니다. (해당 메뉴는 pc버전에서 이용가능합니다.)');
                        return;
                    }
                    Router.push(menu.url) 
                }} className={styles.menu_button}>{menu.title}</div> })}
            </div>
            {menu_opened && <div className={styles.close_hint}>{"해당 영역을 클릭하면 메뉴가 닫힙니다."}</div>}
        </div>
    )
}

export default Menu;
