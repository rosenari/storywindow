import React from 'react';
import { IoIosCall } from 'react-icons/io';
import Link from 'next/link';
import styles from './css/index.module.css';
import styles_mobile from './css/index_mobile.module.css';
import * as c from './constant'


const Footer: React.FC = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_container}>
                <div className={styles.footer_inner_container_left}>
                    <div className={styles.footer_menu_1}><Link href="/intro"><a>{c.COMPANY_INTRO}</a></Link> | <Link href="/apply/privacy"><a>{c.PRIVACY_POLICY}</a></Link></div>
                    <div className={styles.footer_business_info_first}><span className="call_text"><IoIosCall />{c.TEL}</span>&nbsp;&nbsp;| 영업시간 : {c.WORK_TIME} | {c.REST_TIME} 휴무 </div>
                    <div className={styles.footer_business_info}>대표: {c.OWNER} | 사업자등록번호: {c.REGISTER_NUMBER} | 상호명: {c.COMPANY_NAME} | 사이트명: {c.COMPANY_NAME}</div>
                    <div className={styles.footer_business_info}>공장: {c.FACTORY_ADDR}</div>
                    <div className={styles.footer_menu_4}>{c.DESC}</div>
                </div>
                <div className={styles.footer_inner_container_right}>
                    <div className={styles.footer_logo}><img src="/images/footer_logo.png" width="400" height="130" /></div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
