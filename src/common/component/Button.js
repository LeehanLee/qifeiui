import React, { Component } from 'react';
import css from "./Button.less";

class Button extends Component{
    
    render(){
        let className = "button";
        if (this.props.className) {
            className = `${className} ${this.props.className}`
        }
        const props = _.assign({}, this.props, {className});
        return (<button {...props}>{this.props[`data-text`]}</button>);
    }
}

export default Button;