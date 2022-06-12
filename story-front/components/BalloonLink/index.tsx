import React from 'react';
import styles_mobile from './index_mobile.module.scss';

interface BalloonLinkProps {
    style: object;
    isAnimation: boolean;
    children: JSX.Element;
}

const BalloonLink: React.FC<BalloonLinkProps> = ({ style, isAnimation, children }) => {
    
    return (
        <div className={isAnimation ? styles_mobile.animation : ''} style={style}>
            {children}
        </div>
    )
}

export default BalloonLink;
