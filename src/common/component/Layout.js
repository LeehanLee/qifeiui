
import React, { Component } from 'react';
import EventEmitter from "../utils/MyEventEmitter";
import MessageBar from "./MessageBar";
import SecondaryNavigation from "../../secondarynavigation/components/index";
import logoImg from "../../../images/logo.png";

class Layout extends Component{
    constructor(props) {
        super(props);
        this.handleCloseBtnClick = this.handleCloseBtnClick.bind(this);
        this.handleShowFixedRight = this.handleShowFixedRight.bind(this);
        this.state = {
            showFixedRight: false
        }
    }

    componentDidMount() {
        EventEmitter.on("ShowFixedRight", this.handleShowFixedRight);
    }

    handleShowFixedRight() {
        this.setState({showFixedRight: true});
    }

    handleCloseBtnClick() {
        this.setState({showFixedRight: false});
    }

    getFixedRight() {
        let classname = "fixed-right";
        if (!this.props.fixedRightWidget || !this.state.showFixedRight) {
            classname = `${classname} hide-fixed-right`;
        }
        return (<div className={classname}>
                {this.props.fixedRightWidget}
                <span className="close-fixed-right close-btn" onClick={this.handleCloseBtnClick}></span>
            </div>);
    }

    getRightClass() {
        let classname = "right";
        if (this.props.fixedRightWidget && this.state.showFixedRight) {
            classname = `${classname} short`;
        }
        return classname;
    }

    render(){
        return (<div className="layout">
            <div className="top">{this.props.topWidget || "this is just top"}</div>
            <div className="logo-widget">
                <div className="logo">
                    <img src={logoImg}/>
                    <div className="logo-text">this is a logo</div>
                </div>
            </div>
            <div className="main" >
                <div className="left"><SecondaryNavigation /></div>
                <div className={this.getRightClass()}>{this.props.rightWidget}</div>
            </div>
            {this.getFixedRight()}
            <MessageBar />
        </div>);
    }
}

export default Layout;