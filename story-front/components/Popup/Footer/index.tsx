import useCssSelector from '@/hooks/useCssSelector';
import styles from './index.module.scss';
import styles_mobile from './index_mobile.module.scss';

const CLOSE = '닫기';

export interface FooterPopupProps{
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface expireFooterPopupProps extends FooterPopupProps{
    storeExpireDate: (name: String, setVisible: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

export const ExpireFooter: React.FC<expireFooterPopupProps> = ({ setVisible, storeExpireDate}) => {
    const css = useCssSelector({ pc: styles, mobile: styles_mobile });

    return (
        <div className={[css.expire, css.footer].join(' ')}>
            <span className={[css.expire, css.today_close].join(' ')} onClick={() => storeExpireDate('notice', setVisible)}>오늘하루닫기</span>
            <button onClick={() => setVisible(false)}>{CLOSE}</button>
        </div>
    )
}

const Footer: React.FC<FooterPopupProps> = ({ setVisible }) => {
    const css = useCssSelector({ pc: styles, mobile: styles_mobile });

    return (
        <div className={[css.common, css.footer].join(' ')}>
            <button onClick={() => {
                setVisible(false);
            }}>{CLOSE}</button>
        </div>
    )
}

export default Footer;
