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


export interface PopupData {
    visible?: boolean;
}

export interface ImageData {
    img_url?: string;
}

export interface PopupImageData extends PopupData, ImageData {}

export interface CollectPopupData {
    collect_popup?: PopupData;
}

export interface ImagePopupData {
    image_popup?: PopupImageData;
}


export class CollectPopupSetData extends ReducerActionImpl<PopupData> {
    constructor(data: PopupData){
        super('SET_COLLECT_POPUP', data);
    }

    public updateState(state: {}) {
        return {
            ...state, collect_popup: { ...this.data}
        }
    }
}

export class ImagePopupSetData extends ReducerActionImpl<PopupImageData> {
    constructor(data: PopupImageData){
        super('SET_IMAGE_POPUP', data);
    }

    public updateState(state: ImagePopupData) {
        return {
            ...state, image_popup: {...state?.image_popup, ...this.data }
        }
    }
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
