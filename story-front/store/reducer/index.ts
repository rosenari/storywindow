import { combineReducers } from 'redux';
import ReducerAction from '../action/reducerAction';

// 모듈의 초기 상태를 정의합니다.
const initialState = {};

// 리듀서를 만들어서 내보내줍니다.
function reducer(state = initialState, action: ReducerAction) {
    const result = action.updateState?.(state) || { ...state };
    return result;
}

const rootReducer = combineReducers({
    reducer
})

export default rootReducer;
