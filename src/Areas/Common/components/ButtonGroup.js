import React, { Component } from 'react';
import {Link } from "react-router";
import Button from "./Button.js";

class ButtonGroup extends Component{
    render(){
        const { data} = this.props;
        if (data) {
            return (<div className="buttons">
                    {
                        data.map((b, index) => {
                            return (<Button key={index} text={b.text} href={b.href} onClick={b.onClick}/>);
                        })
                    }
                </div>);
        } else {
            return null;
        }        
    }
}

export default ButtonGroup;