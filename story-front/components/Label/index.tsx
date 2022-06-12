import React from "react";
import { useCssSelector } from '@/hooks/index';
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./index.module.scss";
import styles_mobile from "./index_mobile.module.scss";

interface LabelProps {
    position: string;
    sub_position: string;
}

const Label: React.FC<LabelProps> = (props) => {
    const css = useCssSelector({ pc: styles, mobile: styles_mobile });

    return (
        <div className={css.label}>
            <div className={css.label_text}>
                <FaHome /> HOME <IoIosArrowForward /> {props.position} {props.sub_position && <IoIosArrowForward />} {props.sub_position}
            </div>
        </div>
    );
};

export default Label;
