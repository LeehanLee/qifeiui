
import React, { Component } from 'react';
import Button from "./Button";
import EventEmitter from "../utils/MyEventEmitter.js";

let timer = null;
const defaultStyle = {
    top: "12px",
    left: 0,
    right: 0
};

class MessageBar extends Component{
    constructor(props) {
        super(props);
        this.handleHideMessageBar = this.handleHideMessageBar.bind(this);
        this.state = {
            message: null,
            show: false,
            isInfo: true,
            style: defaultStyle
        }
    }

    componentDidMount() {
        EventEmitter.on("ShowMessageBar", (message, isInfo, style = defaultStyle) => {
            this.setState({
                message,
                show: true,
                isInfo,
                style
            });
            clearTimeout(timer); //每次触发要显示它的时候先清除一下之前的定时器，因为因为现在正好要设定时器，之前那个不希望它生效了
            timer = setTimeout(this.handleHideMessageBar, 3000);
        });
    }
    handleHideMessageBar() {
        this.setState({show: false, message: null, isInfo: true});
    }

    getMessageClass() {
        let s = this.state.isInfo ? "message-bar-container info" : "message-bar-container error";
        s = this.state.show ? s : `${s} hide-message-bar`;
        return s;
    }
    render(){
        return (<div style={this.state.style} className={this.getMessageClass()}>
            {this.state.message}
            <span className="close-message-bar close-btn" onClick={this.handleHideMessageBar}></span>
        </div>);
    }
}

export default MessageBar;