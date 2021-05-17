import styled from 'styled-components';
import Link from 'next/link';

const Div = styled.div`
    position:relative;
    float:left;
    width:270px;
    height:275px;
    
    & + Div{
        margin-left:11px;
    }
`;

const Imgbox = styled.div`
    position:relative;
    width:270px;
    height:180px;
    border-radius:5px;
    background:#aaa;
    overflow:hidden;
    cursor:pointer;
    
    & img{
        -webkit-transition: all 0.2s ease-in-out;
        -o-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
        -moz-transform: scale(1.0);
        -ms-transform: scale(1.0);
        -o-transform: scale(1.0);
    }
    
    & img:hover{
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        -ms-transform: scale(1.2);
        -o-transform: scale(1.2);
    }
`;

const Titlebox = styled.div`
    margin-top:5px;
    position:relative;
    width:270px;
    height:20px;
    line-height:20px;
    font-size:0.8em;
    font-weight:bold;
    overflow:hidden;
`;

const Tagbox = styled.div`
    position:relative;
    width:270px;
    height:20px;
    line-height:20px;
`;

const Likebox = styled.div`
    position:relative;
    width:270px;
    height:20px;
    line-height:20px;
    font-size:0.7em;
`;

const Span = styled.span`
    margin-top:0px;
    background:orange;
    padding:2px;
    border-radius:3px;
    margin-right:5px;
    color:white;
    font-size:0.7em;
    font-weight:bold;
`;

const Descriptbox = styled.div`
    position:relative;
    width:270px;
    height:70px;
`;

const Descriptbox_left = styled.div`
    position:relative;
    width:270px;
    height:70px;
`;

interface ContentProps {
    idx: number;
    tags: Array<string>;
    title: string;
    views: number;
    like: number;
    imgurl: string;
    date?: string;
    space?: string;
}

const Content: React.FC<ContentProps> = (props) => {
    return (
        <Div>
            <Imgbox>
                <Link href={{ pathname: '/construct/detail', query: { id: props.idx } }}>
                    <a>
                        <img src={`http://${process.env.API_HOST}/uploads/${props.imgurl}`} width="270" />
                    </a>
                </Link>
            </Imgbox>
            <Descriptbox>
                <Descriptbox_left>
                    <Titlebox>
                        {
                            decodeURIComponent(props.title)
                        }
                    </Titlebox>
                    <Tagbox>
                        {
                            props.tags && props.tags.map((v, i) => {
                                return (
                                    <Span key={i}>{decodeURIComponent(v)}</Span>
                                );
                            })
                        }
                    </Tagbox>
                    <Likebox><strong>{props.date}</strong> 등록됨</Likebox>
                </Descriptbox_left>
            </Descriptbox>
        </Div>
    );
}

export default Content;