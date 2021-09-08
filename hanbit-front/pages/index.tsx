import React from 'react';
import { Imgslider, Cardslider, Cardmenu } from '../components';
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