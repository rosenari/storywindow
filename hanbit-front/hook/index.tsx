import { useState, useCallback } from 'react';

export const useVisible =  (init = false) => {
    const [visible, setVisible] = useState(init);

    const handler = useCallback((visible) => {
        setVisible(visible);
    }, []);

    return [visible, handler];
}

export const useImageUrl = (init = '') => {
    const [imageUrl, setImageUrl] = useState(init);

    const handler = useCallback((url) => {
        setImageUrl(url);
    }, []);

    return [imageUrl, setImageUrl];
}