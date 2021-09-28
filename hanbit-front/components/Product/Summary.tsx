import styled from 'styled-components';
import { connect } from 'react-redux';
import * as apiActions from '../../store/reducers/api';

const Div = styled.div`
    position:relative;
    width:1114px;
    height:50px;
    line-height:50px;
`;

const InnerBox = styled.div`
    position:relative;
    float:left;
    width:1000px;
    height:50px;
    line-height:50px;
    font-size:1.2em;
    font-weight:bold;
    color:gray;
`;

interface SummaryProps {
    datas: any;
}

const SummaryBox: React.FC<SummaryProps> = (props) => {
    let productsCount = 0;
    if (props.datas !== "loading") {
        productsCount = props.datas.data.allcount;
    }

    return (
        <Div>
            <InnerBox>
                총 <span style={{ color: "orange" }}>{productsCount}</span>개의 시공사례
            </InnerBox>
        </Div>
    );
}

// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state: any) => ({
    datas: state.api.datas
});

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch: any) => ({
    getApi: (url: string) => dispatch(apiActions.getApi(url)),
})

// 컴포넌트를 리덕스와 연동 할 떄에는 connect 를 사용합니다.
// connect() 의 결과는, 컴포넌트에 props 를 넣어주는 함수를 반환합니다.
// 반환된 함수에 우리가 만든 컴포넌트를 넣어주면 됩니다.
export default connect(mapStateToProps, mapDispatchToProps)(SummaryBox);