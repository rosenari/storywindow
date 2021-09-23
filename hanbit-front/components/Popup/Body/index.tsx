import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './index.module.scss';

const MESSAGE = {
    NOTICE : ['ㆍ🎉 전국 블라인드 도매업체 스토리창이 오픈되었습니다 !',
            'ㆍ🏭 현재 다수의 인테리어, 블라인드 업체가 이용 중입니다 !',
            'ㆍ👍 소규모 주문하는 업체도 적극 환영합니다 !'],
    CONSULT: '👩‍💼 상담원이 연락을 드립니다.',
    APPROVE_PRIV : '개인정보수집이용동의',
    Q_INPUT : '연락가능한 휴대폰번호를 입력해주세요.',
    Q_KAKAO : '📱 카카오문의) ID: 준비중',
    Q_TEL : '📞 전화문의) 010 - 4414 - 2464',
    Q_APPROVE_PRIV : '개인정보수집 이용에 동의해주세요.',
    Q_TEL_INPUT : '휴대폰 번호를 입력해주세요.',
    DIRECT_CONTACT : '직접 문의하기',
    BUSINESS_TIME : '영업시간 : 월-금 09:00 - 17:00 | 토-일 휴무',
    CONTACT: '문의하기',
    SUCCESS: '파트너 문의가 성공적으로 접수되었습니다.'
}

interface BodyProps {
    type: String;
}

interface NoticeBodyProps extends BodyProps{}

export const NoticeBody: React.FC<NoticeBodyProps> = ({ type }) => {
    
    return (
            <div className={[styles[`${type}`], styles.body].join(' ')}>
                {MESSAGE.NOTICE.map(notice => <div key={notice}>{notice}</div>)}
                &nbsp;{MESSAGE.Q_TEL} <span className={styles.opentime}>({MESSAGE.BUSINESS_TIME})</span>
            </div>
    )
}

interface InputBodyProps extends BodyProps{
    visible: Boolean;
    setVisible: any;
}

const InputBody: React.FC<InputBodyProps> = ({ type, visible, setVisible }) => {
    const [privacy, setPrivacy] = useState(false);
    const [phonenumber, setPhonenumber] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setPrivacy(false);
        setPhonenumber('');
        (inputRef?.current as HTMLInputElement).value = '';
    }, [visible]);
    
    return (
            <div className={[styles[`${type}`], styles.body].join(' ')}>
                <div className={styles.desc}>{MESSAGE.CONSULT}</div>
                <div className={styles.input_box}><input type='text' placeholder='010-0000-0000' ref={inputRef} onChange={(e) => setPhonenumber(e.target.value)} /></div>
                <div className={styles.submit_box}>
                    <div className={styles.state}>{MESSAGE.Q_INPUT}</div>
                    <div className={styles.input_box}>
                        <input type='checkbox' checked={privacy} onChange={() => setPrivacy(!privacy)} />
                    </div>
                    <div className={styles.text}>
                        <Link href='/apply/privacy'><a onClick={() => setVisible(false)}>{MESSAGE.APPROVE_PRIV}</a></Link>
                    </div>
                    <div className={styles.input_box}>
                        <button onClick={() => {
                            if(!privacy){
                                alert(MESSAGE.Q_APPROVE_PRIV);
                                return;
                            }

                            if(!phonenumber){
                                alert(MESSAGE.Q_TEL_INPUT);
                                return;
                            }

                            axios.post('https://api.storywindow.co.kr/api/sms',{
                                phonenumber
                            }).then(result => {
                                if(result?.data?.result === 'success'){
                                    alert(MESSAGE.SUCCESS);
                                    setVisible(false);
                                }
                            });
                        }}>{MESSAGE.CONTACT}</button>
                    </div>
                </div>
                <div className={styles.question}>
                    <span style={{ padding:'3px', background:'purple', color:'white', borderRadius: '3px'}}>{MESSAGE.DIRECT_CONTACT}</span>
                    &nbsp;&nbsp;&nbsp;{MESSAGE.Q_KAKAO}
                    {MESSAGE.Q_TEL}
                </div>
                <div className={styles.opentime}>
                    {MESSAGE.BUSINESS_TIME}
                </div>
            </div>
    )
}

interface CollectBodyProps extends InputBodyProps{}

export const CollectBody: React.FC<CollectBodyProps> = ({ type, visible, setVisible }) => {

    return (
        <>
            <InputBody type={type} visible={visible} setVisible={setVisible} />
        </>
    )
}


interface ImageBodyProps extends InputBodyProps{
    imageUrl: String;
}

export const ImageBody: React.FC<ImageBodyProps> = ({ type, visible, setVisible, imageUrl }) => {
    
    return (
        <>
            <div className={[styles.image, styles.image_container].join(' ')} style={{ background:`url("${imageUrl}") no-repeat`}}></div>
            <InputBody type={type} visible={visible} setVisible={setVisible} />
        </>
    )
}