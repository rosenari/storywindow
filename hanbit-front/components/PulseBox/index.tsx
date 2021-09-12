import React from "react";
import styled from "styled-components";
import styles from "./index.module.scss";

interface PulseBoxProps {
    text: string;
    top: number;
    left: number;
}

interface CircleProps {
    top: number;
    right: number;
}

const CIRCLE = styled.div<CircleProps>`
    position: absolute;
    top: ${props => props.top}px;
    right: ${props => props.right}px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: red;
    animation: ${styles.circle_animation} 2s infinite;
    z-index:30;
`;

const PulseBox: React.FC<PulseBoxProps> = ({ text, top, left }) => {
    return (
        <div className={styles.main} style={{ top, left }}>
            {text}
            <CIRCLE top={3} right={5} />
        </div>
    );
};

export default PulseBox;