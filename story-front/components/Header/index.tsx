import HeaderPc from './Pc';
import HeaderMobile from './Mobile';
import { useIsMobile } from '@/hooks/index';

export function Header() {
    const isMobile = useIsMobile();

    return <>{isMobile ? <HeaderMobile /> : <HeaderPc />}</>
}
