import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

export interface FooterPopupProps{
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PopupSize{
    width: string;
    height: string;
}

interface PopupProps {
    name: String;
    Header: React.FunctionComponent;
    Body: React.FunctionComponent;
    Footer: React.FunctionComponent<FooterPopupProps>;
    size?: PopupSize
}

const setBackgroundVisibility = (power: Boolean) => {
    const background = document.querySelector<HTMLElement>(`.${styles.main}`);
    if(power){
        background && (background.style.visibility = 'visible');
    }else {
        background && (background.style.visibility = 'hidden');
    }
}

const setPopupVisibility = (power: Boolean, height: string) => {
    const popup = document.querySelector<HTMLElement>(`.${styles.popup}`);
    if(power){
        popup && (popup.style.height = height);
    }else {
        popup && (popup.style.height = '0px');
    }
}

const validExpireDate = (name: String) => {
    const currentTime = new Date().getTime();
    const storeExpireData = localStorage.getItem(`${name}_POPUP_CLOSE_EXPIRE`);
    const expireDate = storeExpireData ? parseInt(storeExpireData) : 0;
    
    return currentTime < expireDate;
}

const Fireworks: React.FC = () => {
    return (
        <div>
            { Array.from({length:14}).map((_, index) => <div key={`firework-${index}`} className={styles.firework + ' ' + `firework-${index + 1}`}></div>) }
        </div>
    )
}

const Popup: React.FC<PopupProps> = ({ name, Header, Body, Footer, size = { width: '400px', height: '150px'} }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if(validExpireDate(name)) setVisible(false); //현재시간이 닫힘유효시간보다 작다면, 팝업 숨기기
    
        setPopupVisibility(visible, size.height);
        setBackgroundVisibility(visible);
    }, [visible]);

    return (
        <div className={styles.main} onClick={() => setVisible(false)}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()} style={{ width: size.width, height: '0px'}}>
                <div className={styles.popup_header}>
                    <Header />
                </div>
                <div className={styles.popup_body}>
                    <Body />
                </div>
                <div className={styles.popup_footer}>
                    <Footer setVisible={setVisible} />
                </div>
            </div>
            <Fireworks />
        </div>
    )   
}

export default Popup;