import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import css from "./index.less";
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './App/components/app.js';
import rootReducer from './rootReducer.js';

const loggerMiddleware = createLogger();
let store = createStore(rootReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    ));
const root = document.getElementById('root');
render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);

