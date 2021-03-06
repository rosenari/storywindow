import React from 'react';
import styled from 'styled-components';
import { Label, CFilter, CContents } from '../../components';
import { connect } from 'react-redux';
import * as apiActions from '../../store/reducers/api';
import { NextPage } from 'next';
import { Context } from 'vm';

const Div = styled.div`
    position:relative;
    margin:0 auto;
    width:1124px;
`;

const List: NextPage = () => {
    return (
        <Div>
            <Label position="시공모음" sub_position="" />
            <CFilter />
            <CContents />
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

const mapStateToProps = (state: any) => ({
    datas: state.api.datas
});

const mapDispatchToProps = (dispatch: any) => ({
    getApi: (url: string) => dispatch(apiActions.getApi(url)),
    loading: () => dispatch(apiActions.loading())

})
export default connect(mapStateToProps, mapDispatchToProps)(List);