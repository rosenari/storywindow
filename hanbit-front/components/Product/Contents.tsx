import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as apiActions from '../../store/reducers/api';
import styled from 'styled-components';
import Descript from './Descript';
import Content from './Content';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImagePopup from '../Popup/ImagePopup';


const Loading = styled.div`
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

const More = styled.div`
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

class Contents extends Component<ContentsProps> {
    private popupRef: React.RefObject<{ setVisible?: any }>;

    constructor(props: ContentsProps){
        super(props);
        this.popupRef = React.createRef();
    }

    render() {
        let datas = [];
        let tag: String = 'all';
        let remain = false;
        if (this.props.datas !== "loading") {
            console.log(this.props.datas.config.url.split('/')[6]);
            datas = this.props.datas.data.result;
            remain = this.props.datas.data.remain;
            tag = this.props.datas.config?.url?.split('/')?.[6] || tag;
        }


        let line: Array<any> = [];
        return (
            this.props.datas == "loading" ? <Div><Descript /><Loading><CircularProgress /></Loading></Div> :
                <Div>
                    <Descript />
                    {datas && datas.length > 0 && datas.map((data: any, index: any) => {
                        if (index % 4 == 3 || index == datas.length - 1) {
                            if (index % 4 == 0) {
                                line = [];
                            }
                            //console.log(index);
                            line.push(data);
                            return (
                                <Line key={index}>
                                    {
                                        line.map((v, i) => {
                                            return (
                                                <Content key={v.id} popupRef={this.popupRef} mainImgurl={v.mainImgurl} idx={v.id} imgurl={v.imgurl} tags={v.tags} colors={v.colors} like={v.like} views={v.views} date={v.date} />
                                            );
                                        })
                                    }
                                </Line>
                            )
                        } else if (index % 4 == 0 && index !== datas.length - 1) {
                            //console.log(index); 
                            line = [];
                            line.push(data);
                        } else {
                            //console.log(index);
                            line.push(data);
                        }
                    })}
                    {remain && <More onClick={() => {
                        this.props.getApi2(`https://${process.env.API_HOST}/api/getProducts/${datas.length}/${tag}/date`);
                    }}>더보기</More>}
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