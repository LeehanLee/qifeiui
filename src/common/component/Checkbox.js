import React, { Component } from 'react';
import css from "./Button.less";

class Checkbox extends Component{
    render(){
        const props = _.assign({}, this.props, {type: "checkbox"});
        let classname = this.props.checked ? "checkbox-icon checked" : "checkbox-icon unchecked";
        if (props.className) {
            classname = `${classname} ${props.className}`
        }
        return (<label className={classname}><input {...props}/></label>);
    }
}

export default Checkbox;