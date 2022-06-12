import React, { useState, useCallback, useEffect } from "react";
import { useIsMobile, useCssSelector } from '@/hooks/index';
// @ts-ignore
import ItemsCarousel from 'react-items-carousel';
import styles from './index.module.scss';
import styles_mobile from './index_mobile.module.scss';
import Card, { CardProps } from "./Card";

interface DelayProps {
    startDelay: number;
    delay: number;
}

interface CardData extends CardProps{
    id: number;
}

interface CardsliderProps extends DelayProps {
    data?: Array<CardData>;
}

interface CardsliderState extends DelayProps {
    count: number;
}

const Cardslider: React.FC<CardsliderProps> = ({ data, startDelay, delay }) => {
    const [state, setState] = useState<CardsliderState>({ count: 0, startDelay: startDelay, delay });
    const css = useCssSelector({ pc: styles, mobile: styles_mobile });
    const is_mobile = useIsMobile();
    const chevronWidth = 40;
    const countUp = useCallback(() => {
        setState({ ...state, count: state.count + 1 });
    }, [state]);
    if(is_mobile && data && data.length >= 5) data = data.slice(1, 5);


    useEffect(() => {
        const timerId = window.setTimeout(() => { countUp() }, delay);

        return () => {
            clearTimeout(timerId);
        }
    }, [state]);


    return (
        <>
            <div className={css.card_slider + ' ' + css.active}>
                <ItemsCarousel
                    infiniteLoop
                    requestToChangeActive={countUp}
                    activeItemIndex={state.count}
                    numberOfCards={is_mobile? 1 : 3}
                    gutter={20}
                    outsideChevron
                    chevronWidth={chevronWidth}
                >
                    {
                        data?.map((v: CardData) => {
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

export default Cardslider;
