import React, { Component } from 'react';
import * as Validation from "../utils/Validation";
import EventEmitter from "../utils/MyEventEmitter";
import FormItem from "./FormItem";
import Checkbox from "./Checkbox";

class FormInputItem extends FormItem {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getInputClassName = this.getInputClassName.bind(this);
    }
    
    handleInputChange(e) {
        this.validate();
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    getInputClassName() {
        let classname = this.props.className;
        if (!_.isEmpty(this.state.validationMessage)) {
            return `${classname} has-error`;
        }
        return classname;
    }

    renderValueWidget(props) {
        switch(props.type) {
            case "checkbox":
                return (<Checkbox ref="inputBox" {...props} onChange={this.handleInputChange} className={this.getInputClassName()}/>);
            default:
                return (<input ref="inputBox" {...props} onBlur={this.handleInputChange} onChange={this.handleInputChange} className={this.getInputClassName()}/>);
        }
    }
}

export default FormInputItem;