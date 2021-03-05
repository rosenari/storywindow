import React from 'react';
import { Imgslider, Cardslider } from '../components';
import styles from "./css/index.module.css";

export default function Home() {

	return (
		<div>
			<Imgslider Img={['/images/slide_hanbit2.png', '/images/slide_hanbit1.png']} />
			<div className={styles.card_main}>
				<div className={styles.card_slider_header}>
					고객님께 추천하는
				<strong> 한빛창
					<span style={{ color: "#4ac6f5" }}> 베스트 시공</span>
					</strong> 모음
				<span className={styles.card_slider_header_more}>더보기</span>
				</div>
				<Cardslider />
			</div>
		</div>
	);
}

