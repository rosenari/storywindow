import React from 'react';
import { useVisible } from '../../../hook';
import styles from './index.module.scss';
import Popup, { FooterPopupProps } from '../index';

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            🌈 전국블라인드 도매 스토리창 오픈 !!
        </div>
    )
}

const Body: React.FC = () => {
    return (
        <div className={styles.body}>
            ㆍ🎉 전국 블라인드 도매업체 스토리창이 오픈되었습니다 !<br />
            ㆍ🏭 현재 다수의 인테리어, 블라인드 업체가 이용 중입니다 !<br />
            ㆍ👍 소규모 주문하는 업체도 적극 환영합니다 !<br />
            &nbsp;📞 문의) 010 - 4414 - 2464 <span className={styles.opentime}>(영업시간 : 월-금 09:00 - 17:00 | 토-일 휴무)</span>
        </div>
    )
}

const Footer: React.FC<FooterPopupProps> = ({ storeExpireData, setVisible }) => {
    return (
        <div className={styles.footer}>
            <span className={styles.today_close} onClick={() => storeExpireData('notice', setVisible)}>오늘하루닫기</span>
            <button onClick={() => setVisible(false)}>닫기</button>
        </div>
    )
}

function noticeFor(Popup: any){
    return () => {
        const [visible, setVisible] = useVisible(true);
        const width = '600px';
        const height = '290px';
    
        return (
                <Popup name={'notice'} Header={Header} Body={Body} Footer={Footer} size={{
                    width,
                    height
                }} visible={visible} setVisible={setVisible} />
        )
    }
}

export default noticeFor(Popup);