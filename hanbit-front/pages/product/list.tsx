import React from 'react';
import styled from 'styled-components';
import { Label, PFilter, PContents } from '../../components';
import { NextPage } from 'next';
import { Context } from 'vm';
import { connect } from 'react-redux';
import { RequestProductListAction } from '../../store/action/sagaAction';

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

export default List;