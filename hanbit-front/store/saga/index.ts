import { all, takeLatest } from 'redux-saga/effects';
import SagaAction, { SagaActionTyeps } from '../action/sagaAction';

function createGetSaga(actionType: string){
    return function * getSaga(){
        yield takeLatest(actionType, function * (action: SagaAction) {
              yield action.sagaHandler();
        });
    }
}

const sagaArray = Object.values(SagaActionTyeps).map(sagaAction => {
  return createGetSaga(sagaAction);
});

export default function* rootSaga() {
  yield all(sagaArray.map(getSaga => getSaga()));
}