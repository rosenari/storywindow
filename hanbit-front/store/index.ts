import { compose, createStore, Store, applyMiddleware } from "redux";
import rootReducer, { rootSaga } from "./reducers";
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from "next-redux-wrapper";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// store 생성
function configureStore(): Store {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware]; // 미들웨어들을 넣으면 된다.
    const composeEnhancers = typeof (window as any) !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    sagaMiddleware.run(rootSaga);

    return store;
}

const wrapper = createWrapper(configureStore, { debug: true });

export default wrapper;