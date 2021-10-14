import React from 'react';
import styled from 'styled-components';
import { Label, PFilter, PContents } from '../../components';
import { NextPage } from 'next';
import { Context } from 'vm';
import { RequestProductListAction } from '../../store/action/sagaAction';
import { waitAndGetState } from '../../util';
import { ProductListData } from '../../store/action/reducerAction';

const Div = styled.div`
    position:relative;
    margin:0 auto;
    width:1124px;
`;

interface ListProps{
    productListData: ProductListData
}

const List: NextPage<ListProps> = ({ productListData }) => {

    return (
        <Div>
            <Label position="파트너 시공모음" sub_position="" />
            <PFilter />
            <PContents productListData={productListData} />
        </Div>
    )
}

List.getInitialProps = async (ctx: Context) => {

	ctx.store.dispatch(new RequestProductListAction().toJSON());
	const state = await waitAndGetState(ctx.store) as { reducer: { productListData: ProductListData }};

	return {
		productListData: state.reducer.productListData
	}

}

export default List;