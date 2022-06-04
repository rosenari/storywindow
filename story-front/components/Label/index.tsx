import React from "react";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./index.module.css";

interface LabelProps {
    position: string;
    sub_position: string;
}

const Label: React.FC<LabelProps> = (props) => {
    return (
        <div className={styles.label}>
            <div className={styles.label_text}>
                <FaHome /> HOME <IoIosArrowForward /> {props.position} {props.sub_position && <IoIosArrowForward />} {props.sub_position}
            </div>
        </div>
    );
};

export default Label;