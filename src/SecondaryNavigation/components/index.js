import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from "lodash";
import {secondaryMenuInitAction } from "../actions/index.js";

class SecondaryNavigation extends Component {
    render(){
        const { secondaryMenuList, currentPrimaryPath, currentSecondaryPath } = this.props;
        if (secondaryMenuList) {
            return (
                <div className="secondary-menu-container">
                    {
                        secondaryMenuList.map((l, index) => {
                            const className = !_.isEmpty(currentSecondaryPath) && l.href == currentSecondaryPath ? "item active" : "item";
                            if (l.href) {
                                return (<a className={className} key={index} href={`#/${currentPrimaryPath}/${l.href}`}>{l.text}</a>);
                            } else {
                                return (<a className={className} key={index}>{l.text}</a>);
                            }
                        })
                    }
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStatetoProps = (state) => {
    let currentPrimaryPath = state.routeState.routes.length > 0 ? state.routeState.routes[0].path : "";
    currentPrimaryPath = _.trim(currentPrimaryPath, '/');
    let currentSecondaryPath = state.routeState.routes.length > 1 ? state.routeState.routes[1].path : "";
    currentSecondaryPath = _.trim(currentSecondaryPath, '/');
    const activePrimaryMenu = _.find(state.primaryMenuList, p => p.href == currentPrimaryPath);
    return {
        secondaryMenuList: state.secondaryMenuList,
        currentPrimaryPath,
        currentSecondaryPath
    };
};

export default connect(mapStatetoProps)(SecondaryNavigation);