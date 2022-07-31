import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import React from 'react';
import Link from 'next/link';
import { ImagePopupSetData } from '@/store/action/reducerAction';

const Div = styled.div`
    position:relative;
    float:left;
    width:270px;
    height:170px;
    
    & + Div{
        margin-left:11px;
    }
`;

const Image = css`
    & img{
        transition: all 0.2s ease-in-out;
        transform: scale(1.0);
    }
`;

const ImageHover = css`
    & img:hover{
        transform: scale(1.2);
    }
`;

const Imgbox = styled.div`
    position:relative;
    width:270px;
    height:150px;
    border-radius:5px;
    background:#aaa;
    overflow:hidden;
    ${Image}
    ${ImageHover}
`;

const Tagbox = styled.div`
    position:absolute;
    bottom:5px;
    right:5px;
    height:25px;
    z-index: 50;
`;

const Span = styled.span`
    margin-top:0px;
    background:#eee;
    padding:3px;
    border-radius:3px;
    margin-right:5px;
    color:#444;
    font-size:0.8em;
    font-weight:bold;
`;

interface ContentProps {
    idx: number;
    mainImgurl: string;
    imgurl: string;
    tags: Array<string>;
    colors: Array<string>;
    views: number;
    like: number;
    date?: string;
}

const Content: React.FC<ContentProps> = (props) => {
    const dispatch = useDispatch();

    return (
        <Div>
            <Imgbox>
                <Link href='/'>
                    <a onClick={(e) => {
                        e.preventDefault();
                        dispatch(new ImagePopupSetData({ visible: true, img_url: `http://${process.env.IMG_HOST}/uploads/${props.mainImgurl}` }).toJSON());
                    }}>
                        <img src={`https://${process.env.IMG_HOST}/uploads/` + props.imgurl} width='338' />
                    </a>
                </Link>
                <Tagbox>
                {
                    props.tags && props.tags.map(tag => {
                        return (
                            <Span key={tag}>{decodeURIComponent(tag)}</Span>
                        );
                    })
                }
                </Tagbox>
            </Imgbox>
        </Div>
    );
}

export default Content;
