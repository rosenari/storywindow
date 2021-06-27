import { combineReducers } from 'redux';
import api, { getSaga, getSaga2, getSmsSaga } from './api'
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
    api,
})

export function* rootSaga() {
    yield all([getSaga(), getSaga2(), getSmsSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;