import React from "react";
import { Cardslider, Image } from "../components";
import Router from "next/router";
import { NextPage } from "next";
import { Context } from "vm";
import axios from "axios";
import FadeIn from "react-fade-in";
import styles from "./css/index.module.css";

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
					<span className={styles.tag}>#전국블라인드도매</span>
					<span className={styles.tag}>#공장제작</span>
					<span className={styles.tag}>#전국최저가</span>
					<span className={styles.tag}>#소량납품환영</span>
				</div>
				<div className={styles.recruit_description} style={{ marginTop:'100px' }}>
					ㆍ <span className={styles.main}>공장</span>에서 블라인드를 직접 제작하여, <span className={styles.main}>전국 최저가</span>로 납품해드립니다
				</div>
				<div className={styles.recruit_description}>
					ㆍ <span className={styles.main}>신생</span> 또는 <span className={styles.main}>소량 납품받는 업체</span>도 감사한 마음으로 친절하게 모십니다.
				</div>
				<div className={styles.recruit_description}>
					ㆍ <span className={styles.main}>건설업체, 관공서, 공공기관</span>에 다량 납품 가능합니다.
				</div>
				</FadeIn>
				<div className={styles.logo_box}>
						<Image url={'/images/storylogo_big.png'} width={300} height={300} />
				</div>
			</div>
			<div className={styles.card_main}>
				<div className={styles.card_slider_header}>
				<strong> 스토리 창
					<span style={{ color: "var(--color-main)" }}> 파트너 시공</span>
				</strong>
				<span className={styles.card_slider_header_more} onClick={() => {
						Router.push('/construct/list');
					}}>더보기</span>
				</div>
				<Cardslider data={props.rankData.result} />
			</div>
		</div>
	);
}

Home.getInitialProps = async (ctx: Context) => {

	console.log("Home getInitialProps !");
	const response = await axios.get(`https://${process.env.API_HOST}/api/getLikeConstructs`);
	console.log("response");
	const data = response.data;

	return {
		rankData: data
	}

}

export default Home;