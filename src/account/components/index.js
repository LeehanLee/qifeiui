import React, { Component } from 'react';
import {Layout, ListPage, BasePage} from "../../common/component";
import * as Actions from "../actions/index.js";
import {bindActionCreators} from "redux";
import ApiHelper from "../../common/utils/ApiHelper";
import EventEmitter from "../../common/utils/MyEventEmitter.js";
import {connect} from "react-redux";
import css from "./index.less";
import AccountForm from "./AccountForm";

class AccountWidget extends BasePage{
    constructor(props) {
        super(props);
        this.getAccountList = this.getAccountList.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleAddButtonClicked = this.handleAddButtonClicked.bind(this);
        this.handleRowDoubleClick = this.handleRowDoubleClick.bind(this);
        this.getAccountAddForm = this.getAccountAddForm.bind(this);

        this.state = {
            formData: this.getInitFormData(),
            formAction: "/account/add",
            formMessage: null,
            formHasError: false
        }

    }
    
    getInitFormData() {
        return {
            name: "",
            password: "",
            mobile: "",
            available: false
        };
    }

    handleFormSubmit(e) {
        ApiHelper.post(this.state.formAction, this.state.formData).then((result) => {
            const success = result.data.success;
            if (result.data.success) {
                const {page, pageSize} = this.props;
                this.props.getAccountList(page, pageSize);
                this.setState({
                    formData: this.getInitFormData(),
                    formAction: "/account/add"
                });
            }
            
            EventEmitter.emit("ShowMessageBar", result.data.message, success);
        }).catch((err) => {
            EventEmitter.emit("ShowMessageBar", err.response.data.message, false);
        });
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

    handleRowDoubleClick(id, index) {
        ApiHelper.get(`/account/get?id=${id}`).then((response) => {
            const formData = response.data;
            const state = this.state;
            const newstate = _.assign({}, state, {
                formData,
                formAction: "/account/edit",
                formMessage: ""
            });
            this.setState(newstate);

            EventEmitter.emit("ShowFixedRight");
        });
    }

    componentDidMount() {
        this.getAccountList();
        this.initActionButtons();
    }

    getAccountList(page, pageSize) {
        this.props.getAccountList(page, pageSize);
    }

    initActionButtons() {
        const {page, pageSize} = this.props;
        ApiHelper.get("/account/actionButtons").then((response) => {
            const actionButtons = response.data;
            this.setState({actionButtons});
        });
    }

    renderAccountList() {
        return <ListPage titleList={this.props.accountTitleList} dataList={this.props.accountDataList} page={this.props.page}
                    pageSize={this.props.pageSize} totalCount={this.props.totalCount} getList={this.props.getAccountList}
                    onRowDoubleClick={this.handleRowDoubleClick} actionButtons={this.state.actionButtons}/>;
    }

    getAccountAddForm() {
        const {formAction, formData} = this.state;

        return (<AccountForm formAction={formAction} formData={formData} onFormSubmit={this.handleFormSubmit}
                    handleFormChange={this.handleFormChange} onFormTreeItemChange={this.handleFormTreeItemChange} />);
    }

    render(){
        return (<Layout 
            fixedRightWidget={this.getAccountAddForm()}
            rightWidget={this.renderAccountList()}
        />);
    }
}

const mapStatesToProps = (state) => {
    return {
        accountTitleList: state.accountData.accountTitleList,
        accountDataList: state.accountData.accountDataList,
        totalCount: state.accountData.totalCount,
        page: state.accountData.page,
        pageSize: state.accountData.pageSize
    };
};

const mapDispatchToProps = (dispatch, getState) => {
    return bindActionCreators(Actions, dispatch);
};

export default connect(mapStatesToProps, mapDispatchToProps)(AccountWidget);