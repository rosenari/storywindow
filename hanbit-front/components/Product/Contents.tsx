import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as apiActions from '../../store/reducers/api';
import styled from 'styled-components';
import Descript from './Summary';
import Content from './Content';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ImagePopup } from '../Popup';
import { deepArrayCopy } from '../../util';


const ProgressBox = styled.div`
    position:relative;
    width:1114px;
    height:450px;
    line-height:300px;
    text-align:center;
`;

const Div = styled.div`
    position:relative;
    width:1114px;
    min-height:500px;
    margin-bottom:30px;
`;

const Line = styled.div`
    clear:both;
    position:relative;
    width:1114px;
    height:150px;
    margin-bottom:10px;
`;

const MoreButton = styled.div`
    display:flex;
    justify-content: center;
    align-items:center;
    position:relative;
    width:1114px;
    height:50px;
    color:white;
    background:orange;
    font-size:1.2em;
    font-weight:bold;
    border-radius:5px;
    cursor:pointer;
`;

interface ContentsProps {
    datas: any;
    getApi2: any;
}

interface ProductItem {
    id: number;
    mainImgurl: string;
    imgurl: string;
    tags: Array<string>;
    colors: Array<string>;
    like: number;
    views: number;
    date: string;
}

class Contents extends Component<ContentsProps> {
    private popupRef: React.RefObject<{ setVisible?: any }>;
    private countPerLine = 4;

    constructor(props: ContentsProps){
        super(props);
        this.popupRef = React.createRef();
    }

    renderContentFromLine(line: Array<ProductItem>){
        return line.map(product => <Content key={product.id} popupRef={this.popupRef} 
            mainImgurl={product.mainImgurl} idx={product.id} 
            imgurl={product.imgurl} tags={product.tags} colors={product.colors} 
            like={product.like} views={product.views} date={product.date} />);
    }

    renderLinesFromProducts(products: any, countPerLine: number, id: number = 0){
        const result = [];
        const copyProducts = deepArrayCopy<ProductItem>(products);
        while(copyProducts.length > 0){
            const line = copyProducts.splice(0, countPerLine);
            result.push(<Line key={id++}>{this.renderContentFromLine(line)}</Line>);
        }
        return result;
    }

    render() {
        let products = [];
        let tag: String = 'all';
        let remain = false;
        
        if (this.props.datas !== "loading") {
            products = this.props.datas.data.result;
            remain = this.props.datas.data.remain;
            tag = this.props.datas.config?.url?.split('/')?.[6] || tag;
        }

        return (
            this.props.datas == "loading" ? <Div><Descript /><ProgressBox><CircularProgress /></ProgressBox></Div> :
                <Div>
                    <Descript />
                    {this.renderLinesFromProducts(products, this.countPerLine)}
                    {remain && <MoreButton onClick={() => {
                        this.props.getApi2(`https://${process.env.API_HOST}/api/getProducts/${products.length}/${tag}/date`);
                    }}>더보기</MoreButton>}
                    <ImagePopup ref={this.popupRef} />
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
    getApi2: (url: string) => dispatch(apiActions.getApi2(url)),
})

// 컴포넌트를 리덕스와 연동 할 떄에는 connect 를 사용합니다.
// connect() 의 결과는, 컴포넌트에 props 를 넣어주는 함수를 반환합니다.
// 반환된 함수에 우리가 만든 컴포넌트를 넣어주면 됩니다.
export default connect(mapStateToProps, mapDispatchToProps)(Contents);