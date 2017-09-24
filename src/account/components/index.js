import React, { Component } from 'react';
import {Layout, Form, FormInputItem, FormTreeItem, Table, Button, Pager, Tree, Modal, BaseListPage} from "../../common/component";
import * as Actions from "../actions/index.js";
import {bindActionCreators} from "redux";
import ApiHelper from "../../common/utils/ApiHelper";
import EventEmitter from "../../common/utils/MyEventEmitter.js";
import {connect} from "react-redux";
import css from "./index.less";
import ValidationState from "../../common/utils/ValidationState.js";
import AccountForm from "./AccountForm";

class AccountWidget extends BaseListPage{
    constructor(props) {
        super(props);
        this.handleRowDoubleClick = this.handleRowDoubleClick.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleTableSelectRow = this.handleTableSelectRow.bind(this);
        this.handleTableSelectAll = this.handleTableSelectAll.bind(this);
        this.handlePagerClicked = this.handlePagerClicked.bind(this);

        this.state = {
            selectedIds: [],
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

    handleRowDoubleClick(row, index) {
        ApiHelper.get(`/account/get?id=${row.id}`).then((response) => {
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

    handleTableSelectAll(e) {
        this.props.selectListItemAll(e.currentTarget.checked, this.props.accountDataList);
    }

    handleTableSelectRow(index, e) {
        e.stopPropagation();
        e.preventDefault();

        this.props.selectListItem(index, this.props.accountDataList);
    }

    handlePagerClicked(page, pageSize) {
        this.props.getAccountList(page, pageSize);
    }

    componentDidMount() {
        this.props.getAccountList();
        this.initActionButtons();
    }

    initActionButtons() {
        const {page, pageSize} = this.props;
        ApiHelper.get("/account/actionButtons").then((response) => {
            const actionButtons = response.data.map((button) => {
                if (button.id === "add") {
                    button.onClick = this.handleAddButtonClicked;
                } else if (button.ajaxAction) {
                    button.onClick = _.partial(this.handleAjaxButtonClicked,
                                               button.url,
                                               _.partial(this.props.getAccountList, page, pageSize));
                }
                return button;
            });
            this.setState({actionButtons});
        });
    }

    

    renderAccountList() {
        return this.getTableList();
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