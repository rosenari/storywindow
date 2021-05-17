import styled from 'styled-components';
import Link from 'next/link';

const Div = styled.div`
    position:relative;
    float:left;
    width:270px;
    height:270px;
    
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

const Tagbox = styled.div`
    margin-top:5px;
    position:relative;
    width:270px;
    height:25px;
`;

const Colorbox = styled.div`
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
    background:#eee;
    padding:3px;
    border-radius:3px;
    margin-right:5px;
    color:#444;
    font-size:0.8em;
    font-weight:bold;
`;

const Colordescript = styled.div`
    position:relative;
    float:left;
    width:50px;
    height:20px;
    line-height:20px;
    font-size:0.7em;
    font-weight:bold;
`;

const ColorItem = styled.div`
    margin-top:4px;
    position:relative;
    float:left;
    width:12px;
    height:12px;
    border-radius:2px;
    background:red;
    
    & + div{
        margin-left:4px;
    }
`;

interface ContentProps {
    idx: number;
    imgurl: string;
    tags: Array<string>;
    colors: Array<string>;
    views: number;
    like: number;
    date?: string;
}

const Content: React.FC<ContentProps> = (props) => {
    return (
        <Div>
            <Imgbox>
                <Link href={{
                    pathname: '/product/detail',
                    query: { id: props.idx }
                }}>
                    <a>
                        <img src={`https://${process.env.API_HOST}/uploads/` + props.imgurl} height="338" />
                    </a>
                </Link>
            </Imgbox>
            <Tagbox>
                {
                    props.tags && props.tags.map((v, i) => {
                        return (
                            <Span key={i}>{decodeURIComponent(v)}</Span>
                        );
                    })
                }
            </Tagbox>
            <Colorbox>
                <Colordescript>보유색상</Colordescript>
                {
                    props.colors && props.colors.map((v, i) => {
                        return (
                            <ColorItem key={i} style={{ background: v }} />
                        );
                    })
                }
            </Colorbox>
            <Likebox><strong>{props.date}</strong> 등록됨</Likebox>
        </Div>
    );
}

export default Content;
