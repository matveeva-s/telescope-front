// import React from 'react';
// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { apiMiddleware } from 'redux-api-middleware';
// import { userReducer } from './reducers/userReducer';
//
// const reducer = combineReducers(userReducer);
// const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
//
// export default function configureStore(initialState) {
//   return createStoreWithMiddleware(reducer, initialState);
// }
//
//
// // export const store = createStore(userReducer);

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { userReducer } from './reducers/userReducer';


const reducer = combineReducers({
    userReducer
});

export default function configureStore(initialState = {}) {
  // const middlewares = [thunkMiddleware, apiMiddleware];
  const middlewares = [thunkMiddleware, apiMiddleware];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development') {
    if ('__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' in window) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
}

