import React, { useEffect } from 'react';
import styles from './index.module.scss';

export interface FooterPopupProps{
    storeExpireData: (name: String, setVisible: React.Dispatch<React.SetStateAction<boolean>>) => void;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PopupSize{
    width: string;
    height: string;
}

interface PopupProps {
    name: String;
    Header: React.FunctionComponent;
    Body: React.FunctionComponent<{ setVisible?: any }>;
    Footer: React.FunctionComponent<FooterPopupProps>;
    size?: PopupSize;
    visible: Boolean;
    setVisible: React.Dispatch<React.SetStateAction<Boolean>>;
}

const setBackgroundVisibility = (name: String, power: Boolean) => {
    const background = document.querySelector<HTMLElement>(`.${name}.${styles.main}`);
    console.log(background);
    if(power){
        background && (background.style.visibility = 'visible');
    }else {
        background && (background.style.visibility = 'hidden');
    }
}

const setPopupVisibility = (name: String, power: Boolean, height: string) => {
    const popup = document.querySelector<HTMLElement>(`.${name}.${styles.popup}`);
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

const storeExpireData = (name: String, setVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
    const expireTime = new Date();
    expireTime.setHours(expireTime.getHours() + 24);
    localStorage.setItem(`${name}_POPUP_CLOSE_EXPIRE`, `${expireTime.getTime()}`);
    setVisible(false);
}

const Fireworks: React.FC = () => {
    return (
        <div>
            { Array.from({length:14}).map((_, index) => <div key={`firework-${index}`} className={styles.firework + ' ' + `firework-${index + 1}`}></div>) }
        </div>
    )
}

const Popup: React.FC<PopupProps> = ({ name, Header, Body, Footer, size = { width: '400px', height: '150px'}, visible, setVisible }) => {
    useEffect(() => {
        if(validExpireDate(name)) setVisible(false); //현재시간이 닫힘유효시간보다 작다면, 팝업 숨기기
    
        setPopupVisibility(name, visible, size.height);
        setBackgroundVisibility(name, visible);
    }, [visible]);

    return (
        <div className={name + ' ' + styles.main} onClick={() => setVisible(false)}>
            <div className={name + ' ' + styles.popup} onClick={(e) => e.stopPropagation()} style={{ width: size.width, height: '0px'}}>
                <div>
                    <Header />
                </div>
                <div>
                    <Body setVisible={setVisible} />
                </div>
                <div>
                    <Footer storeExpireData={storeExpireData} setVisible={setVisible} />
                </div>
            </div>
            {name === 'notice' && <Fireworks /> }
        </div>
    )   
}

export default Popup;