import React from 'react';
import styles from './index.module.scss';
import Popup, { FooterPopupProps } from '../index';

const NoticePopup: React.FC = () => {
    const width = '400px';
    const height = '230px';

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
                &nbsp;📞 문의) 010 - 0000 - 0000
            </div>
        )
    }

    const Footer: React.FC<FooterPopupProps> = ({ setVisible }) => {
        return (
            <div className={styles.footer}>
                <button onClick={() => setVisible(false)}>닫기</button>
            </div>
        )
    }

    return (
        <Popup name={'notice'} Header={Header} Body={Body} Footer={Footer} size={{
            width,
            height
        }} />
    )
}

export default NoticePopup;