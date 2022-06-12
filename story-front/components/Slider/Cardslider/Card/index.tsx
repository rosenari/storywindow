import React from "react";
import { useCssSelector } from '@/hooks/index';
import styles from "./index.module.css";
import styles_mobile from './index_mobile.module.css';
import styled from "styled-components";
import Router from "next/router";

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
    background: linear-gradient(45deg, #007bc7 0%, #36bfe8 100%);
    padding:3px;
    padding-left:5px;
    padding-right:5px;
    border-radius:3px;
    font-family: 'SBAggroM', sans-serif;
    color: white;
`;

const SHINY = styled.div`
    position:absolute;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
    animation: ${styles.sparkle} 4s ease-in-out infinite;
`;

export interface CardProps {
    imgurl: string;
    tags: Array<string>;
}

const Card: React.FC<CardProps> = ({ imgurl, tags }) => {
    const css = useCssSelector({ pc: styles, mobile: styles_mobile });

    return (
        <div className={css.card_slider_item}>
            <Itemrank><Itemrankspan> {decodeURIComponent(tags[0])} </Itemrankspan></Itemrank>
            <div className={css.card_slider_img} onClick={() => {
                Router.push('/product/list');
            }}><img src={`https://${process.env.IMG_HOST}/uploads/${imgurl}`}  /><SHINY /></div>
        </div>
    )
}

export default Card;
