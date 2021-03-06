import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { getInputCursorCoordinate } from '@/util/index';
import { useDispatch } from 'react-redux'
import styles from './index.module.scss';
import styles_mobile from './index_mobile.module.scss';
import { RequestSmsAction } from '@/store/action/sagaAction';
import { useCssSelector, useIsMobile } from '@/hooks/index';

const MESSAGE = {
    NOTICE : ['ใ๐ ์ ๊ตญ ๋ธ๋ผ์ธ๋ ๋๋งค์์ฒด ์คํ ๋ฆฌ์ฐฝ์ด ์คํ๋์์ต๋๋ค !',
            'ใ๐ญ ํ์ฌ ๋ค์์ ์ธํ๋ฆฌ์ด, ๋ธ๋ผ์ธ๋, ์ปคํผ ์์ฒด๊ฐ ์ด์ฉ ์ค์๋๋ค !',
            'ใ๐ ์๋์ ์ฃผ๋ฌธ์์ฒด๋ ํ์ํฉ๋๋ค !'],
    CONSULT: '๐ฉโ๐ผ ์ฐ๋ฝ๋ฐ์ผ์ค ๋ฒํธ๋ฅผ ์๋ ฅํด ์ฃผ์๋ฉด ์๋ด์์ด ์ฐ๋ฝ๋๋ฆฝ๋๋ค. (๋ฌธ์์ ๋จ๊ฐํ๋ฅผ ๋ณด๋ด๋๋ฆฝ๋๋ค.)',
    APPROVE_PRIV : '๊ฐ์ธ์ ๋ณด์์ง์ด์ฉ๋์',
    Q_INPUT : '์ฐ๋ฝ๊ฐ๋ฅํ ํด๋ํฐ๋ฒํธ๋ฅผ ์๋ ฅํด์ฃผ์ธ์.',
    Q_KAKAO : '๐ฑ ์นด์นด์คID) limwj2464',
    Q_TEL : '๐ ํด๋ํฐ๋ฒํธ) 010 - 4414 - 2464',
    Q_RTEL : '๐ ๋ํ๋ฒํธ) 1588 - 0475',
    Q_APPROVE_PRIV : '๊ฐ์ธ์ ๋ณด์์ง ์ด์ฉ์ ๋์ํด์ฃผ์ธ์.',
    Q_TEL_INPUT : 'ํด๋ํฐ ๋ฒํธ๋ฅผ ์๋ ฅํด์ฃผ์ธ์.',
    DIRECT_CONTACT : '์ง์  ๋ฌธ์ํ๊ธฐ',
    BUSINESS_TIME : '์์์๊ฐ : ์-๊ธ 09:00 - 17:00 | ํ -์ผ ํด๋ฌด',
    CONTACT: '๋ฌธ์ํ๊ธฐ',
    SUCCESS: '๋ฉํ์์ฒด ๋ฌธ์๊ฐ ์ฑ๊ณต์ ์ผ๋ก ์ ์๋์์ต๋๋ค.',
    FAIL: '๋ฉํ์์ฒด ๋ฌธ์๊ฐ ์๋ฆฌ ์ค ์๋๋ค. ์ ์ ๋ฌธ์๋ฅผ ์ด์ฉํด์ฃผ์ธ์.'
}

interface BodyProps {
    type: String;
}

interface NoticeBodyProps extends BodyProps{}

export const NoticeBody: React.FC<NoticeBodyProps> = ({ type }) => {
    const css = useCssSelector({ pc: styles, mobile: styles_mobile });
    
    return (
            <div className={[css[`${type}`], css.body].join(' ')}>
                {MESSAGE.NOTICE.map(notice => <div key={notice}>{notice}</div>)}
                &nbsp;{MESSAGE.Q_RTEL} <span className={css.opentime}>({MESSAGE.BUSINESS_TIME})</span>
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
    const css = useCssSelector({ pc: styles, mobile: styles_mobile });
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
            <div className={[css[`${type}`], css.body].join(' ')}>
                <div className={css.desc}>{MESSAGE.CONSULT}</div>
                <div className={css.input_box}>
                    <input type='text' maxLength={13} placeholder={'์ฐ๋ฝ๊ฐ๋ฅํ ๋ฒํธ๋ฅผ ์๋ ฅํด์ฃผ์ธ์.'} ref={inputRef} onBlur={() => {
                        (inputRef?.current as HTMLInputElement).placeholder = '์ฐ๋ฝ๊ฐ๋ฅํ ๋ฒํธ๋ฅผ ์๋ ฅํด์ฃผ์ธ์.';
                        (cursorRef?.current as HTMLDivElement).style.visibility = 'hidden';
                     }
                    } onFocus={cursorTriger} onKeyUp={cursorTriger} onChange={(e) => setPhonenumber(e.target.value)} />
                    <div ref={cursorRef} className={css.input_cursor}>๐ <span className={css.desc}>๋ฒํธ๋ฅผ ์๋ ฅํด์ฃผ์ธ์.</span> 
                    <br /> <span className={css.number}>์) 010-0000-0000&nbsp;</span></div></div>
                <div className={css.submit_box}>
                    <div className={css.state}>{MESSAGE.Q_INPUT}</div>
                    <div className={css.input_box}>
                        <input type='checkbox' checked={privacy} onChange={() => setPrivacy(!privacy)} />
                    </div>
                    <div className={css.text}>
                        <Link href='/apply/privacy'><a onClick={() => setVisible(false)}>{MESSAGE.APPROVE_PRIV}</a></Link>
                    </div>
                    <div className={css.input_box}>
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
                <div className={css.question}>
                    <div><span style={{ padding:'3px', background:'#007bc7', color:'white', borderRadius: '3px'}}>{MESSAGE.DIRECT_CONTACT}</span></div>
                    <div>{MESSAGE.Q_KAKAO}
                    &nbsp;{MESSAGE.Q_TEL}&nbsp;{MESSAGE.Q_RTEL}</div>
                </div>
                <div className={css.opentime}>
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
