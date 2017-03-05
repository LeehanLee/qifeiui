import React, { Component } from 'react';
import {Link } from "react-router";

class Button extends Component{
    render(){
        const { text, href, onClick} = this.props;
        if (href) {
            return (<Link className="button" to={href}>{text}</Link>);
        } else {
            return (<a className="button" onClick={onClick}>{text}</a>);
        }
    }
}

export default Button;