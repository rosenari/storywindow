import { useState, useEffect } from 'react'; 


function useSelector<T, R>(value: T, handler:(value: T) => R): R {
    const [state, setState] = useState(value);
    let result = handler(state);

    useEffect(() => {
        setState(value);
    }, [value]);

    return result;
}

export default useSelector;
