import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { getInputCursorCoordinate } from '../../../util';
import { useDispatch } from 'react-redux'
import styles from './index.module.scss';
import { RequestSmsAction } from '../../../store/action/sagaAction';

const MESSAGE = {
    NOTICE : ['ㆍ🎉 전국 블라인드 도매업체 스토리창이 오픈되었습니다 !',
            'ㆍ🏭 현재 다수의 인테리어, 블라인드, 커튼 업체가 이용 중입니다 !',
            'ㆍ👍 소량의 주문업체도 환영합니다 !'],
    CONSULT: '👩‍💼 연락받으실 번호를 입력해 주시면 상담원이 연락드립니다. (문의시 단가표를 보내드립니다.)',
    APPROVE_PRIV : '개인정보수집이용동의',
    Q_INPUT : '연락가능한 휴대폰번호를 입력해주세요.',
    Q_KAKAO : '📱 카카오ID) limwj2464',
    Q_TEL : '📞 휴대폰번호) 010 - 4414 - 2464',
    Q_RTEL : '📞 대표번호) 1588 - 0475',
    Q_APPROVE_PRIV : '개인정보수집 이용에 동의해주세요.',
    Q_TEL_INPUT : '휴대폰 번호를 입력해주세요.',
    DIRECT_CONTACT : '직접 문의하기',
    BUSINESS_TIME : '영업시간 : 월-금 09:00 - 17:00 | 토-일 휴무',
    CONTACT: '문의하기',
    SUCCESS: '납품업체 문의가 성공적으로 접수되었습니다.',
    FAIL: '납품업체 문의가 수리 중 입니다. 유선문의를 이용해주세요.'
}

interface BodyProps {
    type: String;
}

interface NoticeBodyProps extends BodyProps{}

export const NoticeBody: React.FC<NoticeBodyProps> = ({ type }) => {
    
    return (
            <div className={[styles[`${type}`], styles.body].join(' ')}>
                {MESSAGE.NOTICE.map(notice => <div key={notice}>{notice}</div>)}
                &nbsp;{MESSAGE.Q_RTEL} <span className={styles.opentime}>({MESSAGE.BUSINESS_TIME})</span>
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
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorTriger = useCallback((e) => {
        const input: HTMLInputElement = e.target as HTMLInputElement;
        const coordinate = getInputCursorCoordinate(input, input.selectionEnd);
        if(!coordinate) return;                    
        
        (input as HTMLInputElement).placeholder = '';
        const top = coordinate.top - 10;
        const left = coordinate.left + 10;

        (cursorRef?.current as HTMLDivElement).style.top = `${top}px`;
        (cursorRef?.current as HTMLDivElement).style.left = `${left}px`;
        (cursorRef?.current as HTMLDivElement).style.visibility = 'visible';
    },[]);

    useEffect(() => {
        setPrivacy(false);
        setPhonenumber('');
        (inputRef?.current as HTMLInputElement).value = '';
        (cursorRef?.current as HTMLDivElement).style.visibility = 'hidden';
    }, [visible]);
    
    return (
            <div className={[styles[`${type}`], styles.body].join(' ')}>
                <div className={styles.desc}>{MESSAGE.CONSULT}</div>
                <div className={styles.input_box}>
                    <input type='text' maxLength={13} placeholder={'연락가능한 번호를 입력해주세요.'} ref={inputRef} onBlur={() => {
                        (inputRef?.current as HTMLInputElement).placeholder = '연락가능한 번호를 입력해주세요.';
                        (cursorRef?.current as HTMLDivElement).style.visibility = 'hidden';
                     }
                    } onFocus={cursorTriger} onKeyUp={cursorTriger} onChange={(e) => setPhonenumber(e.target.value)} />
                    <div ref={cursorRef} className={styles.input_cursor}>👈 <span className={styles.desc}>번호를 입력해주세요.</span> 
                    <br /> <span className={styles.number}>예) 010-0000-0000&nbsp;</span></div></div>
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

                            dispatch(new RequestSmsAction({ phonenumber, successHandler: () => {
                                alert(MESSAGE.SUCCESS);
                                setVisible(false);
                            }, failHandler: () => {
                                alert(MESSAGE.FAIL);
                            }}).toJSON());
                        }}>{MESSAGE.CONTACT}</button>
                    </div>
                </div>
                <div className={styles.question}>
                    <div><span style={{ padding:'3px', background:'purple', color:'white', borderRadius: '3px'}}>{MESSAGE.DIRECT_CONTACT}</span></div>
                    <div>{MESSAGE.Q_KAKAO}
                    &nbsp;{MESSAGE.Q_TEL}&nbsp;{MESSAGE.Q_RTEL}</div>
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