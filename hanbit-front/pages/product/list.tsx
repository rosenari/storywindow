import React from "react";
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as apiActions from '../../store/reducers/api';
import { Label, PFilter, PContents } from '../../components';
import { NextPage } from 'next';
import { Context } from "vm";

const Div = styled.div`
    position:relative;
    margin:0 auto;
    width:1124px;
`;

const List: NextPage = () => {

    return (
        <Div>
            <Label position="파트너 시공모음" sub_position="" />
            <PFilter />
            <PContents />
        </Div>
    )
}

List.getInitialProps = async (ctx: Context) => {
    console.log("List getInitial prop")
    console.log(ctx.store);
    await ctx.store.dispatch(apiActions.loading());
    return {
        props: {}
    }
};

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch: any) => ({
    loading: () => dispatch(apiActions.loading())
})

export default connect(undefined, mapDispatchToProps)(List);