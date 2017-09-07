
import React, { Component } from 'react';
import Button from "./Button";

class Form extends Component{
    
    render(){
        return (<form className="form-widget" method={this.props.method} action={this.props.action} onSubmit={this.props.handleFormSubmit}>
            <div className="property-wrapper">
                {this.props.children}
            </div>
            <div className="submit-wrapper">
                <Button type="submit" data-text="保存"/>
            </div>
        </form>);
    }
}

export default Form;