import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CollectPopupSetData, ImagePopupSetData } from '@/store/action/reducerAction';
import { CollectBody, ImageBody, NoticeBody } from './Body';
import { useIsMobile } from '@/hooks/index';
import Footer, { ExpireFooter } from './Footer';
import Header from './Header';
import styles from './index.module.scss';

const storeExpireDate = (type: String, setVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
    const expireTime = new Date();
    expireTime.setHours(expireTime.getHours() + 24);
    localStorage.setItem(`${type}_POPUP_CLOSE_EXPIRE`, `${expireTime.getTime()}`);
    setVisible(false);
}

const setBackgroundVisibility = (type: String, power: Boolean) => {
    const background = document.querySelector<HTMLElement>(`.${type}.${styles.main}`);
    if(power){
        background && (background.style.visibility = 'visible');
    }else {
        background && (background.style.visibility = 'hidden');
    }
}

const setPopupVisibility = (type: String, power: Boolean, height: string) => {
    const popup = document.querySelector<HTMLElement>(`.${type}.${styles.popup}`);
    if(power){
        popup && (popup.style.height = height);
    }else {
        popup && (popup.style.height = '0px');
    }
}

const validExpireDate = (type: String) => {
    const currentTime = new Date().getTime();
    const storeExpireData = localStorage.getItem(`${type}_POPUP_CLOSE_EXPIRE`);
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

interface PopupSize{
    width: string;
    height: string;
}

interface PopupProps {
    type: String;
    size: PopupSize;
    firework: Boolean;
    visible: Boolean;
    setVisible: any;
}

const Popup: React.FC<PopupProps> = ({ type, size = { width: '400px', height: '150px'}, children, firework = false, setVisible }) => {

    return (
        <div className={[type, styles.main].join(' ')} onClick={() => setVisible(false)}>
            <div className={[type, styles.popup].join(' ')} onClick={(e) => e.stopPropagation()} style={{ width: size.width, height: '0px'}}>
                {children}
            </div>
            {firework && <Fireworks /> }
        </div>
    )   
}

export const NoticePopup: React.FC = () => {
        const [visible, setVisible] = useState(true);
        const is_mobile = useIsMobile();
        const type = 'notice';
        const width = is_mobile ? '98%' : '600px';
        const height = is_mobile ? 'auto' : '290px';

        useEffect(() => {
            if(validExpireDate(type)) setVisible(false); //현재시간이 닫힘유효시간보다 작다면, 팝업 숨기기
        
            setPopupVisibility(type, visible, height);
            setBackgroundVisibility(type, visible);
        }, [visible]);
    
        return (
                <Popup type={type} size={{
                    width,
                    height
                }} visible={visible} setVisible={setVisible} firework={true}>
                    <div><Header title={'🌈 전국블라인드 도매 스토리창 오픈 !!'} /></div>
                    <div><NoticeBody type={type} /></div>
                    <div><ExpireFooter setVisible={setVisible} storeExpireDate={storeExpireDate} /></div>
                </Popup>
        )
}

export const CollectPopup = () => {
    const dispatch = useDispatch();
    const visible = useSelector((state: any) => state?.reducer?.collect_popup?.visible) || false;
    const setVisible = useCallback((v: boolean) => {
        dispatch(new CollectPopupSetData({ visible: v }).toJSON());
    }, []);
    const type = 'collect';
    const width = '600px';
    const height = '280px';

    useEffect(() => {
        setPopupVisibility(type, visible, height);
        setBackgroundVisibility(type, visible);
    });

    return (
            <Popup type={type} size={{
                width,
                height
            }} visible={visible} setVisible={setVisible} firework={false}>
                <div><Header title={'🌏 납품신청문의'} /></div>
                <div><CollectBody type={type} visible={visible} setVisible={setVisible} /></div>
                <div><Footer setVisible={setVisible} /></div>
            </Popup>
    )
}

export const ImagePopup = () => {
    const dispatch = useDispatch();
    const visible = useSelector((state: any) => state?.reducer?.image_popup?.visible) || false;
    const imageUrl = useSelector((state: any) => state?.reducer?.image_popup?.img_url) || '';
    const setVisible = useCallback((v: boolean) => {
        dispatch(new ImagePopupSetData({ visible: v }).toJSON());
    }, []);
    const type = 'image';
    const width = '1000px';
    const height = '780px';

    useEffect(() => {
        setPopupVisibility(type, visible, height);
        setBackgroundVisibility(type, visible);
    });

    return (
            <Popup type={type} size={{
                width,
                height
            }} visible={visible} setVisible={setVisible} firework={false}>
                <div><Header title={'🖼️ 납품업체 시공사진'} /></div>
                <div><ImageBody type={type} visible={visible} setVisible={setVisible} imageUrl={imageUrl} /></div>
                <div><Footer setVisible={setVisible} /></div>
            </Popup>
    )
}
