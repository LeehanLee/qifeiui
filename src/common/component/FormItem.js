import React, { Component } from 'react';
import * as Validation from "../utils/Validation";
import EventEmitter from "../utils/MyEventEmitter";

class FormItem extends Component{
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);

        this.state = {
            validationMessage: null
        };
    }

    validate() {
        const value = this.refs.inputBox.value;
        let validationMessage = null;
        if (!_.isEmpty(this.props.validate)) {
            this.props.validate.forEach((v) => {
                switch(typeof(v)) {
                    case "string":
                        validationMessage = Validation[v](this.props.title, value);
                    break;
                    case "object":
                        validationMessage = Validation[v.func](this.props.title, value, v);
                    break;
                }
                this.props.validationState.validateMessage.push(validationMessage);                
            });
            this.setState({validationMessage});
        }
    }

    getValidationMessage() {
        if (!_.isEmpty(this.state.validationMessage)) {
            return <span className="validation-message">{this.state.validationMessage}</span>;
        }
        return null;
    }

    render(){
        const props = _.assign({}, this.props);
        delete props.validationState;
        delete props.validate;
        delete props.onChange;
        delete props.className;
        return (<div className="form-item">
            <label className="form-item-title" htmlFor={props.id}>{props.title}：</label>
            {this.renderValueWidget(props)}
            {this.getValidationMessage()}
        </div>);
    }
}

export default FormItem;