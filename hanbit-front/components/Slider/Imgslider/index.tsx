import React from 'react';
import { Carousel } from 'react-bootstrap';
import styles from "./index.module.css";

interface ImgsldierProps {
    Img: Array<string>;
}

const Imgslider: React.FC<ImgsldierProps> = (props) => {
    return (
        <div className={styles.image_slider}>
            <Carousel prevIcon="" nextIcon="" interval={5000}>
                {
                    props.Img.map((v, i) => {
                        return (
                            <Carousel.Item key={"item" + i} className={styles.slider_item}
                                style={{
                                    background: `url(${v})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }}>
                                <img src="/images/bin.png" />
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </div>
    );
}

export default Imgslider;