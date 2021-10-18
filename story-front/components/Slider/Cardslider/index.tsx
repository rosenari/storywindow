import React from "react";
// @ts-ignore
import ItemsCarousel from 'react-items-carousel';
import styles from './index.module.css';
import Card, { CardProps } from "./Card";

interface DelayProps {
    startDelay: number;
    delay: number;
}

interface CardData extends CardProps{
    id: number;
}

interface CardsliderProps extends DelayProps {
    data: Array<CardData>;
}

interface CardsliderState extends DelayProps {
    count: number;
}

class Cardslider extends React.Component<CardsliderProps, CardsliderState> {
    timerID: number;

    constructor(props: CardsliderProps) {
        super(props);
        this.state = {
            count: 0,
            startDelay: props.startDelay,
            delay: props.delay
        };
    }

    componentDidMount() {        
        setTimeout(() => {
            this.timerID = window.setInterval(() => this.tick(), this.state.delay);
        }, this.state.startDelay);
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

    render() {
        const chevronWidth = 40;

        return (
            <>
                <div className={styles.card_slider + ' ' + styles.active}>
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
                            this.props.data.map((v: CardData) => {
                                return (
                                    <Card key={v.id} imgurl={v.imgurl} tags={v.tags} />
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