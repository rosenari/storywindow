import { useState, useEffect } from 'react';

const getInnerWidth = (w: { innerWidth: number }) => {
    return w.innerWidth;
}
const getIsMobile = (width: number) => width <= 800;

function useIsMobile(): boolean {
    if (typeof window !== 'undefined') {
        const [isMobile, setIsMobile] = useState(getIsMobile(getInnerWidth(window)));
        
        useEffect(() => {
            const onResize = () => {
                setIsMobile(getIsMobile(getInnerWidth(window)));
            }

            window.addEventListener('resize', onResize);

            return () => {
                window.removeEventListener('resize', onResize);
            }

        }, []);

        return isMobile;
    }else return false;
}

export default useIsMobile;
