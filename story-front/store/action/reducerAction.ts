import Action from './index';

export default interface ReducerAction extends Action{
    updateState(state:{}): {}
}

export abstract class ReducerActionImpl<T> implements ReducerAction {
    protected type: string;
    protected data: T;

    constructor(type: string, data: T){
        this.type = type;
        this.data = data;
    }

    public abstract updateState(state:{}): {}

    public toJSON() { 
        return {
            type: this.type,
            updateState: this.updateState.bind(this)
        }
    }
}

export interface Data {
    loading: boolean;
    done: boolean;
}

type Product = {
    id: number;
    imgurl: string;
    mainImgurl: string;
    tags: Array<string>;
    colors: Array<string>;
    like: number;
    views: number;
    date: string;
}

export interface ProductListData extends Data {
    result?: Array<Product>;
    allcount?: number;
    remain?: boolean;
    tag?: string;
}

export class ResponseProductListAction extends ReducerActionImpl<ProductListData> {
    constructor(data: ProductListData){
        super('RESPONSE_PRODUCTLIST', data);
    }

    public updateState(state: {}){
        return {
            ...state, productListData: this.data
        }
    }
}

export class ResponseMoreProductListAction extends ReducerActionImpl<ProductListData> {
    constructor(data: ProductListData){
        super('RESPONSE_MOREPRODUCTLIST', data);
    }

    public updateState(state: { productListData?: ProductListData }) {
        const prevProductListData = state.productListData?.result || [];
        return {
            ...state, productListData: {
                ...this.data,
                result: [ ...prevProductListData, ...this.data.result || []],
            }
        }
    }
}

interface Sms extends Data {
    result?: string;
}
export class ResponseSmsAction extends ReducerActionImpl<Sms> {
    constructor(data: Sms){
        super('RESPONSE_SMS', data);
    }

    public updateState(state: {}){
        return {
            ...state, sms: this.data
        }
    }
}