import { Component } from 'react';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

const Buttonbox = styled.div`
    float:left;
    position:relative;
    width:620px;
    height:100px;
`;

const Button = styled.div`
    float:left;
    position:relative;
    width:82px;
    height:82px;
    margin-top:10px;
    margin-left:35px;
    border:white solid;
    border-width:2px;
    border-radius:5px;
    background:#f8f8f8;
    cursor:pointer;
    
    &:hover{
        border:orange solid;
        border-width:2px;
    }
    &.active{
        background:#ffd587;
    }
`;

const ButtonImg = styled.div`
    position:relative;
    width:80px;
    height:60px;
    text-align:center;
`;

const Img = styled.img`
    width:50px;
    height:50px;
    margin-top:8px;
`;

const Buttontext = styled.div`
    position:relative;
    width:80px;
    height:20px;
    line-height:20px;
    font-size:0.7em;
    text-align:center;
    font-weight:bold;
`;

const Productbox = styled.div`
    float:left;
    position:relative;
    width:250px;
    height:100px;
`;

const Productfilter = styled.div`
    position:relative;
    width:250px;
    height:100px;
    line-height:100px;
    text-align:center;
`;

const Checkingbox = styled.div`
    float:left;
    position:relative;
    width:242px;
    height:100px;
    text-align:center;
`;

const Checkingbox_top = styled.div`
    position:relative;
    width:242px;
    height:50px;
    line-height:50px;
    text-align:left;
    padding-left:35px;
`;
const Checkingbox_bottom = styled.div`
    position:relative;
    width:242px;
    height:50px;
    line-height:50px;
    text-align:left;
    padding-left:35px;
`;

const CheckedImg = styled.div`
    position:absolute;
    top:0px;
    left:0px;
    width:20px;
    height:20px;
    line-height:20px;
    text-align:center;
`

interface FilterProps {
    loading: any;
    getApi: any;
}

interface FilterState {
    active: number;
    checkedA: boolean;
    checkedB: boolean;
    datas: any;
    product: string;
    age?: any;
}

//construct filter
class Filter extends Component<FilterProps, FilterState> {
    constructor(props: any) {
        super(props);
        this.state = {
            product: "all",
            datas: [{ Imgurl: "/images/newall.png", text: "전체보기" }
                , { Imgurl: "/images/newapart.png", text: "아파트" }
                , { Imgurl: "/images/newhousing.png", text: "주택" }
                , { Imgurl: "/images/newshop.png", text: "상업공간" }
                , { Imgurl: "/images/newcomputer.png", text: "사무실" }],
            checkedA: false,
            checkedB: false,
            active: 0
        }
    }

    getConstructName(active: number) {
        if (active === 1) return "아파트";
        else if (active === 2) return "주택";
        else if (active === 3) return "상업공간";
        else if (active === 4) return "사무실";
        else return "all";
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        if (this.state.active !== nextState.active || this.state.checkedA !== nextState.checkedA || this.state.checkedB !== nextState.checkedB || this.state.product !== nextState.product) {
            let constructname = this.getConstructName(nextState.active);
            this.props.loading();
            setTimeout(() => {
                this.handleGetapi(`https://${process.env.API_HOST}/api/getConstructs/0/${constructname}/${nextState.product}/${nextState.checkedA}/${nextState.checkedB}/date`);
            }, 500);
        }
        return true;
    }

    componentDidMount() {
        //전체보기 GET 로직추가
        console.log("componentDidMount");
        setTimeout(() => {
            this.handleGetapi(`https://${process.env.API_HOST}/api/getConstructs/0/all/all/false/false/date`);
        }, 500);
    }

    componentDidUpdate() {
        //전체보기 GET 로직추가
        console.log("componentDidMount");
        setTimeout(() => {
            this.handleGetapi(`https://${process.env.API_HOST}/api/getConstructs/0/all/all/false/false/date`);
        }, 500);
    }

    setProduct = (v: string) => {
        this.setState({
            product: v
        });
    }

    setCheck = (name: string, checked: boolean) => {
        let obj: any = {};
        obj[name] = checked;
        this.setState(obj);
    }

    handleChange = (event: any) => {
        this.setProduct(event.target.value);
    }

    changeCheck = (event: any) => {
        this.setCheck(event.target.name, event.target.checked);
    }

    MenuClick = (index: number) => {
        this.setState({
            active: index
        });
    }

    handleGetapi = (url: string) => {
        this.props.getApi(url);
    }


    render() {
        return (
            <Div>
                <Buttonbox>
                    {this.state.datas.map((v: any, i: any) => {
                        return (
                            <Button key={i} className={this.state.active == i ? 'active' : ''} onClick={() => this.MenuClick(i)}>
                                <ButtonImg><Img src={v.Imgurl} width="50" height="50" /></ButtonImg>
                                <Buttontext>{v.text}</Buttontext>
                                {this.state.active == i && <CheckedImg><img src="/images/checked_img.png" width="20" height="20" /></CheckedImg>}
                            </Button>
                        )
                    })}
                </Buttonbox>
                <Productbox>
                    <Productfilter>
                        <FormControl style={{ width: "200px", verticalAlign: "middle" }}>
                            <InputLabel shrink htmlFor="age-native-label-placeholder" style={{ color: "gray" }}>
                                제품선택
                                    </InputLabel>
                            <NativeSelect
                                value={this.state.age}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-native-label-placeholder',
                                }}
                            >
                                <option value={"all"}>모든제품</option>
                                <option value={"커튼"}>커튼</option>
                                <option value={"콤비블라인드"}>콤비블라인드</option>
                                <option value={"우드블라인드"}>우드블라인드</option>
                                <option value={"롤스크린"}>롤스크린</option>
                                <option value={"허니콤쉐이드"}>허니콤쉐이드</option>
                                <option value={"트리플쉐이드"}>트리플쉐이드</option>
                                <option value={"버티컬"}>버티컬</option>
                                <option value={"베니션"}>베니션</option>
                                <option value={"홀딩도어"}>홀딩도어</option>
                            </NativeSelect>
                            <FormHelperText >블라인드 제품을 선택해보세요.</FormHelperText>
                        </FormControl>
                    </Productfilter>
                </Productbox>
                <Checkingbox>
                    <Checkingbox_top>
                        <FormControlLabel
                            className="material_formcontrol"
                            control={
                                <Checkbox
                                    className="material_checkbox"
                                    checked={this.state.checkedA}
                                    onChange={this.changeCheck}
                                    name="checkedA"
                                    color="primary"
                                />
                            }
                            label="방염사용여부"
                        />
                    </Checkingbox_top>
                    <Checkingbox_bottom>
                        <FormControlLabel
                            className="material_formcontrol"
                            control={
                                <Checkbox
                                    className="material_checkbox"
                                    checked={this.state.checkedB}
                                    onChange={this.changeCheck}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="전동사용여부"
                        />
                    </Checkingbox_bottom>
                </Checkingbox>
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