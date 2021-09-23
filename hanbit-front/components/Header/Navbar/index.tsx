import React, {useRef} from 'react';
import styles from './index.module.css';
import styled from 'styled-components';
import Link from 'next/link';
import { CollectPopup } from '../..';

const LOGO = styled.div`
	    position:relative;
        z-index:12;
        float:left;
        width:210px;
        margin-right:20px;
        height:60px;
        line-height:60px;
        font-family: 'Do Hyeon', sans-serif;
        font-size:2.0em;
        text-align:center;
        color:#555;
        
        & a {
        	color:#555;
        	letter-spacing:2px;
        }
        
        & a:hover{
        	text-decoration:none;
        }
        
        & img{
            margin-top:2px;
        	margin-left:3px;
        }
`;
const LOGO_IMG_BOX = styled.div`
		float:left;
		position:relative;
		margin-top:7px;
		margin-left:10px;
		width:45px;
		height:45px;
		line-height:45px;
		border-radius:5px;
		margin-right:5px;
		animation: circleani 2s infinite;
		text-align:center;
		
`;
const LOGO_TEXT_BOX = styled.div`
		position:relative;
		display:inline-block;
		width:140px;
		height:60px;
        font-size:0.9em;
`;

const LOGO_TEXT_TOP = styled.div`
		position:relative;
		display:block;
		width:140px;
		height:45px;
		line-height:45px;
		font-family: 'Do Hyeon', sans-serif;
        font-size:0.9em;
        font-weight:500;
		letter-spacing:3px;
		text-align:left;
		padding-left:20px;
		color:#555;
		transform: scaleX(1.15);
`;

const LOGO_TEXT_BOTTOM = styled.div`
		position:relative;
		display:block;
		width:140px;
		height:15px;
		line-height:2px;
		font-size:5px;
		letter-spacing:1px;
		font-family:Nanum Gothic;
		font-weight:bold;
		text-align:right;
		padding-right:5px;
`;

const STAMP = styled.div`
		position:absolute;
		z-index:12px;
		bottom:6px;
		left:70px;
		width:118px;
		height:16px;
		line-height:16px;
		background:var(--color-main);
		color:white;
		animation: ${styles.circleani} 2s infinite;
		border-radius:2px;
		font-size:0.3em;
		text-align:center;
		font-family:Nanum Gothic;
`;

const CONSTRUCT_CIRCLE = styled.div`
		position:absolute;
		z-index:12px;
		top:13px;
		right:5px;
		width:11px;
		height:11px;
		background:var(--color-main);
		animation: ${styles.circleani} 2s infinite;
		border-radius:50%;
`;

const CLICKME = styled.div`
		z-index:100;
		position:absolute;
		right:200px;
		top:0px;
		width:40px;
		height:40px;
		background-image: url('/images/clickme.png');
		animation: ${styles.bounce} 2s infinite;
`;

const CLICKME_TEXT = styled.div`
		z-index:100;
		position:absolute;
		right:204px;
		top:25px;
		width:90px;
		height:40px;
		line-height:40px;
		font-size:1.2em;
		color:var(--color-main);
		font-family:'Nanum Brush Script';
		animation: ${styles.bounce} 2s infinite;
`;

interface NavbarProps {
	AllMenu_up: () => void;
	Menu_down1: () => void;
	Menu_down2: () => void;
}

const Navbar: React.FC<NavbarProps> = (props) => {
	const popupRef = useRef<{ setVisible?: any}>({});

	return (
		<div className={styles.nav_container}>
			<nav className={styles.navmenu}>
				<LOGO onMouseOver={props.AllMenu_up}>
					<Link href="/">
						<a>
							<LOGO_IMG_BOX><img src="/images/storylogo.png" height="45" /></LOGO_IMG_BOX>
							<LOGO_TEXT_BOX><LOGO_TEXT_TOP>스토리창</LOGO_TEXT_TOP><LOGO_TEXT_BOTTOM>&nbsp;</LOGO_TEXT_BOTTOM></LOGO_TEXT_BOX>
							<STAMP>전국 블라인드 도매</STAMP>
						</a>
					</Link>
				</LOGO>
				<ul className={styles.pc_menu}>
					<li onMouseOver={props.Menu_down1}><Link href="/intro"><a>회사소개</a></Link></li>
					<li onMouseOver={props.AllMenu_up}><Link href="/product/list"><a><CONSTRUCT_CIRCLE />파트너 시공모음</a></Link></li>
					{/*<li onMouseOver={props.AllMenu_up}><Link href="/construct/list"><a ><CONSTRUCT_CIRCLE />파트너 시공</a></Link></li>*/}

					<li className={styles.consult_link}>
						<Link href='/'>
							<a onClick={(e) => {
								e.preventDefault();
								popupRef.current.setVisible(true);
							}}>
								<span>전국파트너문의</span>
								<img src="/images/consult_img.png" height="28" width="28" className={styles.consult_img} />
							</a>
						</Link>
					</li>
				</ul>
			</nav>
			<CollectPopup ref={popupRef} />
		</div>
	)

}

export default Navbar;