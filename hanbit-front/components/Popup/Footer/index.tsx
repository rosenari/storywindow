import styles from './index.module.scss';

const CLOSE = '닫기';

export interface FooterPopupProps{
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface expireFooterPopupProps extends FooterPopupProps{
    storeExpireDate: (name: String, setVisible: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

export const ExpireFooter: React.FC<expireFooterPopupProps> = ({ setVisible, storeExpireDate}) => {
    return (
        <div className={[styles.expire,styles.footer].join(' ')}>
            <span className={[styles.expire,styles.today_close].join(' ')} onClick={() => storeExpireDate('notice', setVisible)}>오늘하루닫기</span>
            <button onClick={() => setVisible(false)}>{CLOSE}</button>
        </div>
    )
}

const Footer: React.FC<FooterPopupProps> = ({ setVisible }) => {
    return (
        <div className={[styles.common, styles.footer].join(' ')}>
            <button onClick={() => {
                setVisible(false);
            }}>{CLOSE}</button>
        </div>
    )
}

export default Footer;