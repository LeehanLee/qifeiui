
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
        this.toggleLeft = this.toggleLeft.bind(this);
        this.state = {
            showFixedRight: false,
            minLeft: false
        }
    }

    componentDidMount() {
        EventEmitter.on("ShowFixedRight", this.handleShowFixedRight);
    }

    componentWillUnmount() {
        EventEmitter.removeListener("ShowFixedRight", this.handleShowFixedRight);
    }

    handleShowFixedRight() {
        if (!this.state.showFixedRight) {
            this.setState({showFixedRight: true});
        }
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
        if (this.state.minLeft) {
            classname = `${classname} with-min-left`;
        }
        return classname;
    }

    getLeftClass() {
        let classname = "left";
        if (this.state.minLeft) {
            classname = `${classname} min-left`;
        }
        return classname;
    }

    toggleLeft() {
        this.setState({minLeft: !this.state.minLeft});
    }

    getToggleLeftText() {
        if (this.state.minLeft) {
            return ">>";
        } else {
            return "<<";
        }
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
                <div className={this.getLeftClass()}>
                    <SecondaryNavigation />
                    <div className="toggle-left" onClick={this.toggleLeft}>{this.getToggleLeftText()}</div>
                </div>
                <div className={this.getRightClass()}>{this.props.rightWidget}</div>
            </div>
            {this.getFixedRight()}
            <MessageBar />
        </div>);
    }
}

export default Layout;