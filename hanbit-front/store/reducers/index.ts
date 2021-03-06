import { combineReducers } from 'redux';
import api, { getSaga } from './api'
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
    api,
})

export function* rootSaga() {
    yield all([getSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;