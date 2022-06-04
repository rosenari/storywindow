import { generateGetCssFunction } from '@/util/index';
import useIsMobile from './useIsMobile';
import useSelector from './useSelector';

function useCssSelector({ pc, mobile }: { pc: Styles, mobile: Styles }) {
    const isMobile = useIsMobile();
    const getCss = generateGetCssFunction(pc, mobile);
    const css = useSelector<boolean, Styles>(isMobile, getCss);
    
    return css;
}

export default useCssSelector;
