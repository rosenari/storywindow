import React from "react";
import styles from "./index.module.css";

interface ImageProps {
    url: string;
    width?: number;
    height?: number;
    isAnimation?: boolean;
    isShadow?: boolean;
}

const padding = 10;
const ratio = 0.05;

const renderImage = ({ url, width, height, isAnimation } : Omit<ImageProps,'isShadow'>) => {
    const imageWidth = width && width > padding  ? width - padding : width;
    const imageHeight = height && height > padding ? height - padding : height;
    const animation = isAnimation ? styles.image_ani : '';
    return <img src={url} className={animation} style={{ width: imageWidth, height: imageHeight }} />
}

const renderShadow = ({ width, height, isAnimation }: Omit<ImageProps,'isShadow' | 'url'>) => {
    const shadowWidth = width && width > padding  ? width - padding : width;
    const shadowHeight = height &&  Math.round(height * ratio);
    const animation = isAnimation ? styles.shadow_ani : '';
    return <div className={animation} style={{ width: shadowWidth, height: shadowHeight, background: '#ddd', borderRadius: '50%' }}></div>
}

const Image: React.FC<ImageProps> = ({ url = '', width = 100, height = 100, isAnimation = true, isShadow = true }) => {
    return (
        <div style={{ width, height }}>
            {renderImage({ url, width, height, isAnimation })}
            {isShadow && renderShadow({ width, height, isAnimation })}
        </div>
    );
}

export default Image;