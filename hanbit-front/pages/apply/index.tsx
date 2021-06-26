import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as apiActions from '../../store/reducers/api';
import { NextPage } from 'next';
import FadeIn from 'react-fade-in';
import { fontStyle } from '@material-ui/system';

const Div = styled.div`
    position:relative;
    width:100%;
    height:1060px;
`;

const Notice = styled.div`
    position:relative;
    width:100%;
    height:150px;
    text-align:center;
    padding-top:30px;
    color:white;
`;

const Box = styled.div`
    margin:0 auto;
    position:relateive;
    padding:20px;
    width:700px;
    height:650px;
    border:1px solid #ddd;
    border-radius:6px;
`;

const Note = styled.p`
    color:orange;
    font-weight:600;
    font-family:"Noto Sans KR";
    font-size:0.9em;
    text-align:right;
`;

const Orange = styled.span`
    color:orange;
`;

const Category = styled.p`
    color:#555;
    font-weight:600;
    font-family:"Noto Sans KR";
    font-size:1.0em;
    height:30px;
    margin-top:20px;
`;

const Input = styled.input`
    width:100%;
    height:50px;
    line-height:50px;
    padding-left:10px;
    border:1px solid #ddd;
`;

const ButtonBox = styled.div`
    margin-top:30px;
    position:relative;
    width:100%;
    text-align:center;
`;

const Button = styled.button`
    position:relative;
    width:300px;
    height:60px;
    line-height:60px;
    font-size:1.2em;
    font-weight:600;
    color:white;
    background:orange;
    border:0px;
    border-radius:4px;

    &:hover{
        background:#FFB141;
    }
`;

const DescBox = styled.div`
    padding:26px;
    width:100%;
    height:120px;
    text-align:center;
`;

const Apply: NextPage = () => {
    return (
        <Div>
            <FadeIn delay={300}>
                <Notice>
                    <p style={{ fontSize: "1.6em", fontWeight: 700, color: "#4D4D4D", fontFamily: "Noto Sans KR" }}>스토리창 파트너 모집</p>
                    <p style={{ fontSize: "1.0em", fontWeight: 600, color: "#4D4D4D", fontFamily: "Noto Sans KR" }}>"플랫폼을 함께 이끌어나갈 파트너를 모십니다"</p>
                </Notice>
                <Box>
                    <FadeIn delay={100}>
                        <Note>* 표시된 항목은 필수입력항목 입니다.</Note>
                        <Category>업체명 <Orange>*</Orange></Category>
                        <Input placeholder="업체명을 입력해주세요." />
                        <Category>대표명 <Orange>*</Orange></Category>
                        <Input placeholder="대표명을 입력해주세요." />
                        <Category>지역 <Orange>*</Orange></Category>
                        <Input placeholder="지역명을 입력해주세요." />
                        <Category>연락처 <Orange>*</Orange></Category>
                        <Input placeholder="연락처를 입력해주세요." />
                        <Category>이메일 <Orange>*</Orange></Category>
                        <Input placeholder="이메일을 입력해주세요." />
                    </FadeIn>
                </Box>
                <DescBox>
                    <p style={{ fontSize: "0.9em", fontWeight: 400, color: "#4D4D4D", fontFamily: "Noto Sans KR", fontStyle: "italic" }}>최고의 자재를 최저가격에 제공해드립니다</p>
                    <p style={{ fontSize: "0.9em", fontWeight: 400, color: "#4D4D4D", fontFamily: "Noto Sans KR", fontStyle: "italic" }}>지속적으로 성장할 플랫폼의 이점을 공유합니다</p>
                    <p style={{ fontSize: "0.9em", fontWeight: 400, color: "#4D4D4D", fontFamily: "Noto Sans KR", fontStyle: "italic" }}>노력과 땀을 공유합니다</p>
                </DescBox>
                <ButtonBox><Button>신청하기</Button></ButtonBox>
            </FadeIn>
        </Div>
    )
}

export default Apply;