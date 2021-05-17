import React from "react";
import styles from "./index.module.css";
import Router from "next/router";

const IMG_WIDTH = "540";
const IMG_HEIGHT = "110";
const SNS_WIDTH = "60";
const SNS_HEIGHT = "60";

const Shortcut: React.FC = () => {

    return (
        <div className={styles.bottomlink}>
            <div className={styles.bottomlink_container}>
                <div className={styles.bottomlink_item} style={{ cursor: "pointer" }} onClick={() => {
                    Router.push('/product/list');
                }}>
                    <img src="/images/bottom_apply.png" width={IMG_WIDTH} height={IMG_HEIGHT} />
                </div>
                <div className={styles.bottomlink_item}>
                    <div className={styles.bottomlink_item_left}>
                        스토리창 SNS
                        </div>
                    <div className={styles.bottomlink_item_right}>
                        <img src="/images/bottom_link1.png" width={SNS_WIDTH} height={SNS_HEIGHT} style={{ cursor: "pointer" }} onClick={() => {
                            location.href = "https://www.instagram.com/hanbitwindow/";
                        }} />
                        <img src="/images/bottom_link2.png" width={SNS_WIDTH} height={SNS_HEIGHT} style={{ cursor: "pointer" }} onClick={() => {
                            location.href = "https://blog.naver.com/limwj2464";
                        }} />
                        <img src="/images/bottom_link3.png" width={SNS_WIDTH} height={SNS_HEIGHT} style={{ cursor: "pointer" }} onClick={() => {
                            location.href = "https://www.pinterest.co.kr/limwj826";
                        }} />
                        <img src="/images/bottom_link4.png" width={SNS_WIDTH} height={SNS_HEIGHT} style={{ cursor: "pointer" }} onClick={() => {
                            location.href = "https://limwj2464.tistory.com/";
                        }} />
                    </div>
                </div>
            </div>
            <div className={styles.bottomlink_container}>
                <div className={styles.bottomlink_item} style={{ cursor: "pointer" }} onClick={() => {
                    location.href = "https://smartstore.naver.com/cssewing";
                }}>
                    <img src="/images/sewing_link.png" width={IMG_WIDTH} height={IMG_HEIGHT} />
                </div>
                <div className={styles.bottomlink_item}>
                    <div className={styles.bottomlink_item_left}>
                        메뉴 바로가기
                        </div>
                    <div className={styles.bottomlink_item_right}>
                        <button className={styles.bottom_notice} onClick={() => {
                            Router.push('/product/list');
                        }}>제품소개</button>&nbsp;<button className={styles.bottom_qna} onClick={() => {
                            Router.push('/construct/list');
                        }}>시공모음</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shortcut;