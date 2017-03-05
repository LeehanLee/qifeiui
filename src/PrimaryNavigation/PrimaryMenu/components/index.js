import React, { Component } from 'react';
import { connect } from 'react-redux';
import PrimaryItem from '../../Common/components/PrimaryItem.js';
import {primaryMenuInitAction, secondaryMenuInitAction, MenuMap } from "../actions/index.js";

class PrimaryMenu extends Component {
    componentWillMount(){
        const { currentPrimaryPath } = this.props;    
        this.props.initPrimaryMenu(currentPrimaryPath);
    }
    render(){
        const { primaryMenuList, currentPrimaryPath } = this.props;    
        return (
            <div className="primary-menu-container fl">
                {
                    primaryMenuList.map((l, index) => {
                        return (<PrimaryItem key={index} index={index} text={l.text} href={l.href} isActive={currentPrimaryPath == l.href}
                                    handleClick={_.partial(this.props.initSecondaryMenu, l.href, primaryMenuList)}
                                />);
                    })
                }
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    let currentPrimaryPath = state.routeState.routes.length > 0 ? state.routeState.routes[0].path : "";
    currentPrimaryPath = _.trim(currentPrimaryPath, '/');
    return {
        primaryMenuList: state.primaryMenuList,
        currentPrimaryPath
    };
}

const initSecondaryMenuConst = (currentPrimaryPath, primaryMenuList, dispatch) => {
    const currentPrimaryindex = _.findIndex(primaryMenuList, p => p.href == currentPrimaryPath);
    const currentPrimaryMenu = primaryMenuList[currentPrimaryindex];
    let secondaryMenuList = null;
    if (currentPrimaryMenu.secondaryMenuList) {
        secondaryMenuList = currentPrimaryMenu.secondaryMenuList;
    } else {
        secondaryMenuList = MenuMap[currentPrimaryPath];
    }
    dispatch(secondaryMenuInitAction(currentPrimaryindex, secondaryMenuList));
}
const mapDispatchtoProps = (dispatch, ownProps) => {
    return {
        initPrimaryMenu: (currentPrimaryPath) => {
            const data = [
                {text: "系统管理", href: "admin"},
                {text: "资讯管理", href: "info"},
                {text: "产品管理", href: "product"},
                {text: "订单管理", href: "order"},
                {text: "库存管理", href: "stock"},
                {text: "呵呵管理", href: "hehe"}
            ];
            dispatch(primaryMenuInitAction(data));
            initSecondaryMenuConst(currentPrimaryPath, data, dispatch);
        },
        initSecondaryMenu: (currentPrimaryPath, primaryMenuList) => {
            initSecondaryMenuConst(currentPrimaryPath, primaryMenuList, dispatch);
        }
    };
}

export default connect(mapStatetoProps, mapDispatchtoProps)(PrimaryMenu);