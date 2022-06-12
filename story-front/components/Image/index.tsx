import React from "react";

interface ImageProps {
    url: string;
    width?: string;
    height?: string;
}

const renderImage = ({ url, width, height } : Omit<ImageProps,'isShadow'>) => {
    return <img src={url} style={{ width, height }} />
}

const Image: React.FC<ImageProps> = ({ url = '', width = '100px', height = '100px' }) => {
    return (
        <div style={{ width, height }}>
            {renderImage({ url, width, height })}
        </div>
    );
}

export default Image;
