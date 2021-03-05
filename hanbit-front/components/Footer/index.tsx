import React from 'react';
import { IoIosCall } from "react-icons/io";
import styles from "./index.module.css";

const Footer: React.FC = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_container}>
                <div className={styles.footer_inner_container_left}>
                    <div className={styles.footer_menu_1}>회사소개&nbsp;&nbsp;{/*<strong>개인정보처리방침</strong>&nbsp;&nbsp;이용약관&nbsp;&nbsp;*/}사업자정보</div>
                    <div className={styles.footer_menu_2}><span className="call_text"><IoIosCall />042-581-2464</span>&nbsp;&nbsp; 월-토 09:00 - 21:00 | 일요일 휴무 | 팩스 042-545-7220 | 이메일 limwj2464@naver.com </div>
                    <div className={styles.footer_menu_3}>대표: 임원재 | 주소: 대전광역시 유성구 원내동 296-9(홈데코갤러리 1층) | 사업자등록번호: 000-00-00000</div>
                    <div className={styles.footer_menu_4}>한빛창은 고객에게 감동과 기쁨을 드리는 커튼블라인드 기업입니다.</div>
                </div>
                <div className={styles.footer_inner_container_right}>
                    <div className={styles.footer_logo}><img src="/images/footer_logo.png" width="180" height="130" /></div>
                </div>
            </div>
        </div>
    )
}

export default Footer;