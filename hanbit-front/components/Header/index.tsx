import React, { useCallback, useRef, useState } from 'react';
import Top from "./Top";
import Navbar from "./Navbar";
import Submenu from "./Submenu";
import styles from './index.module.css';

const Header: React.FC = () => {


	/* 서브메뉴 관련 훅,콜백 */
	const [submenu1, setSubmenu1] = useState(false); //false는 안보임
	const [submenu2, setSubmenu2] = useState(false); //false는 안보임

	const submenubox = useRef<HTMLDivElement>(null);
	const submenu_1_area = useRef<HTMLDivElement>(null);

	const AllMenu_up = useCallback(() => {
		setSubmenu1(false);
		setSubmenu2(false);

		if (submenubox.current) submenubox.current.style.height = "0px";
		if (submenu_1_area.current) submenu_1_area.current.style.height = "0px";
	}, [submenubox, submenu_1_area]);

	const Menu_down1 = useCallback(() => {
		AllMenu_up();
		setSubmenu1(true);

		if (submenubox.current) submenubox.current.style.height = "90px";
		if (submenu_1_area.current) submenu_1_area.current.style.height = "80px";
	}, [submenubox, submenu_1_area]);

	const Menu_down2 = useCallback(() => {
		AllMenu_up();
		setSubmenu2(true);

		if (submenubox.current) submenubox.current.style.height = "90px";
		if (submenu_1_area.current) submenu_1_area.current.style.height = "80px";
	}, [submenubox, submenu_1_area]);

	return (
		<div className={styles.header} onMouseLeave={AllMenu_up}>
			<Top AllMenu_up={AllMenu_up} />
			<Navbar
				AllMenu_up={AllMenu_up}
				Menu_down1={Menu_down1}
				Menu_down2={Menu_down2}
			/>
			<Submenu
				AllMenu_up={AllMenu_up}
				Menu_down1={Menu_down1}
				Menu_down2={Menu_down2}
				submenu1={submenu1}
				submenu2={submenu2}
				submenubox={submenubox}
				submenu_1_area={submenu_1_area}
			/>
		</div>
	)
}

export default Header;