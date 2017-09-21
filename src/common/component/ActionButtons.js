import React, { Component } from 'react';
import Button from "../../common/component/Button";

class ActionButtons extends Component{
    constructor(props) {
        super(props);
        this.renderActionButtons = this.renderActionButtons.bind(this);
        // this.initActionButtons = this.initActionButtons.bind(this);
        // this.setActionButtons = this.setActionButtons.bind(this);
    }

    // componentDidMount() {
    //     if (this.props.actionButtonsUrl) {
    //         this.initActionButtons(this.props.actionButtonsUrl);
    //     }
    // }

    // initActionButtons(actionButtonsUrl) {
    //     ApiHelper.get(actionButtonsUrl).then(this.setActionButtons);
    // }
    
    // setActionButtons(response) {
    //     this.setState({actionButtons: response.data});
    // }

    renderActionButtons() {
        return this.props.actionButtons.map((button) => {
            return <Button key={button.id} onClick={button.onClick} data-text={button.text}/>;
        });
    }

    render() {
        if (!this.props.actionButtons) {
            return null;
        }
        return (<div className="action-btns">
            {this.renderActionButtons()}
        </div>);
    }
}

export default ActionButtons;