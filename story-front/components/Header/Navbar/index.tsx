import React, {useRef} from 'react';
import styles from './index.module.scss';
import styled , { css } from 'styled-components';
import Link from 'next/link';
import { CollectPopup } from '../..';


const LogoLink = css`
	& a {
		color:#555;
		letter-spacing:2px;
	}
`;

const LogoLinkHover = css`
	& a:hover{
		text-decoration:none;
	}
`;

const LogoImage = css`
	& img{
		margin-top:2px;
		margin-left:3px;
	}
`;

const Logo = styled.div`
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
		${LogoLink}
		${LogoLinkHover}
`;

const LogoImageBox = styled.div`
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
		${LogoImage}
		
`;
const LogoTextBox = styled.div`
		position:relative;
		display:inline-block;
		width:140px;
		height:60px;
        font-size:0.9em;
`;

const LogoTextInnerBox = styled.div`
		position:relative;
		display:block;
		width:140px;
`;

const LogoTextInnerTopBox = styled(LogoTextInnerBox)`
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

const LogoTextInnerBottomBox = styled(LogoTextInnerBox)`
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
		z-index:12;
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

const ProductCircle = styled.div`
		position:absolute;
		z-index:12;
		top:13px;
		right:0px;
		width:11px;
		height:11px;
		background:var(--color-main);
		animation: ${styles.circleani} 2s infinite;
		border-radius:50%;
`;

interface NavbarProps {
	AllMenu_up: () => void;
	Menu_down: () => void;
}

const Navbar: React.FC<NavbarProps> = (props) => {
	const popupRef = useRef<{ setVisible?: any}>({});

	return (
		<div className={styles.nav_container}>
			<nav className={styles.navmenu}>
				<Logo onMouseOver={props.AllMenu_up}>
					<Link href="/">
						<a>
							<LogoImageBox><img src="/images/storylogo.png" height="45" /></LogoImageBox>
							<LogoTextBox><LogoTextInnerTopBox>스토리창</LogoTextInnerTopBox><LogoTextInnerBottomBox>&nbsp;</LogoTextInnerBottomBox></LogoTextBox>
							<STAMP>전국 블라인드 도매</STAMP>
						</a>
					</Link>
				</Logo>
				<ul>
					<li onMouseOver={props.Menu_down}><Link href="/intro"><a>회사소개</a></Link></li>
					<li onMouseOver={props.AllMenu_up}><Link href="/product/list"><a><ProductCircle />납품업체 시공모음</a></Link></li>
					<li>
						<Link href='/'>
							<a onClick={(e) => {
								e.preventDefault();
								popupRef.current.setVisible(true);
							}}>
								<span>납품신청문의</span>
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