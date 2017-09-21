import { Router, Route, hashHistory, Link } from 'react-router';
import React, { Component } from 'react';
import AccountWidget from "../account/components/index";
import DepartmentWidget from "../department/components/index";
import _ from "lodash";
import { connect } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import rootReducer from './rootReducer.js';

class App extends Component{
    constructor (props) {
        super(props)
    }

    render(){
        const loggerMiddleware = createLogger();
        const reducer = combineReducers({
            ...rootReducer,
            routing: routerReducer
        });
        
        const store = createStore(
            reducer,
            applyMiddleware(
                thunkMiddleware, // lets us dispatch() functions
                loggerMiddleware // neat middleware that logs actions
            )
        )
        const history = syncHistoryWithStore(hashHistory, store);
        return (<Provider store={store}>
            <div>
                <Router history={history}>
                    <Route path="/account" component={AccountWidget} />
                    <Route path="/department" component={DepartmentWidget} />
                </Router>
            </div>
        </Provider>    
        );
    }
}
export default App;