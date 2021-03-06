import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { deepArrayCopy } from '@/util/index';
import { RequestProductListAction } from '@/store/action/sagaAction';

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

const ButtonActive = css`
    &:active{
        box-shadow:1px 1px 1px #ddd;
    }
`;

const Button = styled.button`
    position:relative;
    width:40px;
    height:40px;
    line-height:40px;
    background:white;
    border-width:0px;
    border-radius:50%;
    font-size:1.1em;
    font-weight:bold;
    color:#aaa;
    cursor:pointer;
    box-shadow:3px 3px 3px #ddd;
    ${ButtonActive}
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

const ItemImage = css`
    & img{
        border:white solid;
        border-width:3px;
        border-radius:50%;
        -webkit-transition: all 0.1s ease-in-out;
        -o-transition: all 0.1s ease-in-out;
        transition: all 0.1s ease-in-out;
        cursor:pointer
    }
`;

const ItemImageHover = css`
    & img:hover{
        border:orange solid;
        border-width:3px;
    }
`;

const ItemImageActive = css`
    & img:active{
        border:#ffc451 solid;
        border-width:3px;
    }
`;

const ItemImageForBoxActive = css`
    &.active img{
        border:black solid;
        border-width:0px;
        filter:brightness(50%);
    }
`;

const Itemimgbox = styled.div`
    position:relative;
    width:100px;
    height:80px;
    line-height:80px;
    text-align:center;
    ${ItemImage}
    ${ItemImageHover}
    ${ItemImageActive}
    ${ItemImageForBoxActive}
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
    getProductList: ({ tag }: {
        tag: string;
    }) => any;
}

interface FilterItem {
    id: number;
    imgurl: string;
    text: string;
    parameter: string;
    active: boolean;
}

interface FilterState<T> {
    items: Array<T>;
}

const PRODUCT_TEXT = {
    ALL: '????????????',
    CURTAIN: '??????',
    COMBI: '??????????????????',
    WOOD: '??????????????????',
    ROLL: '????????????',
    HONEY: '??????????????????',
    TRIPLE: '??????????????????',
    VERTICUL: '?????????',
    VENE: '?????????',
    HOLDING: '????????????',
}

class Filter extends React.Component<FilterProps, FilterState<FilterItem>> {
    private width = '75';
    private height = '75';
    private itemcontext: number;
    private containerRef: any;

    constructor(props: any) {
        super(props);
        this.containerRef = React.createRef();
        this.itemcontext = 0;
        this.state = {
            items: [{ imgurl: '/images/product_all.png', text: PRODUCT_TEXT.ALL, parameter: 'all', active: true }
                , { imgurl: '/images/product_curtain.png', text: PRODUCT_TEXT.CURTAIN, parameter: PRODUCT_TEXT.CURTAIN }
                , { imgurl: '/images/product_combi.png', text: PRODUCT_TEXT.COMBI, parameter: PRODUCT_TEXT.COMBI }
                , { imgurl: '/images/product_wood.png', text: PRODUCT_TEXT.WOOD, parameter: PRODUCT_TEXT.WOOD }
                , { imgurl: '/images/product_roll.png', text: PRODUCT_TEXT.ROLL, parameter: PRODUCT_TEXT.ROLL }
                , { imgurl: '/images/product_honey.png', text: PRODUCT_TEXT.HONEY, parameter: PRODUCT_TEXT.HONEY }
                , { imgurl: '/images/product_triple.png', text: PRODUCT_TEXT.TRIPLE, parameter: PRODUCT_TEXT.TRIPLE }
                , { imgurl: '/images/product_verticul.png', text: PRODUCT_TEXT.VERTICUL, parameter: PRODUCT_TEXT.VERTICUL }
                , { imgurl: '/images/product_vene.png', text: PRODUCT_TEXT.VENE, parameter: PRODUCT_TEXT.VENE }
                , { imgurl: '/images/product_holding.png', text: PRODUCT_TEXT.HOLDING, parameter: PRODUCT_TEXT.HOLDING }]
                .map(({ imgurl = '', text = '', parameter = 'all', active = false }, index) => ({id: index, imgurl, text, parameter, active})),
        };
    }

    LeftClick() {
        if (this.itemcontext > 0) {
            this.containerRef.current.style.marginLeft = ((this.itemcontext - 1) * -100) + 'px';
            this.itemcontext = this.itemcontext - 1;
        }
    }

    RightClick() {
        if (this.itemcontext < this.state.items.length - 9) {
            this.containerRef.current.style.marginLeft = ((this.itemcontext + 1) * -100) + 'px';
            this.itemcontext = this.itemcontext + 1;
        }
    }

    MenuClick (index: number) {
        const copyItems = deepArrayCopy<FilterItem>(this.state.items);
        copyItems.forEach(item => item.active = false);
        copyItems[index] = { ...copyItems[index], active: true };

        this.setState({
            items: copyItems
        });

        const activeItem = this.getActiveItem(copyItems);
        this.props.getProductList({ tag: activeItem.parameter });
    }

    isStateChange(curDatas: Array<FilterItem>, nextDatas: Array<FilterItem>): boolean {
        return curDatas !== nextDatas;
    }

    getActiveItem(items: Array<FilterItem>): FilterItem{
        return items.filter(item => item.active === true)[0];
    }

    render() {

        return (
            <Div>
                <ButtonBox><Button onClick={() => this.LeftClick()}>{'<'}</Button></ButtonBox>
                <SelectContainer>
                    <ItemContainer ref={this.containerRef}>
                        {this.state.items?.map((item, index) => {
                            return (
                                <Item key={item.id}>
                                    <Itemimgbox className={item.active ? 'active' : ''}>
                                        <img src={item.imgurl} width={this.width} height={this.height} onClick={() => this.MenuClick(index)} />
                                        {item.active && <Itemselected>?????????</Itemselected>}
                                    </Itemimgbox>
                                    <Itemtext>
                                        {item.text}
                                    </Itemtext>
                                </Item>
                            );
                        })
                        }
                    </ItemContainer>
                </SelectContainer>
                <ButtonBox><Button onClick={() => this.RightClick()}>{'>'}</Button></ButtonBox>
            </Div>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    getProductList: ({ tag }: { tag: string }) => dispatch(new RequestProductListAction({ tag }).toJSON())
})

// ??????????????? ???????????? ?????? ??? ????????? connect ??? ???????????????.
// connect() ??? ?????????, ??????????????? props ??? ???????????? ????????? ???????????????.
// ????????? ????????? ????????? ?????? ??????????????? ???????????? ?????????.
export default connect(null, mapDispatchToProps)(Filter);
