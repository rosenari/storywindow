import React from "react";
import styled from "styled-components";
import { Label, Navermap } from "../components";


const Div = styled.div`
    position:relative;
    margin:0 auto;
    width:1124px;
    margin-bottom:40px;
`;

const Mapcontainer = styled.div`
    position:relative;
    margin:0 auto;
    margin-top:20px;
    margin-bottom:40px;
    width:1124px;
    height:600px;
`;
const Header = styled.div`
    margin-top:40px;
    width:1124px;
    height:20px;
    line-height:20px;
    color:black;
    font-size:1.3em;
    text-align:center;
`;

const Detailbox = styled.div`
    position:relative;
    margin:0 auto;
    margin-top:40px;
    width:1124px;
    height:240px;
    padding-top:15px;
    padding:bottom:15px;
    border:#aaa solid;
    border-width:1px;
    border-left:0px;
    border-right:0px;
    
    & + div{
        border-top:0px;
        margin-top:0px;
        margin-bottom:40px;
    }
`;
const Detailbox_left = styled.div`
    position:relative;
    float:left;
    width:210px;
    height:210px;
`;

const Img = styled.img`
    width:210px;
    height:210px;
    border-radius:10px;
`;

const Detailbox_center = styled.div`
    position:relative;
    float:left;
    width:624px;
    height:210px;
    padding-left:50px;
`;

const Detailbox_title = styled.div`
    position:relative;
    width:624px;
    height:70px;
    line-height:70px;
    font-size:1.2em;
    font-weight:bold;
`;

const Detailbox_address = styled.div`
    position:relative;
    width:624px;
    height:70px;
    line-height:70px;
    font-size:0.9em;
    font-weight:600;
    color:#555;
`;

const Detailbox_tel = styled.div`
    position:relative;
    width:624px;
    height:70px;
    line-height:70px;
    font-size:0.9em;
    font-weight:600;
    color:#555;
`;

const Icon = styled.img`
    width:29x;
    height:29px;
    background:orange;
    border:#aaa solid;
    border-width:1px;
    border-radius:50%;
    margin-right:10px;
`;

const Icon2 = styled.img`
    width:29x;
    height:29px;
    margin-right:10px;
`;

const Detail_right = styled.div`
    position:relative;
    float:left;
    width:290px;
    height:210px;
`;

const Detail_descript = styled.div`
    position:relative;
    width:290px;
    height:40px;
    text-align:center;
`;

const Descript = styled.span`
    display:inline-block;
    width:70%;
    height:40px;
    border-radius:10px;
    line-height:40px;
    background:var(--color-main);
    font-size:0.9em;
    color:white;
    font-weight:bold;
    vertical-align:center;
`;

const Detail_region = styled.div`
    position:relative;
    width:290px;
    height:170px;
    line-height:170px;
    text-align:center;
    font-size:2.0em;
    font-weight:bold;
`;

interface Item {
    Imgpath: string;
    title: string;
    title2: string;
    address: string;
    tel: string;
    region: string;
}

interface DetailProps {
    data: Array<Item>;
}

const Detail: React.FC<DetailProps> = (props) => {

    return (
        <>
            {props.data.map((v, i) => {
                return (
                    <Detailbox key={"detail_" + i}>
                        <Detailbox_left><Img src={v.Imgpath} /></Detailbox_left>
                        <Detailbox_center>
                            <Detailbox_title><Icon src="/images/noah_icon.png" />{v.title} <span style={{ color: "var(--color-main)" }}>{v.title2}</span></Detailbox_title>
                            <Detailbox_address><Icon2 src="/images/map_detailmarker.png" />{v.address}</Detailbox_address>
                            <Detailbox_tel><Icon2 src="/images/map_detailphone.png" />{v.tel}</Detailbox_tel>
                        </Detailbox_center>
                        <Detail_right>
                            <Detail_descript><Descript>시공가능지역</Descript></Detail_descript>
                            <Detail_region>{v.region}</Detail_region>
                        </Detail_right>
                    </Detailbox>
                )
            })
            }
        </>
    );
}

class Hanbitmap extends React.Component {

    render() {
        return (
            <Div>
                <Label position="회사소개" sub_position="찾아오시는길" />
                <Header><strong><span style={{ color: "var(--color-main)" }}>스토리 창 </span></strong><strong>한눈에 보기</strong></Header>
                <hr />
                <Mapcontainer><Navermap /></Mapcontainer>
                <Detail data={
                    [
                        {
                            Imgpath: "/images/map_detail1.png",
                            title: "스토리창",
                            title2: "본사",
                            address: "대전 유성구 진잠로 74 (1층, 스토리창 본사)",
                            tel: "042-581-2464",
                            region: "대전,충청"
                        }
                    ]
                }></Detail>
            </Div>
        );
    }
}

export default Hanbitmap;