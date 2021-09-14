import React, { forwardRef, useImperativeHandle, useState } from 'react';
import axios from 'axios';
import { useVisible } from '../../../hook';
import Link from 'next/link';
import Popup, { FooterPopupProps } from '../index';
import styles from './index.module.scss';

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            🌏 전국파트너문의
        </div>
    )
}

const Body: React.FC<{ setVisible?: any }> = ({ setVisible }) => {
    const [privacy, setPrivacy] = useState(false);
    const [phonenumber, setPhonenumber] = useState('');
    const [state, setState] = useState('연락가능한 휴대폰번호를 입력해주세요.');
    
    return (
        <div className={styles.body}>
            <div className={styles.desc}>👩‍💼 친절한 상담원이 연락을 드립니다.</div>
            <div className={styles.input_box}><input type='text' placeholder='010-0000-0000' onChange={(e) => setPhonenumber(e.target.value)} /></div>
            <div className={styles.submit_box}>
                <div className={styles.state}>{state}</div>
                <div className={styles.input_box}>
                    <input type='checkbox' checked={privacy} onChange={() => setPrivacy(!privacy)} />
                </div>
                <div className={styles.text}>
                    <Link href='/apply/privacy'><a onClick={() => setVisible(false)}>개인정보수집이용동의</a></Link>
                </div>
                <div className={styles.input_box}>
                    <button onClick={() => {
                        if(!privacy){
                            alert('개인정보수집 이용에 동의해주세요.');
                            return;
                        }

                        if(!phonenumber){
                            alert('휴대폰 번호를 입력해주세요.');
                            return;
                        }

                        axios.post('https://api.storywindow.co.kr/api/sms',{
                            phonenumber
                        }).then(result => {
                            if(result?.data?.result === 'success'){
                                alert('파트너 문의가 성공적으로 접수되었습니다.');
                                setVisible(false);
                            }
                        });
                    }}>문의하기</button>
                </div>
            </div>
            <div className={styles.question}>
                <span style={{ padding:'3px', background:'purple', color:'white', borderRadius: '3px'}}>직접 문의하기</span>
                &nbsp;&nbsp;&nbsp;📱 카카오문의) ID: limwj826
                📞 전화문의) TEL: 010 - 0000 - 0000
            </div>
            <div className={styles.opentime}>
                영업시간 : 월-토 09:00 - 21:00 | 일요일 휴무
            </div>
        </div>
    )
}

const Footer: React.FC<FooterPopupProps> = ({ storeExpireData, setVisible }) => {
    return (
        <div className={styles.footer}>
            <button onClick={() => {
                console.log('collection popup');
                setVisible(false);
            }}>닫기</button>
        </div>
    )
}

function collectFor(Popup: any){
    return forwardRef((_, ref) => {
        const [visible, setVisible] = useVisible(false);
        const width = '600px';
        const height = '240px';
        useImperativeHandle(ref, () => ({ setVisible }));

        return (
                <Popup name={'collect'} Header={Header} Body={Body} Footer={Footer} size={{
                    width,
                    height
                }} visible={visible} setVisible={setVisible} />
        )
    });
}

export default collectFor(Popup);