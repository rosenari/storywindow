import React from 'react';
import { IoIosCall } from "react-icons/io";
import Link from 'next/link';
import styles from "./index.module.css";

const Footer: React.FC = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_container}>
                <div className={styles.footer_inner_container_left}>
                    <div className={styles.footer_menu_1}><Link href="/intro"><a>회사소개</a></Link> | <Link href="/apply/privacy"><a>개인정보처리방침</a></Link></div>
                    <div className={styles.footer_menu_2}><span className="call_text"><IoIosCall />000-000-0000</span>&nbsp;&nbsp;| 월-토 09:00 - 21:00 | 일요일 휴무 </div>
                    <div className={styles.footer_menu_3}>대표: 임원재 | 사업자등록번호: 768-15-01230</div>
                    <div className={styles.footer_menu_4}>스토리 창은 파트너 업체를 적극 지원하는 전국 블라인드 도매업체입니다.</div>
                </div>
                <div className={styles.footer_inner_container_right}>
                    <div className={styles.footer_logo}><img src="/images/footer_logo.png" width="400" height="130" /></div>
                </div>
            </div>
        </div>
    )
}

export default Footer;