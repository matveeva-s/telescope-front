import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { userReducer } from './reducers/userReducer';
import { telescopeReducer } from "./reducers/telescopeReducer";
import { tasksReducer } from "./reducers/taskReducer";
import { balanceReducer } from "./reducers/balanceReducer";

const reducer = combineReducers({
    userReducer,
    telescopeReducer,
    tasksReducer,
    balanceReducer,
});

export default function configureStore(initialState = {}) {
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

