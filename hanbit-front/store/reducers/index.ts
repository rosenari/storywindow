import { combineReducers } from 'redux';
import api, { getSaga, getSaga2 } from './api'
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
    api,
})

export function* rootSaga() {
    yield all([getSaga(), getSaga2()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;