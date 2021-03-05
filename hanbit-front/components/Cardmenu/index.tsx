import React from 'react';
import styles from "./index.module.css";
import FadeIn from 'react-fade-in';

interface Data {
    img: string;
    text: string;
}

interface CardmenuProps {
    data: Array<Data>;

}

const Cardmenu: React.FC<CardmenuProps> = (props) => {
    const img_width = "213";
    const img_height = "280";

    return (
        <div className={styles.space_container}>
            <span className={styles.space_header}>집안 분위기를 바꿔 줄 <strong>공간별 스타일</strong> 모아보기</span>
            <div className={styles.space_main}>
                <FadeIn delay={300}>
                    {
                        props.data.map((v, i) => {
                            return (
                                <div className={styles.space_item} key={"space_" + i} style={{ paddingRight: (i === props.data.length - 1) ? "0px" : "70px" }}>
                                    <img className={styles.space_img}
                                        src={v.img}
                                        width={img_width}
                                        height={img_height}
                                    />
                                    <div className={styles.space_text}>
                                        <p>{v.text}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </FadeIn>
            </div>
        </div>
    )
}

export default Cardmenu;