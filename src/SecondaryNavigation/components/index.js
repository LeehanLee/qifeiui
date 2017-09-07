import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import css from "./index.less";

const items = [
    {name: "account", url: "/account"},
    {name: "department", url: "/department"},
];

class SecondaryNavigation extends Component{
    constructor(props) {
        super(props);
    }

    getItemLink(item, path) {
        const classname = path === item.url ? "item current" : "item";
        return (<a key={item.name} className={classname} href={`/#${item.url}`}>{item.name}</a>);
    }
    render(){
        const path = this.props.routing.locationBeforeTransitions.pathname;
        return (<div className="secondary-navigation-widget">
            {
                items.map((item) => {
                    return this.getItemLink(item, path);
                })
            }
        </div>);
    }
}
const mapStatesToProps = (state) => {
    return {
        routing: state.routing
    };
};
// const mapDispatchToProps = (dispatch, getState) => {
//     return bindActionCreators(Actions, dispatch);
// };

export default connect(mapStatesToProps)(SecondaryNavigation);