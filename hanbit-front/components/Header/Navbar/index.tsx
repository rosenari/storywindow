import React from 'react';
import styles from './index.module.css';
import styled from 'styled-components';
import Link from 'next/link';

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
		background:#4ac6f5;
		border-radius:5px;
		margin-right:5px;
		animation: circleani 2s infinite;
		text-align:center;
		
`;
const LOGO_TEXT_BOX = styled.div`
		position:relative;
		display:inline-block;
		width:130px;
		height:60px;
        font-size:0.9em;
`;

const LOGO_TEXT_TOP = styled.div`
		position:relative;
		display:block;
		width:100px;
		height:45px;
		line-height:45px;
        font-size:1.1em;
        font-weight:300;
`;

const LOGO_TEXT_BOTTOM = styled.div`
		position:relative;
		display:block;
		width:100px;
		height:15px;
		line-height:2px;
		font-size:5px;
		letter-spacing:1px;
		font-family:Nanum Gothic;
		font-weight:bold;
`;

const STAMP = styled.div`
		position:absolute;
		z-index:12px;
		top:8px;
		right:10px;
		width:33px;
		height:18px;
		line-height:18px;
		background:#4ac6f5;
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
		right:20px;
		width:11px;
		height:11px;
		background:#4ac6f5;
		animation: ${styles.circleani} 2s infinite;
		border-radius:50%;
`;

const FABRIC_STAMP = styled.div`
		position:absolute;
		z-index:12px;
		top:7px;
		right:0px;
		width:45px;
		height:15px;
		line-height:15px;
		background:#4ac6f5;
		color:white;
		animation: circleani 2s infinite;
		border-radius:2px;
		font-size:10px;
		text-align:center;
		font-weight:300;
`;

interface NavbarProps {
	AllMenu_up: () => void;
	Menu_down1: () => void;
	Menu_down2: () => void;
}

const Navbar: React.FC<NavbarProps> = (props) => {

	return (
		<div className={styles.nav_container}>
			<nav className={styles.navmenu}>
				<LOGO onMouseOver={props.AllMenu_up}>
					<Link href="/">
						<a>
							<LOGO_IMG_BOX><img src="/images/hanbitlogo.png" height="40" /></LOGO_IMG_BOX>
							<LOGO_TEXT_BOX><LOGO_TEXT_TOP>한빛창</LOGO_TEXT_TOP><LOGO_TEXT_BOTTOM>인테리어의 완성</LOGO_TEXT_BOTTOM></LOGO_TEXT_BOX>
							<STAMP>본사</STAMP>
						</a>
					</Link>
				</LOGO>
				<ul className={styles.pc_menu}>
					<li onMouseOver={props.Menu_down1}><Link href="/intro"><a>회사소개</a></Link></li>
					<li onMouseOver={props.AllMenu_up}><Link href="/product"><a>제품소개</a></Link></li>
					<li onMouseOver={props.AllMenu_up}><Link href="/construct"><a ><CONSTRUCT_CIRCLE />파트너 시공</a></Link></li>
					<li onMouseOver={props.AllMenu_up}><Link href="#"><a onClick={(e) => {
						e.preventDefault();
						alert('준비중입니다.');
					}}><FABRIC_STAMP>FABRIC</FABRIC_STAMP>크리스탈쏘잉<img src="/images/sewing.png" height="20" alt="hot" className={styles.sewing_icon} /></a></Link></li>
					<li className={styles.consult_link}><Link href="#"><a onClick={(e) => {
						e.preventDefault();
						alert('준비중입니다.');
					}}><span>전국파트너모집</span><img src="/images/consult_img.png" height="28" width="28" className={styles.consult_img} /></a></Link></li>
				</ul>
			</nav>
		</div>
	)

}

export default Navbar;