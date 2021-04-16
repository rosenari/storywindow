import React from "react";
import styles from "./index.module.css";

interface TopProps {
    AllMenu_up: () => void;
};

const Top: React.FC<TopProps> = (props) => {
    return (
        <div className={styles.top} onMouseOver={props.AllMenu_up}>
            <div className={styles.inner_top}>
                <div className={styles.inner_top_left}>
                    <span className={styles.inner_top_text}>&nbsp;&nbsp;<strong>노아의창</strong>은 방문견적이 <strong style={{ color: "#4ac6f5" }}>무료!</strong>&nbsp;&nbsp;</span>
                </div>
                <div className={styles.inner_top_right}>
                    <span className={styles.top_menu}>{/*<Link href="/login"><a>로그인</a></Link>*/}</span>
                    <span className={styles.top_menu}>{/*<Link href="/register"><a>회원가입</a></Link>*/}</span>
                </div>
            </div>
        </div>
    )
}

export default Top;