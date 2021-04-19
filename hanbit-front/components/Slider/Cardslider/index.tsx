import React from "react";
// @ts-ignore
import ItemsCarousel from 'react-items-carousel';
import { FiMoreHorizontal } from 'react-icons/fi';
import styled from 'styled-components';
import styles from './index.module.css';
import Card from "./Card";

interface CardsliderProps {
    data: any;
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
                {/*<div className={styles.card_descript + ' ' + (this.state.active1 === true ? styles.active : '')}>
                    <div className={styles.card_descript_title}>
                        <div className={styles.card_descript_title_image}></div>
                        <div className={styles.card_descript_title_center}>
                            &nbsp;<span style={{ color: "#f6ad26" }}><strong>베스트</strong></span>
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
                    </div>*/}
                <div className={styles.card_slider + ' ' + (this.state.active2 === true ? styles.active : '')}>
                    <ItemsCarousel
                        infiniteLoop
                        requestToChangeActive={this.Countup}
                        activeItemIndex={this.state.count}
                        numberOfCards={3}
                        gutter={20}
                        outsideChevron
                        chevronWidth={chevronWidth}
                    >
                        {
                            this.props.data.map((v: any, i: any) => {
                                return (
                                    <Card key={"card_" + i} rank={v.rank} imgUrl={v.imgUrl} title={v.title} tags={v.tags} />
                                );
                            })
                        }
                    </ItemsCarousel>
                </div>
            </>
        )
    }
}

export default Cardslider;