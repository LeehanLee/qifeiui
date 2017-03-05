import PrimaryNavigation from "../../PrimaryNavigation/index.js";
import Home from "../../Home/index.js";
import Layout from "../../Layout/index.js";
import { Router, Route, hashHistory } from 'react-router';
import React, { Component } from 'react';
import Account from "../../Areas/Account/components/index";
import Org from "../../Areas/Org/components/index";
import _ from "lodash";
import { enterRouterAction } from "../actions/app";
import { connect } from 'react-redux';

class App extends Component{
    constructor (props) {
        super(props)
        this.handleEnterRoute = this.handleEnterRoute.bind(this)
    }
    handleEnterRoute(nextState, replace) {
        this.props.dispatch(enterRouterAction(nextState));
    }
    render(){
        return (<Router history={hashHistory}>
                    <Route path="/" component={Home}/>
                    <Route path="admin" component={Layout} onEnter={this.handleEnterRoute}>
                        <Route path="account" component={Account} onEnter={this.handleEnterRoute}/>
                        <Route path="org" component={Org} onEnter={this.handleEnterRoute}/>
                        <Route path="role" component={Account} onEnter={this.handleEnterRoute}/>
                        <Route path="right" component={Account} onEnter={this.handleEnterRoute}/>
                        <Route path="category" component={Account} onEnter={this.handleEnterRoute}/>
                        <Route path="categorytype" component={Account} onEnter={this.handleEnterRoute}/>
                    </Route>
                    <Route path="/info" component={Layout} onEnter={this.handleEnterRoute}/>
                    <Route path="/product" component={Layout} onEnter={this.handleEnterRoute}/>
                    <Route path="/order" component={Layout} onEnter={this.handleEnterRoute}/>
                    <Route path="/stock" component={Layout} onEnter={this.handleEnterRoute}/>
                    <Route path="/hehe" component={Layout} onEnter={this.handleEnterRoute}/>
                </Router>);
    }
}
export default connect()(App);