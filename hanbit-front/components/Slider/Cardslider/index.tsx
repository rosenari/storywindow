import React from "react";
// @ts-ignore
import ItemsCarousel from 'react-items-carousel';
import { FiMoreHorizontal } from 'react-icons/fi';
import styled from 'styled-components';
import styles from './index.module.css';

const Itemtagspan = styled.span`
    background:#4ac6f5;
    padding:3px;
    border-radius:3px;
    margin-right:5px;
    color:white;
    font-size:0.9em;
    font-weight:bold;
`;
const Itemrank = styled.div`
    position:absolute;
    top:5px;
    left:5px;
    font-size:0.8em;
    height:30px;
    color:white;
    z-index:999;
`;
const Itemrankspan = styled.div`
    background:#4ac6f5;
    padding:3px;
    padding-left:5px;
    padding-right:5px;
    border-radius:3px;
    color:white;
`;

interface CardsliderProps {

}

interface CardsliderState {
    count: number;
    active1: boolean;
    active2: boolean;
}

class Cardslider extends React.Component<CardsliderProps, CardsliderState> {
    timerID: any;

    constructor(props: CardsliderProps) {
        super(props);
        this.state = {
            count: 0,
            active1: false,
            active2: false
        };
    }

    componentDidMount() {
        if (!this.state.active1) {
            this.setActive();
        }
        this.timerID = setInterval(() => this.tick(), 4000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.Countup();

    }

    Countup = () => {
        this.setState({ count: this.state.count + 1 });
    }

    setActive = () => {
        setTimeout(() => {
            this.setState({ active1: true });
        }, 400);
        setTimeout(() => {
            this.setState({ active2: true });
        }, 800);
    }

    render() {
        const chevronWidth = 40;

        return (
            <>
                <div className={styles.card_descript + ' ' + (this.state.active1 === true ? styles.active : '')}>
                    <div className={styles.card_descript_title}>
                        <div className={styles.card_descript_title_image}></div>
                        <div className={styles.card_descript_title_center}>
                            &nbsp;<span style={{ color: "#4ac6f5" }}><strong>베스트</strong></span>
                        &nbsp;블라인드시공&nbsp;
                    </div>
                        <div className={styles.card_descript_title_right}><FiMoreHorizontal /></div>
                    </div>
                    <div className={styles.card_descript_picture}>
                        {(() => {
                            switch (this.state.count % 4) {
                                case 0:
                                    return <img src="/images/card_image_4_mini.png" width="272" height="181" />;
                                case 1:
                                    return <img src="/images/card_image_1_mini.png" width="272" height="181" />;
                                case 2:
                                    return <img src="/images/card_image_2_mini.png" width="272" height="181" />;
                                case 3:
                                    return <img src="/images/card_image_3_mini.png" width="272" height="181" />;
                                default:
                                    return null;
                            }
                        })()}
                    </div>
                    <div className={styles.card_descript_like}>
                        <div className={styles.card_descript_like_item}>
                            <img src="/images/instagram_heart.png" width="24" height="24" />
                        </div>
                        <div className={styles.card_descript_like_item}>
                            &nbsp;<img src="/images/instagram_bubble.png" width="24" height="24" />
                        </div>
                        <div className={styles.card_descript_like_item}>
                            &nbsp;<img src="/images/instagram_paper.png" width="24" height="24" />
                        </div>
                        <div className={styles.card_descript_like_item}>
                            &nbsp;<img src="/images/instagram_flag.png" width="24" height="24" />
                        </div>
                    </div>
                    <div className={styles.card_descript_hashtag_1}>
                        좋아요 999개
                </div>
                    <div className={styles.card_descript_hashtag_2}>
                        <strong>한빛창</strong>&nbsp;<span style={{ color: "#466184" }}>#한빛창 #블라인드 #커튼</span>
                    </div>
                </div>
                <div className={styles.card_slider + ' ' + (this.state.active2 === true ? styles.active : '')}>
                    <ItemsCarousel
                        infiniteLoop
                        requestToChangeActive={this.Countup}
                        activeItemIndex={this.state.count}
                        numberOfCards={2}
                        gutter={20}
                        leftChevron={<strong>{'<'}</strong>}
                        outsideChevron
                        chevronWidth={chevronWidth}
                    >
                        <div className={styles.card_slider_item}>
                            <Itemrank><Itemrankspan> 테스트데이터 </Itemrankspan></Itemrank>
                            <div className={styles.card_slider_img}><img src="/images/card_image_1.png" width="375" height="230" /></div>
                            <div className={styles.card_slider_item_description}>
                                <div className={styles.card_slider_item_description_title}><strong>깔끔한 분위기의 식당으로 변신 ! - TestData</strong></div>
                                <div className={styles.card_slider_item_description_content}>
                                    <Itemtagspan>상업공간</Itemtagspan><Itemtagspan>콤비블라인드</Itemtagspan>
                                </div>
                            </div>
                        </div>
                        <div className={styles.card_slider_item}>
                            <Itemrank><Itemrankspan> 테스트데이터 </Itemrankspan></Itemrank>
                            <div className={styles.card_slider_img}><img src="/images/card_image_2.png" width="375" height="230" /></div>
                            <div className={styles.card_slider_item_description}>
                                <div className={styles.card_slider_item_description_title}><strong>거실창에 고급스러움을 더해봤어요 - TestData</strong></div>
                                <div className={styles.card_slider_item_description_content}><Itemtagspan>주거공간</Itemtagspan><Itemtagspan>허니콤쉐이드</Itemtagspan></div>
                            </div>
                        </div>
                        <div className={styles.card_slider_item}>
                            <Itemrank><Itemrankspan> 테스트데이터 </Itemrankspan></Itemrank>
                            <div className={styles.card_slider_img}><img src="/images/card_image_3.png" width="375" height="230" /></div>
                            <div className={styles.card_slider_item_description}>
                                <div className={styles.card_slider_item_description_title}><strong>주방인터레어와 버티컬의 조화~ - TestData</strong></div>
                                <div className={styles.card_slider_item_description_content}><Itemtagspan>주거공간</Itemtagspan><Itemtagspan>버티컬</Itemtagspan></div>
                            </div>
                        </div>
                        <div className={styles.card_slider_item}>
                            <Itemrank><Itemrankspan> 테스트데이터 </Itemrankspan></Itemrank>
                            <div className={styles.card_slider_img}><img src="/images/card_image_4.png" width="375" height="230" /></div>
                            <div className={styles.card_slider_item_description}>
                                <div className={styles.card_slider_item_description_title}><strong>블라인드 하나로 분위기있는 카페연출 - TestData</strong></div>
                                <div className={styles.card_slider_item_description_content}><Itemtagspan>상업공간</Itemtagspan><Itemtagspan>우드블라인드</Itemtagspan></div>
                            </div>
                        </div>
                    </ItemsCarousel>
                </div>
            </>
        )
    }
}

export default Cardslider;