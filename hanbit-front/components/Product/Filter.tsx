import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as apiActions from '../../store/reducers/api';

const Div = styled.div`
    position:relative;
    margin-top:20px;
    margin-bottom:10px;
    width:1114px;
    height:102px;
    border:#ddd solid;
    border-width:1px;
`;

const ButtonBox = styled.div`
    position:relative;
    float:left;
    width:80px;
    height:100px;
    line-height:100px;
    text-align:center;
    color:#aaa;
    background:white;
`;
const LeftButton = styled.button`
    position:relative;
    width:40px;
    height:40px;
    line-height:40px;
    background:white;
    border-width:0px;
    border-radius:50%;
    box-shadow:3px 3px 3px #ddd;
    font-size:1.1em;
    font-weight:bold;
    color:#aaa;
    cursor:pointer;
    
    &:active{
        box-shadow:1px 1px 1px #ddd;
    }
`;
const RightButton = styled.button`
    position:relative;
    width:40px;
    height:40px;
    line-height:40px;
    background:white;
    border-width:0px;
    border-radius:50%;
    box-shadow:-3px 3px 3px #ddd;
    font-size:1.1em;
    font-weight:bold;
    color:#aaa;
    cursor:pointer;
    
    &:active{
        box-shadow:-1px 1px 1px #ddd;
    }
`;

const SelectContainer = styled.div`
    position:relative;
    float:left;
    width:952px;
    height:100px;
    overflow:hidden;
`;

const ItemContainer = styled.div`
    position:relative;
    width: max-content;
    height:100px;
    -webkit-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
`;

const Item = styled.div`
    position:relative;
    float:left;
    width:100px;
    height:100px;
    line-height:100px;
    text-align:center;
`;
const Itemimgbox = styled.div`
    position:relative;
    width:100px;
    height:80px;
    line-height:80px;
    text-align:center;
    
    & img{
        border:white solid;
        border-width:3px;
        border-radius:50%;
        -webkit-transition: all 0.1s ease-in-out;
        -o-transition: all 0.1s ease-in-out;
        transition: all 0.1s ease-in-out;
        cursor:pointer
    }
    & img:hover{
        width:75px;
        height:75px;
        border:orange solid;
        border-width:3px;
    }
    
    & img:active{
        width:75px;
        height:75px;
        border:#ffc451 solid;
        border-width:3px;
    }
    
    &.active img{
        width:75px;
        height:75px;
        border:black solid;
        border-width:0px;
        filter:brightness(50%);
    }
`;

const Itemselected = styled.div`
    position:absolute;
    top:3px;
    left:0px;
    width:100px;
    height:80px;
    line-height:80px;
    font-size:0.7em;
    font-weight:bold;
    color:white;
`;

const Itemtext = styled.div`
    width:100px;
    height:20px;
    line-height:20px;
    text-align:center;
    font-size:0.7em;
`;

interface FilterProps {
    loading: any;
    getApi: any;
    datas: any;
}

interface Data {
    imgurl: string;
    text: string;
}

interface FilterState {
    datas: Array<Data>;
    active: number;
    index: number;
}

class Filter extends React.Component<FilterProps, FilterState> {
    itemcontext: number;
    containerRef: any;

    constructor(props: any) {
        super(props);
        this.containerRef = React.createRef();
        this.itemcontext = 0;
        this.state = {
            datas: [{ imgurl: "/images/product_all.png", text: "모두보기" }
                , { imgurl: "/images/leftmenu_img1.png", text: "전동제품" }
                , { imgurl: "/images/product_curtain.png", text: "커튼" }
                , { imgurl: "/images/product_combi.png", text: "콤비블라인드" }
                , { imgurl: "/images/product_wood.png", text: "우드블라인드" }
                , { imgurl: "/images/product_roll.png", text: "롤스크린" }
                , { imgurl: "/images/product_honey.png", text: "허니콤쉐이드" }
                , { imgurl: "/images/product_triple.png", text: "트리플쉐이드" }
                , { imgurl: "/images/product_verticul.png", text: "버티컬" }
                , { imgurl: "/images/product_vene.png", text: "베니션" }
                , { imgurl: "/images/product_holding.png", text: "홀딩도어" }],
            active: 0,
            index: 0
        };
    }

    getProductName(active: number): string {
        if (active === 1) return "전동제품";
        else if (active === 2) return "커튼";
        else if (active === 3) return "콤비블라인드";
        else if (active === 4) return "우드블라인드";
        else if (active === 5) return "롤스크린";
        else if (active === 6) return "허니콤쉐이드";
        else if (active === 7) return "트리플쉐이드";
        else if (active === 8) return "버티컬";
        else if (active === 9) return "베니션";
        else if (active === 10) return "홀딩도어";
        else return "all";
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        if (this.state.active !== nextState.active) {
            let productname = this.getProductName(nextState.active);
            this.props.loading();
            this.handleGetapi(`https://${process.env.API_HOST}/api/getProducts/0/${productname}/date`);
        }

        return true;
    }

    componentDidMount() {
        //전체보기 GET 로직추가
        console.log("componentDidMount");
        this.handleGetapi(`https://${process.env.API_HOST}/api/getProducts/0/all/date`);
    }

    componentDidUpdate() {
        //전체보기 GET 로직추가
        if (this.props.datas !== "loading") return;

        let productname = this.getProductName(this.state.active);
        this.handleGetapi(`https://${process.env.API_HOST}/api/getProducts/0/${productname}/date`);
    }

    LeftClick = () => {
        if (this.itemcontext > 0) {
            this.containerRef.current.style.marginLeft = ((this.itemcontext - 1) * -100) + "px";
            this.itemcontext = this.itemcontext - 1;
        }
    }

    RightClick = () => {
        if (this.itemcontext < 11 - 9) {
            this.containerRef.current.style.marginLeft = ((this.itemcontext + 1) * -100) + "px";
            this.itemcontext = this.itemcontext + 1;
        }
    }

    MenuClick = (index: number) => {
        this.setState({
            active: index
        })
    }

    handleGetapi = (url: string) => {
        this.props.getApi(url);
    }

    render() {

        return (
            <Div>
                <ButtonBox><LeftButton onClick={this.LeftClick}>{"<"}</LeftButton></ButtonBox>
                <SelectContainer>
                    <ItemContainer ref={this.containerRef}>
                        {this.state.datas && this.state.datas.map((data, index) => {
                            return (
                                <Item key={index}>
                                    <Itemimgbox className={this.state.active == index ? 'active' : ''}>
                                        <img src={data.imgurl} width="75" height="75" onClick={() => this.MenuClick(index)} />
                                        {this.state.active == index && <Itemselected>선택됨</Itemselected>}
                                    </Itemimgbox>
                                    <Itemtext>
                                        {data.text}
                                    </Itemtext>
                                </Item>
                            );
                        })
                        }
                    </ItemContainer>
                </SelectContainer>
                <ButtonBox><RightButton onClick={this.RightClick}>{">"}</RightButton></ButtonBox>
            </Div>
        );
    }
}

// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state: any) => ({
    datas: state.api.datas
});

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch: any) => ({
    getApi: (url: string) => dispatch(apiActions.getApi(url)),
    loading: () => dispatch(apiActions.loading())
})

// 컴포넌트를 리덕스와 연동 할 떄에는 connect 를 사용합니다.
// connect() 의 결과는, 컴포넌트에 props 를 넣어주는 함수를 반환합니다.
// 반환된 함수에 우리가 만든 컴포넌트를 넣어주면 됩니다.
export default connect(mapStateToProps, mapDispatchToProps)(Filter);