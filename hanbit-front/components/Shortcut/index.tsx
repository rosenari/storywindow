import React from "react";
import styles from "./index.module.css";

const IMG_WIDTH = "540";
const IMG_HEIGHT = "110";
const SNS_WIDTH = "60";
const SNS_HEIGHT = "60";

const Shortcut: React.FC = () => {

    return (
        <div className={styles.bottomlink}>
            <div className={styles.bottomlink_container}>
                <div className={styles.bottomlink_item}>
                    <img src="/images/bottom_apply.png" width={IMG_WIDTH} height={IMG_HEIGHT} />
                </div>
                <div className={styles.bottomlink_item}>
                    <div className={styles.bottomlink_item_left}>
                        한빛창 SNS
                        </div>
                    <div className={styles.bottomlink_item_right}>
                        <img src="/images/bottom_link1.png" width={SNS_WIDTH} height={SNS_HEIGHT} /><img src="/images/bottom_link2.png" width={SNS_WIDTH} height={SNS_HEIGHT} />
                        <img src="/images/bottom_link3.png" width={SNS_WIDTH} height={SNS_HEIGHT} /><img src="/images/bottom_link4.png" width={SNS_WIDTH} height={SNS_HEIGHT} />
                    </div>
                </div>
            </div>
            <div className={styles.bottomlink_container}>
                <div className={styles.bottomlink_item}>
                    <img src="/images/sewing_link.png" width={IMG_WIDTH} height={IMG_HEIGHT} />
                </div>
                <div className={styles.bottomlink_item}>
                    <div className={styles.bottomlink_item_left}>
                        고객센터
                        </div>
                    <div className={styles.bottomlink_item_right}>
                        <button className={styles.bottom_notice}>공지사항</button>&nbsp;<button className={styles.bottom_qna}>문의게시판</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shortcut;