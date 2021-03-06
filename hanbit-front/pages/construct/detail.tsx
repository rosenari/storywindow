import React from 'react';
import styled from 'styled-components';
import { Label } from '../../components';
import { connect } from 'react-redux';
import * as apiActions from '../../store/reducers/api';
import CircularProgress from '@material-ui/core/CircularProgress';

const Div = styled.div`
    position:relative;
    margin:0 auto;
    width:1124px;
`;

const Loading = styled.div`
    position:relative;
    width:1114px;
    height:800px;
    line-height:300px;
    text-align:center;
`;

const Imgbox = styled.div`
    position:relative;
    margin-top:40px;
    width:1124px;
    height:500px;
    text-align:center;
    overflow:hidden;
`;

const Title = styled.div`
    position:relative;
    margin-top:30px;
    width:1124px;
    height:40px;
    line-height:40px;
    text-align:center;
    font-size:1.6em;
    font-weight:700;
    color:#333;
`;

const Tagbox = styled.div`
    position:relative;
    margin-top:13px;
    width:1124px;
    height:40px;
    line-height:40px;
    text-align:center;
`;

const Tag1 = styled.span`
    margin-top:0px;
    background:#999;
    padding:5px;
    border-radius:3px;
    color:white;
    font-size:1.3em;
    font-weight:bold;
`;

const Tag2 = styled.span`
    margin-top:0px;
    background:orange;
    padding:5px;
    border-radius:3px;
    color:white;
    font-size:1.3em;
    font-weight:bold;
    margin-left:10px;
`;

const Content = styled.div`
    margin:0 auto;
    margin-top:40px;
    margin-bottom:40px;
    position:relative;
    width:1000px;
    min-height:400px;
    font-size:1.0em;
    border:#eee solid;
    border-width:1px;
    padding:30px;
`;

interface DetailProps {
    getApi: any;
    query: any;
    datas: any;
}

class Detail extends React.Component<DetailProps> {
    static async getInitialProps({ store, query }: any) {
        await store.dispatch(apiActions.loading());
        return { query }
    }

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.handleGetapi(`https://${process.env.API_HOST}/api/getConstruct/${this.props.query.id}`);
        }, 500)
    }

    handleGetapi = (url: string) => {
        this.props.getApi(url);
    }

    render() {

        const datas = this.props.datas;
        console.log(datas);

        return (
            datas == "loading" ? <Div><Label position="시공모음" sub_position="" /><Loading><CircularProgress /></Loading></Div> :
                <Div>
                    <Label position="시공모음" sub_position="" />
                    <Imgbox><img src={`https://${process.env.API_HOST}/uploads/${datas.data.result.imgurl}`} width="1000" height="500" /></Imgbox>
                    <Title>{decodeURIComponent(datas.data.result.title)}</Title>
                    <Tagbox>
                        <Tag1>{decodeURIComponent(datas.data.result.space)}</Tag1>
                        {
                            datas.data.result.tags.map((v: any, i: any) => {
                                return (
                                    <Tag2 key={i}>{decodeURIComponent(v)}</Tag2>
                                );
                            })

                        }
                    </Tagbox>
                    <Content dangerouslySetInnerHTML={{ __html: decodeURIComponent(datas.data.result.contents) }}>
                    </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail);