import React from "react";
import styles from "./css/intro.module.css";
import { Label } from "../components";
import styled from "styled-components";
import FadeIn from "react-fade-in";

const Header = styled.div`
    margin-top:40px;
    width:1124px;
    height:20px;
    line-height:20px;
    color:black;
    font-size:1.3em;
    text-align:center;
`;

const Imgbox = styled.div`
    position:relative;
    margin-top:40px;
    width:1124px;
    height:600px;
    text-align:center;
    animation: fadein2 1s;
    -moz-animation: fadein2 1s; /* Firefox */
    -webkit-animation: fadein2 1s; /* Safari and Chrome */
    -o-animation: fadein2 1s; /* Opera */
    overflow:hidden;
`;

const Img = styled.img`
    border:#aaa solid;
    border-width:0px;
    border-radius:20px;
`;

const Imgdescript1 = styled.div`
    margin-top:30px;
    width:1124px;
    height:50px;
    line-height:50px;
    color:#666;
    font-size:1.1em;
    text-align:center;
`;

const Imgdescript2 = styled.div`
    margin-top:30px;
    margin-bottom:30px;
    width:1124px;
    height:50px;
    line-height:50px;
    color:#666;
    font-size:1.1em;
    text-align:center;
`;

const Intro: React.FC = () => {
    return (
        <div className={styles.intro}>
            <Label position="회사소개" sub_position="스토리창" />
            <div className={styles.introbox}>
                <FadeIn delay={300}>
                    <Header>전국<strong> 블라인드 </strong> 도매업체 <strong><span style={{ color: "var(--color-main)" }}>스토리 창</span></strong></Header>
                    <hr />
                    <div style={{ width: "100%", textAlign: "center", marginTop: "40px" }}>
                        <img src="/images/factory_inner.png" width="1000" height="536" style={{ borderRadius: "20px" }} />
                    </div>
                    <Imgdescript1><strong><span style={{ color: "var(--color-main)" }}>스토리 창</span></strong>은 전국을 대상으로 하는 국내 최고의 <strong>블라인드 도매업체</strong>입니다.</Imgdescript1>
					<div style={{ width: "100%", textAlign: "center", marginTop: "40px" }}>
                        <img src="/images/factory_inner_small.jpg" width="1000" height="536" style={{ borderRadius: "20px" }} />
                    </div>
                    <Imgdescript2><strong>신생 또는 소규모 업체</strong>를 <strong>적극 지원</strong>하여 <strong><span style={{ color: "var(--color-main)" }}> 안정감과 만족감</span></strong>을 가져다드립니다.</Imgdescript2>
                    <Imgdescript2>
                        <strong><span style={{ color: "var(--color-main)" }}>스토리 창</span></strong>은 <strong>대규모 공장</strong>에서 직접<strong> 블라인드</strong>를 <strong>
                            <span style={{ color: "skyblue" }}>맞춤제작</span></strong>하여 <strong>전국 최저가</strong>에 제공해드립니다.
                    </Imgdescript2>
					<div style={{ width: "100%", textAlign: "center", marginTop: "40px" }}>
                        <img src="/images/factory_machine_big.png" width="1000" height="536" style={{ borderRadius: "20px" }} />
                    </div>
                    <Imgdescript2><strong>스토리창은 모든 업체를 존중합니다.</strong></Imgdescript2>
                </FadeIn>
            </div>
            <div className={styles.introbox}>
                <FadeIn delay={300}>
                    {/*<Header><strong>공장</strong>에서 <strong><span style={{ color: "skyblue" }}>직접 맞춤제작하여 보내드립니다. </span></strong></Header>*/}
                </FadeIn>
            </div>
            <Header></Header>
            {/*<div className={styles.introbox}>
                <FadeIn delay={300}>
                    <Header><strong><span style={{ color: "var(--color-main)" }}>저렴한</span></strong> <strong><span style={{ color: "purple" }}>전동블라인드 제품 </span></strong></Header>
                    <hr />
                    <Imgbox><iframe id="myVideo" src="//www.youtube.com/embed/4fL2E8FleWQ" width="1000" height="600"></iframe></Imgbox>
                    <Imgdescript1>기존블라인드 제품에 <strong><span style={{ color: "var(--color-main)" }}>장착가능한</span></strong> <strong><span style={{ color: "purple" }}>전동모듈</span></strong>을 통해 <strong><span style={{ color: "skyblue" }}>스마트한 블라인드</span></strong>를 완성해보세요.</Imgdescript1>
                </FadeIn>
                <br />
            </div>*/}
        </div>
    )
}

export default Intro;
