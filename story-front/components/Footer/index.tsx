import React from 'react';
import { IoIosCall } from "react-icons/io";
import Link from 'next/link';
import styles from "./index.module.css";

const footer_info = {
	"company_intro": "회사소개",
	"tel": "",
	"phone": "",
	"business_info": {
		"ceo_name": "임원재",
		"register_number": "768-15-01230",
		"factory_address": "경기도 광주시 오포읍 매자리길 53-32"
	},
}

const Footer: React.FC = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_container}>
                <div className={styles.footer_inner_container_left}>
                    <div className={styles.footer_menu_1}><Link href="/intro"><a>회사소개</a></Link> | <Link href="/apply/privacy"><a>개인정보처리방침</a></Link></div>
                    <div className={styles.footer_business_info_first}><span className="call_text"><IoIosCall />1588 - 0475</span>&nbsp;&nbsp;| 영업시간 : 월-금 09:00 - 17:00 | 토-일 휴무 </div>
                    <div className={styles.footer_business_info}>대표: {footer_info.business_info.ceo_name} | 사업자등록번호: {footer_info.business_info.register_number}</div>
                    <div className={styles.footer_business_info}>공장: {footer_info.business_info.factory_address}</div>
                    <div className={styles.footer_menu_4}>스토리 창은 소매업체를 적극 지원하는 전국 블라인드 도매업체입니다.</div>
                </div>
                <div className={styles.footer_inner_container_right}>
                    <div className={styles.footer_logo}><img src="/images/footer_logo.png" width="400" height="130" /></div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
