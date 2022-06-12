import { useState, useEffect } from 'react';

const getInnerWidth = (w: { innerWidth: number }) => {
    return w.innerWidth;
}
const getIsMobile = (width: number) => width <= 800;

function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const onResize = () => {
            setIsMobile(getIsMobile(getInnerWidth(window)));
        }

        window.addEventListener('resize', onResize);
        
        setIsMobile(getIsMobile(getInnerWidth(window)));

        return () => {
            window.removeEventListener('resize', onResize);
        }

    }, []);

    return isMobile;
}

export default useIsMobile;
