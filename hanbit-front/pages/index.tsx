import React from 'react';
import { Imgslider, Cardslider, Cardmenu, Shortcut } from '../components';
import styles from "./css/index.module.css";
import Router from 'next/router';
import { NextPage } from 'next';
import { Context } from 'vm';
import axios from 'axios';

interface HomeProps {
	rankData: any
}

const Home: NextPage<HomeProps> = (props) => {

	return (
		<div>
			<Imgslider Img={['/images/slide_one.png', '/images/slide_two.png']} />
			<div className={styles.card_main}>
				<div className={styles.card_slider_header}>
					고객님께 추천하는
				<strong> 스토리 창
					<span style={{ color: "var(--color-main)" }}> 베스트 시공</span>
					</strong> 모음
				<span className={styles.card_slider_header_more} onClick={() => {
						Router.push('/construct/list');
					}}>더보기</span>
				</div>
				<Cardslider data={props.rankData.result} />
			</div>
			<Cardmenu data={[
				{ img: '/images/spaceimg_1.png', text: '아파트/빌라/다가구' },
				{ img: '/images/spaceimg_2.png', text: '단독∙전원∙상가주택' },
				{ img: '/images/spaceimg_3.png', text: '상업공간' },
				{ img: '/images/spaceimg_4.png', text: '사무실/관공서 기타' }
			]} />
			<Shortcut />
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