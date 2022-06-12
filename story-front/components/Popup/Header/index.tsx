import styles from './index.module.scss';
import styles_mobile from './index_mobile.module.scss';
import { useCssSelector } from '@/hooks/index';

interface HeaderProps{
    title: String;
}

/*🖼️ 시공사진 자세히 보기*/
const Header: React.FC<HeaderProps> = ({ title }) => {
    const css = useCssSelector({ pc: styles, mobile: styles_mobile });

    return (
        <div className={css.header}>
            {title}
        </div>
    )
}

export default Header;
