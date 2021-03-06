import { Component } from 'react';
import styled from 'styled-components';
import Descript from './Descript';
import Content from './Content';
import { connect } from 'react-redux';
import * as apiActions from '../../store/reducers/api';
import CircularProgress from '@material-ui/core/CircularProgress';

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
`;
const Line = styled.div`
    clear:both;
    position:relative;
    width:1114px;
    height:270px;
    margin-bottom:33px;
`;

const More = styled.div`
    position:relative;
    width:1114px;
    height:50px;
    line-height:50px;
    margin-bottom:40px;
    color:white;
    background:orange;
    font-size:1.2em;
    font-weight:bold;
    text-align:center;
    border-radius:5px;
    cursor:pointer;
`;

class Contents extends Component<{
    datas: any;
}> {

    render() {
        let datas = [];
        let remain = false;
        if (this.props.datas !== "loading") {
            datas = this.props.datas.data.result;
            remain = this.props.datas.data.remain;
            console.log(datas);
        }

        let line: Array<any> = [];

        return (
            this.props.datas == "loading" ? <Div><Descript /><Loading><CircularProgress /></Loading></Div> :
                <Div>
                    <Descript />
                    {datas.map((data: any, index: any) => {
                        if (index % 4 == 3 || index == datas.length - 1) {
                            if (index % 4 == 0) {
                                line = [];
                            }
                            line.push(data);
                            return (
                                <Line key={index}>
                                    {
                                        line.map((v, i) => {
                                            return (
                                                <Content key={i} idx={v.id} imgurl={v.imgurl} title={v.title} tags={v.tags} like={v.like} views={v.views} date={v.date} space={v.space} />
                                            );
                                        })
                                    }
                                </Line>
                            )
                        } else if (index % 4 == 0 && index !== datas.length - 1) {
                            console.log(index);
                            line = [];
                            line.push(data);
                        } else {
                            line.push(data);
                        }
                    })}
                    {remain && <More>더보기</More>}
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
    getApi: (url: string) => dispatch(apiActions.getApi(url))
})

// 컴포넌트를 리덕스와 연동 할 떄에는 connect 를 사용합니다.
// connect() 의 결과는, 컴포넌트에 props 를 넣어주는 함수를 반환합니다.
// 반환된 함수에 우리가 만든 컴포넌트를 넣어주면 됩니다.
export default connect(mapStateToProps, mapDispatchToProps)(Contents);