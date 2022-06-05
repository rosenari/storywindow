import React, { useCallback, useRef, useState } from 'react';
import Top from './Top';
import Navbar from './Navbar';
import Submenu from './Submenu';
import styles from './index.module.scss';

interface SubMenuVisibleProps {
	init: boolean;
	subMenuBox: HTMLDivElement | null;
	subMenuArea: HTMLDivElement | null;
}

type SubMenuVisibleReturnType = [ visible: boolean, handler: (visible: boolean) => void];

const useSubMenuVisible = ({ init = false, subMenuBox, subMenuArea } : SubMenuVisibleProps): SubMenuVisibleReturnType => {
	const [visible, setVisible] = useState<boolean>(init);

	const setVisibleSubMenu = useCallback((visible: boolean) => {
		if(!subMenuBox || !subMenuArea) return;
		
		if(visible){
			subMenuBox.style.height = '90px';
			subMenuArea.style.height = '80px';
		}else {
			subMenuBox.style.height = '0px';
			subMenuArea.style.height = '0px';
		}
	}, [subMenuBox, subMenuArea]);

	const handler = useCallback((visible: boolean) => {
		setVisible(visible);
		setVisibleSubMenu(visible);
		return;
	}, []);

	return [visible, handler];
}

const HeaderPc: React.FC = () => {
	const subMenuBox = useRef<HTMLDivElement>(null);
	const subMenuArea = useRef<HTMLDivElement>(null);
	const [subMenuVisible, setSubMenuVisible] = useSubMenuVisible({ 
		init: false, 
		subMenuBox: subMenuBox.current, 
		subMenuArea: subMenuArea.current });

	const AllMenu_up = useCallback(() => {
		setSubMenuVisible(false);
	}, []);

	const Menu_down = useCallback(() => {
		setSubMenuVisible(false);
		setSubMenuVisible(true);
	}, []);

	return (
		<div className={styles.header} onMouseLeave={AllMenu_up}>
			<Top AllMenu_up={AllMenu_up} />
			<Navbar
				AllMenu_up={AllMenu_up}
				Menu_down={Menu_down}
			/>
			<Submenu
				AllMenu_up={AllMenu_up}
				Menu_down={Menu_down}
				subMenuVisible={subMenuVisible}
				subMenuBoxRef={subMenuBox}
				subMenuAreaRef={subMenuArea}
			/>
		</div>
	)
}

export default HeaderPc;
