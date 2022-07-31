import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { CollectPopupSetData } from '@/store/action/reducerAction';
import { CollectPopup } from '@/components/index';
import styles from './index.module.scss';
import styled from 'styled-components';


const MenuButton = styled.button`
    background: url("/images/mobile-menu.svg") no-repeat;
    background-position: center center;
    border: none;
    width: 30px;
    height: 30px;
    cursor: pointer;
`;

const InquiryButton = styled.button`
    background: var(--color-main);
    border: none;
    border-radius: 3px;
    color: white;
    height: 30px;
    cursor: pointer;
    font-size: 1em;
    font-weight: 600;

    &:active {
        background: #0679f0;
    }
`;

interface NavbarProps {
    setOpen: (opened:boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setOpen }) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.navbar}>
            <div className={styles.left_box}><MenuButton onClick={() => setOpen(true)} /></div>
            <div className={styles.center_box}><Link href='/'><a>{"창세계"}</a></Link></div>
            <div className={styles.right_box}>
                <InquiryButton onClick={() => {
                    dispatch(new CollectPopupSetData({ visible: true}).toJSON());}}>{"문의"}
                </InquiryButton>
            </div>
            <CollectPopup />
        </div>
    )
}

export default Navbar;
