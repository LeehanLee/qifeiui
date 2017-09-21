
import React, { Component } from 'react';
import Button from "./Button";

class Modal extends Component{
    constructor(props) {
        super(props);
        this.handleYesClicked = this.handleYesClicked.bind(this);
        this.handleNoClicked = this.handleNoClicked.bind(this);

    }

    handleYesClicked(e) {
        e.stopPropagation();
        e.preventDefault();

        if (this.props.onYesClick) {
            this.props.onYesClick(e);
        }
    }

    handleNoClicked(e) {
        e.stopPropagation();
        e.preventDefault();

        if (this.props.onNoClick) {
            this.props.onNoClick(e);
        }
    }
    
    render(){
        const wrapperClassname = "modal-wrapper";
        const maskClassname = "modal-mask";
        const widgetClassname = "modal-widget big";
        return (<div className={wrapperClassname}>
            <div onClick={this.handleNoClicked} className={maskClassname}></div>
            <div ref="modal" className={widgetClassname}>
                <div className="modal-title">
                    <div className="modal-title-text">{this.props.title}</div>
                    <span onClick={this.handleNoClicked} className="close-modal close-btn"></span>
                </div>
                <div className="modal-body">{this.props.body}</div>
                <div className="modal-footer">
                    <Button onClick={this.handleYesClicked} data-text="确认"/>
                    <Button onClick={this.handleNoClicked} data-text="取消"/>
                </div>
            </div>
        </div>);
    }
}

Modal.propTypes = {
    title: React.PropTypes.string,
    onNoClick: React.PropTypes.func,
    onYesClick: React.PropTypes.func,
};

export default Modal;