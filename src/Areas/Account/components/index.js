import React, { Component } from 'react';
import Content from "../../Common/components/Content";
import Button from "../../Common/components/Button";
import * as Actions from "../actions/index";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class Account extends Component{
    componentWillMount(){
        this.props.initContent();
    }
    
    render(){
        return (<Content buttonGroup={Actions.buttonGroup()}/>);
    }
}
const mapDispatchToProps = (dispatch, getState) => {
    return bindActionCreators(Actions, dispatch);
};
export default connect(null, mapDispatchToProps)(Account);