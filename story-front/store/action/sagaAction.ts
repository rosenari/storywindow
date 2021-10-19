import Action from './index';
import { put } from 'redux-saga/effects'
import { ResponseMoreProductListAction, ResponseProductListAction } from './reducerAction';
import axios, { AxiosResponse } from 'axios';

export default interface SagaAction extends Action{
    type: string;
    sagaHandler(): any;
}

abstract class SagaActionImpl implements SagaAction {
    public type: string;

    constructor(type: string){
        this.type = type;
    }

    public abstract sagaHandler(): any;
    
    public toJSON() {
        return { type: this.type, sagaHandler: () => { return this.sagaHandler() } };
    }
}

const loadingData = {
    loading: true,
    done: false
}

const failureData = {
    loading: false,
    done: false
}

interface RequestProductListActionParameterType {
    startIndex?: number;
    tag?: string;
}

export const SagaActionTyeps = {
    GET_PRODUCTLIST : 'product/GET_LIST',
    GET_MOREPRODUCTLIST: 'prodcut/GET_MORELIST',
    POST_SMS: 'sms/POST'
}

export class RequestProductListAction extends SagaActionImpl {
    private startIndex: number;
    private tag: string;

    constructor({ startIndex = 0, tag = 'all' }: RequestProductListActionParameterType = {}) {
        super(SagaActionTyeps.GET_PRODUCTLIST);
        this.startIndex = startIndex;
        this.tag = tag;
    }

    public * sagaHandler() {
        try {
            yield put(new ResponseProductListAction(loadingData).toJSON());
            const response: AxiosResponse = yield axios.get(`https://${process.env.API_HOST}/api/getProducts/${this.startIndex}/${this.tag}/date`);
            const productListData = {
                loading: false,
                done: true,
                ...response.data,
                tag: this.tag
            }
            yield put(new ResponseProductListAction(productListData).toJSON());
        } catch (e) {
            yield put(new ResponseProductListAction(failureData).toJSON());
        }
    }
}

interface RequestMoreProductListActionParameterType extends RequestProductListActionParameterType {}

export class RequestMoreProductListAction extends SagaActionImpl {
    private startIndex: number;
    private tag: string;

    constructor({ startIndex = 0, tag = 'all' }: RequestMoreProductListActionParameterType = {}) {
        super(SagaActionTyeps.GET_MOREPRODUCTLIST);
        this.startIndex = startIndex;
        this.tag = tag;
    }

    public * sagaHandler() {
        try {
            yield put(new ResponseMoreProductListAction(loadingData).toJSON());
            const response: AxiosResponse = yield axios.get(`https://${process.env.API_HOST}/api/getProducts/${this.startIndex}/${this.tag}/date`);
            const productListData = {
                loading: false,
                done: true,
                ...response.data,
                tag: this.tag
            }
            yield put(new ResponseMoreProductListAction(productListData).toJSON());
        } catch (e) {
            yield put(new ResponseMoreProductListAction(failureData).toJSON());
        }
    }
}

interface RequestSmsActionParameterType {
    phonenumber?: string;
    successHandler?: () => void;
    failHandler?: () => void;
}

export class RequestSmsAction extends SagaActionImpl {
    private phonenumber: string;
    private successHandler: () => void;
    private failHandler: () => void;

    constructor({ phonenumber = '', successHandler = () => {}, failHandler = () => {} }: RequestSmsActionParameterType = {}) {
        super(SagaActionTyeps.POST_SMS);
        this.phonenumber = phonenumber;
        this.successHandler = successHandler;
        this.failHandler = failHandler;
    }

    public * sagaHandler() {
        try {
            const response: AxiosResponse = yield axios.post(`https://${process.env.API_HOST}/api/sms`, { phonenumber: this.phonenumber });
            if(response.data?.result === "success"){
                this.successHandler();
            }else{
                this.failHandler();
            }

        } catch (e) {
            console.log(e);
        }
    }
}