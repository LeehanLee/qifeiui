import React, { Component } from 'react';
import BasePage from "./BasePage";
import EventEmitter from "../utils/MyEventEmitter";

class BaseListPage extends BasePage{
    constructor(props) {
        super(props);
        this.handleAddButtonClicked = this.handleAddButtonClicked.bind(this);
    }

    handleAddButtonClicked() {
        this.setState({
            formData: this.getInitFormData(),
            formAction: "/account/add",
            formMessage: null,
            formHasError: false
        });
        EventEmitter.emit("ShowFixedRight");
    }
}

export default BaseListPage;