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
                                    <Card key={v.id} rank={(i + 1) + "위"} imgUrl={v.imgurl} title={v.title} tags={v.tags} />
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