import React from "react";
import styles from "./css/intro.module.scss";
import styles_mobile from "./css/intro_mobile.module.scss";
import { useCssSelector } from "@/hooks/index";
import { Label } from "../components";
import styled from "styled-components";
import FadeIn from "react-fade-in";

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
    const css = useCssSelector({ pc: styles, mobile: styles_mobile });

    return (
        <div className={css.intro}>
            <Label position="회사소개" sub_position="스토리창" />
            <div className={css.introbox}>
                <FadeIn delay={300}>
                    <div className={css.introbox_title}>전국<strong> 블라인드 </strong> 도매업체 <strong><span style={{ color: "var(--color-main)" }}>스토리 창</span></strong></div>
                    <hr />
                    <div className={css.introbox_label}>
                        <img src="/images/factory_inner.png" />
                    </div>
                    <div className={css.introbox_header}><strong><span style={{ color: "var(--color-main)" }}>스토리 창</span></strong>은 전국을 대상으로 하는 국내 최고의 <strong>블라인드 도매업체</strong>입니다.</div>
					<div className={css.introbox_label}>
                        <img src="/images/factory_inner_small.jpg" />
                    </div>
                    <div className={css.introbox_header}><strong>신생 또는 소규모 업체</strong>를 <strong>적극 지원</strong>하여 <strong><span style={{ color: "var(--color-main)" }}> 안정감과 만족감</span></strong>을 가져다드립니다.</div>
                    <div className={css.introbox_header}>
                        <strong><span style={{ color: "var(--color-main)" }}>스토리 창</span></strong>은 <strong>대규모 공장</strong>에서 직접<strong> 블라인드</strong>를 <strong>
                            <span style={{ color: "skyblue" }}>맞춤제작</span></strong>하여 <strong>전국 최저가</strong>에 제공해드립니다.
                    </div>
					<div className={css.introbox_label}>
                        <img src="/images/factory_machine_big.png" />
                    </div>
                    <div className={css.introbox_header}><strong>스토리창은 모든 업체를 존중합니다.</strong></div>
                </FadeIn>
            </div>
        </div>
    )
}

export default Intro;
