import { useState } from 'react';
import Navbar from './Navbar';
import Menu from './Menu';
import styles from './index.module.css';

const HeaderMobile: React.FC = () => {
    const [menu_opened, setOpen] = useState(false);

	return (
        <div className={styles.header}>
            <Navbar setOpen={setOpen} />
            <Menu menu_opened={menu_opened} setOpen={setOpen} />
		</div>
	)
}

export default HeaderMobile;
