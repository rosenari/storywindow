import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import FadeIn from 'react-fade-in';

const Div = styled.div`
    position:relative;
    width:100%;
    height:600px;
    text-align:center;
    padding:200px;
    font-family:"Noto Sans KR";
    color:#555;
`;

const Title = styled.p`
    font-size:2.5em;
    font-weight:600;
`;

const SubTitle = styled.p`
    font-size:1.4em;
    font-weight:400;
`

const Descript = styled.p`
    margin-top:50px;
    font-size:1.0em;
    font-weight:400;
`;

const Complete: NextPage = () => {
    return (
        <Div>
            <Title>파트너 신청이 접수되었습니다.</Title>
            <SubTitle>"스토리창 파트너에 지원해주셔서 정말 감사합니다."</SubTitle>
            <Descript>- 빠른 시일 내에 연락드리겠습니다 -</Descript>
        </Div>
    )
}

export default Complete;