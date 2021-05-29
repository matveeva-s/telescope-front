import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Login } from "./components/LoginPage";
import configureStore from "./store";

import App from './App';

const store = configureStore();

const isAuthentificated = !!(localStorage.getItem("refresh_token") && localStorage.getItem("access_token"));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            { isAuthentificated ? <App/> : <Login/> }
        </Provider>,
    </React.StrictMode>,
    document.getElementById('root')
);
