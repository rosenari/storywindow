import React from "react";
import styles from "./index.module.css";
import styled from "styled-components";
import Router from "next/router";

const Itemtagspan = styled.span`
    background:var(--color-main);
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
    background: linear-gradient(45deg, #FFB15E 0%, #F8FF3F 100%);
    padding:3px;
    padding-left:5px;
    padding-right:5px;
    border-radius:3px;
    font-family: 'SBAggroM', sans-serif;
    color: #444;
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

interface Props {
    rank: string;
    imgUrl: string;
    title: string;
    tags: Array<string>;
}

const Card: React.FC<Props> = ({ rank, imgUrl, title, tags }) => {

    return (
        <div className={styles.card_slider_item}>
            <Itemrank><Itemrankspan> {decodeURIComponent(tags[0])} </Itemrankspan></Itemrank>
            <div className={styles.card_slider_img} onClick={() => {
                Router.push('/product/list');
            }}><img src={`https://${process.env.API_HOST}/uploads/${imgUrl}`} height="230" /><SHINY /></div>
        </div>
    )
}

export default Card;