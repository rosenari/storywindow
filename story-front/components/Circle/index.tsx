import styled from "styled-components";
import styles from "./index.module.scss";

interface CircleProps {
    top: number;
    right: number;
}

const Circle = styled.span<CircleProps>`
    display:inline-block;
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: red;
    animation: ${styles.circle_animation} 2s infinite;
    z-index:50;
`;

export default Circle;
