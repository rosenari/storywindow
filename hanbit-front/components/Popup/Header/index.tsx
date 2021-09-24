import styles from './index.module.scss';

interface HeaderProps{
    title: String;
}

/*🖼️ 시공사진 자세히 보기*/
const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <div className={styles.header}>
            {title}
        </div>
    )
}

export default Header;