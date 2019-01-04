import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './index.reducer';

const getMiddleware = () => {
    const middlewares = [reduxThunk];
    return applyMiddleware(...middlewares);
}

const getEnhancers = () => {
    const enhancers = [];
    return enhancers;
}

export default createStore(
    rootReducer,
    getMiddleware(),
    ...getEnhancers()
);