import React from 'react';
import { Imgslider, Cardslider, Cardmenu, Shortcut } from '../components';
import styles from "./css/index.module.css";
import Router from 'next/router';

const Home: React.FC = () => {

	return (
		<div>
			<Imgslider Img={['/images/slide_three.png', '/images/slide_four.png']} />
			<div className={styles.card_main}>
				<div className={styles.card_slider_header}>
					고객님께 추천하는
				<strong> 노아의 창
					<span style={{ color: "#f6ad26" }}> 베스트 시공</span>
					</strong> 모음
				<span className={styles.card_slider_header_more} onClick={() => {
						Router.push('/construct/list');
					}}>더보기</span>
				</div>
				<Cardslider data={[
					{
						rank: "테스트데이터",
						imgUrl: "/images/card_image_1.png",
						title: "깔끔한 분위기의 식당으로 변신 ! - TestData",
						tags: ["상업공간", "콤비블라인드"]
					},
					{
						rank: "테스트데이터",
						imgUrl: "/images/card_image_2.png",
						title: "고급 가정집 분위기의 블라인드 - TestData",
						tags: ["아파트", "허니콤쉐이드"]
					},
					{
						rank: "테스트데이터",
						imgUrl: "/images/card_image_3.png",
						title: "부엌 인테리어 종결 블라인드 !! - TestData",
						tags: ["아파트"]
					},
					{
						rank: "테스트데이터",
						imgUrl: "/images/card_image_4.png",
						title: "카페분위기 제대로 내는 블라인드 - TestData",
						tags: ["상업공간", "우드블라인드"]
					}
				]} />
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