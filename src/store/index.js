/*
 * src/store.js
 * With initialState
*/
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import rootReducer from '../reducers/rootReducer';
export default function configureStore(initialState = {}) {

    const middlewares = [];

    if (process.env.NODE_ENV === `development`) {
        const { logger } = require(`redux-logger`);

        middlewares.push(logger);
    }
    
    middlewares.push(promise(), thunk);
    
    return createStore(
        rootReducer,
        applyMiddleware(...middlewares)
    );
}