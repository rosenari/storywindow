import { Component } from 'react';
import { connect } from 'react-redux';
import * as apiActions from '../../store/reducers/api';
import styled from 'styled-components';
import { Label } from '../../components';
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

const Hrbox = styled.div`
    position:relative;
    margin:0 auto;
    margin-top:80px;
    width:1000px;
`;

const Imgbox = styled.div`
    position:relative;
    margin-top:40px;
    width:1124px;
    height:500px;
    text-align:center;
    overflow:hidden;
`;
const Titledescript = styled.div`
    position:relative;
    margin-top:40px;
    width:1124px;
    height:20px;
    line-height:20px;
    text-align:center;
    font-size:1.2em;
    font-weight:700;
    color:#555;
`;
const Title = styled.div`
    position:relative;
    margin-top:30px;
    width:1124px;
    height:20px;
    line-height:20px;
    text-align:center;
    font-size:1.6em;
    font-weight:700;
    color:#333;
`;

const Colorlist = styled.div`
    position:relative;
    margin:0 auto;
    width:1000px;
    height:120px;
    line-height:120px;
    text-align:center;
    border:#ddd solid;
    border-width:1px;
`;

const Color = styled.div`
    display:inline-block;
    margin-top:20px;
    float:center;
    position:relative;
    width:80px;
    height:80px;
    border-radius:10px;
    
    & + div {
        margin-left:40px;
    }
`;

const SubTitle = styled.div`
    margin-top:50px;
    margin-left:62px;
    position:relative;
    width:100px;
    height:30px;
    line-height:30px;
    font-size:0.8em;
    font-weight:bold;
    color:white;
    background:orange;
    border-radius:5px 5px 0px 0px;
    text-align:center;
`;

const Character = styled.div`
    position:relative;
    margin:0 auto;
    padding:30px;
    width:1000px;
    line-height:50px;
    text-align:left;
    border:#ddd solid;
    border-width:1px;
`;

const UL = styled.ul`
    margin:0px;
`;

const LI = styled.li`
    color:orange;
`;

const Span = styled.span`
    color:#333;
    font-size:1.0em;
    font-weight:bold;
`;

const Samples = styled.div`
    position:relative;
    margin:0 auto;
    padding:25px;
    padding-left:60px;
    padding-right:60px;
    width:1000px;
    height:300px;
    border:#ddd solid;
    border-width:1px;
`;

const Sample = styled.div`
    position:relative;
    float:left;
    width:250px;
    height:250px;
    background:gray;
    overflow:hidden;
    
    & + div{
        margin-left:54px;
    }
    
    & img{
        -webkit-transition: all 0.2s ease-in-out;
        -o-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
        -moz-transform: scale(1.0);
        -ms-transform: scale(1.0);
        -o-transform: scale(1.0);
    }
    
    & img:hover{
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        -ms-transform: scale(1.2);
        -o-transform: scale(1.2);
    }
`;

interface DetailProps {
    getApi: any;
    query: any;
    datas: any;
}

class Detail extends Component<DetailProps> {

    static async getInitialProps({ query, store }: any) {
        await store.dispatch(apiActions.loading());
        return { query }
    }

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.handleGetapi(`https://${process.env.API_HOST}/api/getProduct/${this.props.query.id}`);
    }

    componentDidUpdate() {
        if (this.props.datas !== "loading") return;

        this.handleGetapi(`https://${process.env.API_HOST}/api/getProduct/${this.props.query.id}`);
    }

    handleGetapi = (url: string) => {
        this.props.getApi(url);
    }


    render() {

        const datas = this.props.datas;

        return (
            datas == "loading" ? <Div><Label position="제품소개" sub_position="" /><Loading><CircularProgress /></Loading></Div> :
                <Div>
                    <Label position="제품소개" sub_position="" />
                    <Imgbox><img src={`http://${process.env.API_HOST}/uploads/${datas.data.result.imgurl == undefined ? '1593939918228construct.jpg' : datas.data.result.imgurl}`} width="1000" height="500" /></Imgbox>
                    <Titledescript>제품종류</Titledescript>
                    <Title>
                        {datas && datas.data.result.tags && datas.data.result.tags.map((v: any, i: any) => {
                            return (
                                decodeURIComponent(v) + " "
                            )
                        })}
                    </Title>
                    <SubTitle>제품특징</SubTitle>
                    <Character>
                        <UL>
                            {
                                datas && datas.data.result.note && datas.data.result.note.map((v: any, i: any) => {
                                    return (
                                        <LI key={i}><Span>{decodeURIComponent(v)}</Span></LI>
                                    )
                                })
                            }
                        </UL>
                    </Character>
                    <SubTitle>보유색상</SubTitle>
                    <Colorlist>
                        {
                            datas && datas.data.result.colors && datas.data.result.colors.map((v: any, i: any) => {
                                return (
                                    <Color style={{ background: v }} key={i} />
                                )
                            })
                        }
                    </Colorlist>
                    <SubTitle>제품샘플</SubTitle>
                    <Samples>
                        {
                            datas && datas.data.result.sample && datas.data.result.sample.map((v: any, i: any) => {
                                return (
                                    <Sample key={i}>
                                        <img src={`https://${process.env.API_HOST}/uploads/` + v} width="250" height="250" />
                                    </Sample>
                                )
                            })
                        }
                    </Samples>
                    <Hrbox><hr /></Hrbox>
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
export default connect(mapStateToProps, mapDispatchToProps)(Detail);