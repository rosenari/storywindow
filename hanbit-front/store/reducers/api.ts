import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function getRestApi(url: string) {
  return axios.get(url);
}

// 액션 타입을 정의해줍니다.
const LOADING = 'api/LOADING';
const GET = 'api/GET';
const GET_SUCCESS = 'api/GET_SUCCESS';
const GET_FAILURE = 'api/GET_FAILURE';

export interface ActionProps {
  type?: string;
  url?: string;
  payload?: string;
}

// 액션 생성 함수를 만듭니다.
// 이 함수들은 나중에 다른 파일에서 불러와야 하므로 내보내줍니다.
export const getApi = (url: string) => ({ type: GET, url });
export const loading = () => ({ type: LOADING });

function* getApiSaga(action: ActionProps) {
  try {
    console.log("getApiSaga")
    const response = yield call((getRestApi as any), action.url);
    console.log(response);
    yield put({ type: GET_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: GET_FAILURE, payload: e });
  }
}

// 모듈의 초기 상태를 정의합니다.
const initialState = {
  datas: "loading",
};

export function* getSaga() {
  yield takeEvery(GET, getApiSaga);
}

// 리듀서를 만들어서 내보내줍니다.
export default function reducer(state = initialState, action: ActionProps) {
  console.log(action);
  // 리듀서 함수에서는 액션의 타입에 따라 변화된 상태를 정의하여 반환합니다.
  // state = initialState 이렇게 하면 initialState 가 기본 값으로 사용됩니다.
  switch (action.type) {
    case LOADING:
      const loading = "loading";
      return { datas: loading };
    case GET_SUCCESS:
      const datas = action.payload;
      return { datas: datas };
    case GET_FAILURE:
      console.log(action);
      return state;
    default:
      return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
  }
}