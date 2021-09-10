import React from "react";
import { Cardslider, Image } from "../components";
import Router from "next/router";
import { NextPage } from "next";
import { Context } from "vm";
import axios from "axios";
import FadeIn from "react-fade-in";
import styled from 'styled-components';
import styles from "./css/index.module.scss";

const IMG_URL = {
	BIG_LOGO: '/images/storylogo_big.png',
	INTERIOR_VECTOR: '/images/interior_vector.png',
	BLIND_VECTOR: '/images/blind_vector.png'
}

const TAGS = ['#전국블라인드도매', '#공장제작', '#전국최저가', '#소량주문환영'].map((tag, i) => ({ id: i + 1, tag}));

const INTERIOR_DESCRIPTION = [
	'ㆍ인테리어 완성을 위한 고품질의 블라인드를 전국 최저가에 제공해드립니다.',
	'ㆍ공장에서 정확한 치수로 맞춤제작하여, 인테리어의 완성도를 높여드립니다.'
].map((desc, i) => ({ id: i + 1, desc}));

const BLIND_DESCRIPTION = [
	'ㆍ소규모 블라인드, 커튼업체를 적극 지원해드립니다.',
	'ㆍ단 한개의 납품도 최선을 다해 진행합니다.',
	'ㆍ함께하는 성장을 추구합니다.'
].map((desc, i) => ({ id: i + 1, desc}));

const rounds = [
	{
		top: 300,
		left: 700,
		width: 500,
		height: 500,
		duration: 3.0,
		delay: 1.0
	},
	{
		top: 100,
		left: 100,
		width: 300,
		height: 300,
		duration: 4.2,
		delay: 0.0
	},
	{
		top: 0,
		left: -500,
		width: 200,
		height: 200,
		duration: 2.0,
		delay: 2.0
	},
	{
		top: 200,
		left: -900,
		width: 300,
		height: 300,
		duration: 3.2,
		delay: 0.0
	},
];

interface RoundProps {
	top: number;
	left: number;
	width: number;
	height: number;
	duration: number;
	delay: number;
}

const ROUND = styled.div<RoundProps>`
		position: absolute;
		opacity: 0;
		top: ${props => props.top}px;
		left: calc(50% + ${props => props.left}px);
		width: ${props => props.width}px;
		height: ${props => props.height}px;
		background-image:url('/images/round01.png');
		background-size: ${props => props.width}px ${props => props.height}px;
		animation:${styles.zoom_animation} ${props => props.duration}s ${props => props.delay}s ease-in-out infinite;
		z-index: -10;
`;

interface HomeProps {
	rankData: any
}

const Home: NextPage<HomeProps> = (props) => {

	return (
		<div>
			<div className={styles.recruit_main}>
				<FadeIn delay={300}>
				<div className={styles.recruit_title}>
					스토리창 <span className={styles.main}>전국 파트너</span> 모집
				</div>
				<div className={styles.tag_main}>
					{TAGS.map(({ id, tag }) => <span key={id} className={styles.tag}>{tag}</span>)}
				</div>
				<div className={styles.recruit_description} style={{ marginTop:'100px' }}>
					ㆍ <span className={styles.main}>공장</span>에서 블라인드를 직접 제작하여, <span className={styles.main}>전국 최저가</span>로 납품해드립니다
				</div>
				<div className={styles.recruit_description}>
					ㆍ <span className={styles.main}>신생</span> 또는 <span className={styles.main}>소량 발주하는 업체</span>도 감사한 마음으로 친절하게 모십니다.
				</div>
				<div className={styles.recruit_description}>
					ㆍ <span className={styles.main}>건설업체, 관공서, 공공기관</span>에 대량 납품 가능합니다.
				</div>
				</FadeIn>
				<div className={styles.logo_box}>
						<Image url={IMG_URL.BIG_LOGO} width={300} height={300} />
				</div>
			</div>
			<div className={styles.card_main}>
				<div className={styles.card_slider_subheader}>
					현재 다수의 업체가 스토리창과 함께하고 있습니다.
				</div>
				<div className={styles.card_slider_header}>
					<strong> 스토리 창
						<span style={{ color: "var(--color-main)" }}> 파트너 시공사례</span>
					</strong>
				<span className={styles.card_slider_header_more} onClick={() => {
						Router.push('/construct/list');
					}}>더보기</span>
				</div>
				<Cardslider data={props.rankData.result} />
			</div>
			<div className={styles.industry_main}>
				<div className={styles.industry_header}>
					<strong> 
						<span style={{ color: "var(--color-main)" }}>파트너</span> 주요 업종
					</strong>
				</div>
				<div className={styles.industry_body}>
					<div className={[styles.box, styles.interior].join(' ')}>
						<div className={styles.header}>
							<span className={styles.text}>인테리어</span>
						</div>
						<div className={styles.body}>
							<div className={styles.description_box}>
								{INTERIOR_DESCRIPTION.map(({ id, desc }) => <div key={id} className={styles.description}>{desc}</div>)}
							</div>
							<div className={styles.img_box}>
								<img src={IMG_URL.INTERIOR_VECTOR} width={200} />
							</div>
						</div>
					</div>
					<div className={[styles.box, styles.blind].join(' ')}>
						<div className={styles.header}>
							<span className={styles.text}>블라인드</span>
						</div>
						<div className={styles.body}>
							<div className={styles.description_box}>
								{BLIND_DESCRIPTION.map(v => <div key={v.id} className={styles.description}>{v.desc}</div>)}
							</div>
							<div className={styles.img_box}>
								<img src={IMG_URL.BLIND_VECTOR} width={200} />
							</div>
						</div>
					</div>
				</div>
			</div>
			{rounds.map(({ top, left, width, height, duration, delay}) => 
				<ROUND top={top} left={left} width={width} height={height} duration={duration} delay={delay} />)}
		</div>
	);
}

Home.getInitialProps = async (ctx: Context) => {

	const response = await axios.get(`https://${process.env.API_HOST}/api/getLikeConstructs`);
	const data = response.data;

	return {
		rankData: data
	}

}

export default Home;