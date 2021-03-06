import React from 'react';
import { Imgslider, Cardslider, Cardmenu, Shortcut } from '../components';
import styles from "./css/index.module.css";
import Router from 'next/router';

const Home: React.FC = () => {

	return (
		<div>
			<Imgslider Img={['/images/slide_hanbit2.png', '/images/slide_hanbit1.png']} />
			<div className={styles.card_main}>
				<div className={styles.card_slider_header}>
					고객님께 추천하는
				<strong> 한빛창
					<span style={{ color: "#4ac6f5" }}> 베스트 시공</span>
					</strong> 모음
				<span className={styles.card_slider_header_more} onClick={() => {
						Router.push('/construct/list');
					}}>더보기</span>
				</div>
				<Cardslider />
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

export default Home;