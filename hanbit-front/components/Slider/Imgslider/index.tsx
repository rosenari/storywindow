import React from 'react';
import { Carousel } from 'react-bootstrap';
import styles from "./index.module.css";

class Imgslider extends React.Component {
    render() {
        return (
            <div className={styles.image_slider}>
                <Carousel prevIcon="" nextIcon="" interval={5000}>
                    <Carousel.Item className={styles.slider_item}>
                        <img src="/images/bin.png" />
                    </Carousel.Item>
                    <Carousel.Item className={styles.slider_item2}>
                        <img src="/images/bin.png" />
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}

export default Imgslider;