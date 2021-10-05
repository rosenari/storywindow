import styled from 'styled-components';
import { connect } from 'react-redux';

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
    allcount?: number;
}

const SummaryBox: React.FC<SummaryProps> = (props) => {

    return (
        <Div>
            <InnerBox>
                총 <span style={{ color: "orange" }}>{props.allcount || 0}</span>개의 시공사례
            </InnerBox>
        </Div>
    );
}

// props 값으로 넣어 줄 상태를 정의해줍니다.
const mapStateToProps = (state: any) => ({
    allcount: state.reducer.productListData?.allcount || 0
});

// 컴포넌트를 리덕스와 연동 할 떄에는 connect 를 사용합니다.
// connect() 의 결과는, 컴포넌트에 props 를 넣어주는 함수를 반환합니다.
// 반환된 함수에 우리가 만든 컴포넌트를 넣어주면 됩니다.
export default connect(mapStateToProps, null)(SummaryBox);