import React from 'react';
import { Cardslider, Image, Circle, NoticePopup, BalloonLink } from '../components';
import Router from 'next/router';
import { NextPage } from 'next';
import { Context } from 'vm';
import styled from 'styled-components';
import styles from './css/index.module.scss';
import styles_mobile from './css/index_mobile.module.scss';
import { RequestProductListAction } from '../store/action/sagaAction';
import { waitAndGetState, classFor } from '../util';
import { ProductListData } from '../store/action/reducerAction';
import { useIsMobile, useCssSelector } from '@/hooks/index';

const IMG_URL = {
    FACTORY_PICTURE: `http://${process.env.IMG_HOST}/images/factory_inner_big.png`,
    INTERIOR_VECTOR: `http://${process.env.IMG_HOST}/images/interior_vector.png`,
    BLIND_VECTOR: `http://${process.env.IMG_HOST}/images/blind_vector.png`
 }

const SMALL_TAGS = ['DC모터', 'AC모터'].map((tag, i) => ({ id: i + 1, tag }));
const TAGS = ['#전국블라인드도매', '#공장제작', '#전국최저가', '#소량주문환영'].map((tag, i) => ({ id: i + 1, tag}));

const INTERIOR_DESCRIPTION = [
	'ㆍ인테리어 완성을 위한 고품질의 블라인드를 전국 최저가에 제공해드립니다.',
	'ㆍ공장에서 정확한 치수로 맞춤제작하여, 인테리어의 완성도를 높여드립니다.'
].map((desc, i) => ({ id: i + 1, desc}));

const BLIND_DESCRIPTION = [
	'ㆍ소규모 블라인드,커튼, 인테리어 업체도 적극 지원해드립니다.',
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
	{
		top: 700,
		left: -700,
		width: 500,
		height: 500,
		duration: 2.2,
		delay: 2.2
	},
	{
		top: 1200,
		left: 700,
		width: 350,
		height: 350,
		duration: 3.2,
		delay: 1.2
	},
	{
		top: 1300,
		left: -900,
		width: 200,
		height: 200,
		duration: 2.2,
		delay: 3.2
	}
].map((round, index) => ({...round, id: index}));


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
        background-image:url('http://${process.env.IMG_HOST}/images/round01.png');
		background-size: ${props => props.width}px ${props => props.height}px;
		animation:${styles.zoom_animation} ${props => props.duration}s ${props => props.delay}s ease-in-out infinite;
		z-index: -10;
`;

interface HomeProps {
	productListData: ProductListData
}

const Home: NextPage<HomeProps> = ({ productListData }) => {
    const is_mobile = useIsMobile();
    const css = useCssSelector({ pc: styles, mobile: styles_mobile });

	return (
		<div>
			<div className={css.advertise_main}>
				<div className={css.advertise_box}>
                    {/*!is_mobile && <PulseBox text={'DC모터'} top={9} left={110}  />*/}
                    {/*!is_mobile && <PulseBox text={'AC모터'} top={9} left={183}  />*/}
                    <img src={`http://${process.env.IMG_HOST}/images/leftmenu_img1.png`} className={css.advertise_img} />
					<div className={css.advertise_title}><span className={css.advertise_title_text}>전동 커튼, 블라인드 특판 !</span></div>
                    <div>{!is_mobile && SMALL_TAGS.map(({ id, tag }) => <span key={id} className={css.tag_small}>{tag}&nbsp;<Circle top={5} right={5} /></span>)}</div>
				</div>
			</div>
			<div className={css.recruit_main}>
				<div className={classFor([css.recruit_title, css.recruit_desc])}>
					<span className={css.main}>전국 최저가</span> 블라인드 납품
				</div>
				<div className={classFor([css.tag_main, css.recruit_desc])}>
					{TAGS.map(({ id, tag }) => <span key={id} className={css.tag}>{tag}</span>)}
				</div>
				<div className={classFor([css.recruit_description, css.recruit_desc, css.first])}>
					ㆍ <span className={css.main}>공장</span>에서 블라인드를 직접 제작하여, <span className={css.main}>전국 최저가</span>로 납품해드립니다.
				</div>
				<div className={classFor([css.recruit_description, css.recruit_desc])}>
					ㆍ <span className={css.main}>신생</span> 또는 <span className={css.main}>소량 발주하는 업체</span>도 감사한 마음으로 친절하게 모십니다.
				</div>
				<div className={classFor([css.recruit_description, css.recruit_desc, css.last])}>
					ㆍ <span className={css.main}>건설업체, 관공서, 공공기관</span> 대량 납품 가능합니다.
				</div>
				<div className={css.logo_box}>
						<Image url={IMG_URL.FACTORY_PICTURE} width={is_mobile ? '100%' : '1140px'} height={is_mobile? '100%' : '641px'} />
				</div>
			</div>
			<div className={css.card_main}>
				<div className={css.card_slider_subheader}>
					현재 다수의 업체가 창세계와 함께하고 있습니다.
				</div>
				<div className={css.card_slider_header}>
					<strong> 창세계 
						<span style={{ color: "var(--color-main)" }}> 납품업체 시공사례</span>
					</strong>
                    <span className={css.card_slider_header_more} onClick={() => {
                        if(is_mobile) {
                            alert('준비중인 메뉴입니다. (해당 메뉴는 pc버전에서 이용 가능합니다.)');
                            return;
                        }
						Router.push('/product/list');
					}}>더보기</span>
				</div>
				<Cardslider data={productListData.result} startDelay={0} delay={3000} />
			</div>
			<div className={css.industry_main}>
				<div className={css.industry_header}>
					<strong> 
						<span style={{ color: "var(--color-main)" }}>납품업체</span> 주요 업종
					</strong>
				</div>
				<div className={css.industry_body}>
					<div className={[css.box, css.interior].join(' ')}>
						<div className={css.header}>
							<span className={css.text}>인테리어</span>
						</div>
						<div className={css.body}>
							<div className={css.description_box}>
								{INTERIOR_DESCRIPTION.map(({ id, desc }) => <div key={id} className={css.description}>{desc}</div>)}
							</div>
							<div className={css.img_box}>
								<img src={IMG_URL.INTERIOR_VECTOR} width={200} />
							</div>
						</div>
					</div>
					<div className={[css.box, css.blind].join(' ')}>
						<div className={css.header}>
							<span className={css.text}>블라인드</span>
						</div>
						<div className={css.body}>
							<div className={css.description_box}>
								{BLIND_DESCRIPTION.map(v => <div key={v.id} className={css.description}>{v.desc}</div>)}
							</div>
							<div className={css.img_box}>
								<img src={IMG_URL.BLIND_VECTOR} />
							</div>
						</div>
					</div>
				</div>
            </div>
            {is_mobile && <BalloonLink style={{ position:'fixed', width: 'auto', height: 'auto', bottom: '3%', right: '3%', zIndex: 99, cursor: 'pointer' }} isAnimation={true}>
                <div style={{ display: 'flex', flexDirection: 'column' }} onClick={() => {
                    if(confirm('전화 문의로 이동하시겠습니까')){
                        Router.push('tel:010-4414-2464');
                    }
                }}>
                <img src={`http://${process.env.IMG_HOST}/images/call_img.png`} style={{ width: '50px', height: '50px' }} /><span style={{ fontSize: '0.8em', background: 'green', color: 'white', borderRadius:'5px', padding: '3px' }}>{'전화걸기'}</span>
                </div>
            </BalloonLink>}
			{!is_mobile && rounds.map(({ top, left, width, height, duration, delay, id}) => 
				<ROUND key={id} top={top} left={left} width={width} height={height} duration={duration} delay={delay} />)}
			<NoticePopup />
		</div>
	);
}

Home.getInitialProps = async (ctx: Context) => {

	ctx.store.dispatch(new RequestProductListAction().toJSON());
	const state = await waitAndGetState(ctx.store) as { reducer: { productListData: ProductListData }};

	return {
		productListData: state.reducer.productListData
	}

}

export default Home;
