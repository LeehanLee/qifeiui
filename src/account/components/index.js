import React, { Component } from 'react';
import Layout from "../../common/component/Layout.js";
import Form from "../../common/component/Form.js";
import FormInputItem from "../../common/component/FormInputItem";
import FormTreeItem from "../../common/component/FormTreeItem"
import Table from "../../common/component/Table.js";
import * as Actions from "../actions/index.js";
import {bindActionCreators} from "redux";
import ApiHelper from "../../common/utils/ApiHelper";
import EventEmitter from "../../common/utils/MyEventEmitter.js";
import {connect} from "react-redux";
import css from "./index.less";
import Button from "../../common/component/Button";
import Pager from "../../common/component/Pager";
import Tree from "../../common/component/Tree";
import Modal from "../../common/component/Modal";
import ValidationState from "../../common/utils/ValidationState.js";

const initFormData = {
    name: "",
    password: "",
    mobile: "",
    available: false
};

class AccountWidget extends Component{
    constructor(props) {
        super(props);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleRowDoubleClick = this.handleRowDoubleClick.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleTableSelectRow = this.handleTableSelectRow.bind(this);
        this.handleTableSelectAll = this.handleTableSelectAll.bind(this);
        this.handleButtonClicked = this.handleButtonClicked.bind(this);
        this.handleAddButtonClicked = this.handleAddButtonClicked.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handlePagerClicked = this.handlePagerClicked.bind(this);
        this.handleFormTreeItemChange = this.handleFormTreeItemChange.bind(this);

        this.state = {
            formData: initFormData,
            formAction: "/account/add",
            formMessage: null,
            formHasError: false
        }

        this.formValidationState = new ValidationState();
    }

    handleFormChange(key, e) {
        const formData = _.assign({}, this.state.formData);
        switch (e.currentTarget.type) {
            case "checkbox":
                formData[key] = e.currentTarget.checked;
                break;
            case "password":
            case "text":
                formData[key] = e.currentTarget.value;
                break;
            default:
                console.error(`not supported type '${e.currentTarget.type}'`);
                break;
        }
        this.setState({formData});
    }

    handleFormTreeItemChange(key, value) {
        const formData = _.assign({}, this.state.formData);
        formData[key] = value;        
        this.setState({formData});
    }

    handleFormSubmit(e) {
        this.validateForm();
        e.preventDefault(); //阻止form自动提交

        if (!_.isEmpty(_.compact(this.formValidationState.validateMessage))) {
            EventEmitter.emit("ShowMessageBar", "请修正表单错误", false);
        } else {
            ApiHelper.post(this.state.formAction, this.state.formData).then((result) => {
                const success = result.data.success;
                if (result.data.success) {
                    const {page, pageSize} = this.props;
                    this.props.getAccountList(page, pageSize);
                    this.setState({
                        formData: initFormData,
                        formAction: "/account/add"
                    });
                }
                
                EventEmitter.emit("ShowMessageBar", result.data.message, success);
            }).catch((err) => {
                EventEmitter.emit("ShowMessageBar", err.response.data.message, false);
            });
        }
    }

    handleButtonClicked(actionType) {
        const ids = this.props.accountDataList.filter(l => l.checked).map(l => {
            return l.id;
        });
        this.props.doActionForAccounts(ids.join(","), actionType);
    }

    handleRowDoubleClick(row, index) {
        const formData = row;
        const state = this.state;
        const newstate = _.assign({}, state, {
            formData,
            formAction: "/account/edit",
            formMessage: ""
        });
        this.setState(newstate);

        EventEmitter.emit("ShowFixedRight");
    }

    handleTableSelectAll(e) {
        this.props.selectListItemAll(e.currentTarget.checked, this.props.accountDataList);
    }

    handleTableSelectRow(index, e) {
        e.stopPropagation();
        e.preventDefault();

        this.props.selectListItem(index, this.props.accountDataList);
    }

    handleAddButtonClicked() {
        this.setState({
            formData: initFormData,
            formAction: "/account/add",
            formMessage: null,
            formHasError: false
        });
        EventEmitter.emit("ShowFixedRight");
    }

    handlePagerClicked(page, pageSize) {
        this.props.getAccountList(page, pageSize);
    }

    componentDidMount() {
        this.props.getAccountList();
    }

    getAccountList() {
        if (_.isEmpty(this.props.accountTitleList) || _.isEmpty(this.props.accountDataList)) {
            return null;
        }
        return (<div className="list-container">
                    <div className="action-btns">
                        <Button onClick={_.partial(this.handleAddButtonClicked)} data-text="新增"/>
                        <Button onClick={_.partial(this.handleButtonClicked, "delete")} data-text="删除"/>
                        <Button onClick={_.partial(this.handleButtonClicked, "avaliable")} data-text="启用"/>
                        <Button onClick={_.partial(this.handleButtonClicked, "unavaliable")} data-text="禁用"/>
                    </div>
                    <Table titles={this.props.accountTitleList} rows={this.props.accountDataList}
                        handleRowDoubleClick={this.handleRowDoubleClick}
                        handleSelectAll={this.handleTableSelectAll}
                        handleSelectRow={this.handleTableSelectRow}
                    />
                    <Pager ref="pager" page={this.props.page} pageSize={this.props.pageSize} totalCount={this.props.totalCount} onPagerClicked={this.handlePagerClicked}/>
                </div>);
    }

    getmessage() {
        if (this.state.formMessage) {
            const className = this.state.formHasError ? "message error" : "message";
            return <div className={className}>{this.state.formMessage}</div>;
        }
        return null;
    }

    validateForm() {
        this.formValidationState.validateMessage = [];
        this.refs.nameInput.validate();
        this.refs.passwordInput.validate();
        this.refs.mobileInput.validate();
    }
    getAccountAddForm() {
        const {formData} = this.state;

        return (<div className="form-container">
                    {this.getmessage()}
                    <Form method="post" action={this.state.formAction} handleFormSubmit={this.handleFormSubmit}>
                        <FormInputItem ref="nameInput" validationState={this.formValidationState} validate={["notEmpty"]}
                            title="用户名" type="text" name="name" id="name" value={formData.name} onChange={_.partial(this.handleFormChange, "name")}/>

                        <FormInputItem ref="passwordInput" validationState={this.formValidationState} validate={["notEmpty"]}
                            title="密码" name="password" id="password" type="text" value={formData.password} onChange={_.partial(this.handleFormChange, "password")}/>

                        <FormInputItem ref="mobileInput" validationState={this.formValidationState} validate={[{func: "maxLength", maxLength: 15}]}
                            title="手机号" type="text" name="mobile" id="mobile" value={formData.mobile} onChange={_.partial(this.handleFormChange, "mobile")}/>

                        <FormTreeItem title="部门" id="dep" name="dep" onChange={_.partial(this.handleFormTreeItemChange, "dep")}/>

                        <FormTreeItem title="角色" id="role" name="role" onChange={_.partial(this.handleFormTreeItemChange, "role")}/>

                        <FormInputItem title="启用"  id="available" name="available" type="checkbox" checked={formData.available} onClick={_.partial(this.handleFormChange, "available")}/>
                    </Form>
                </div>);
    }

    render(){
        return (<Layout 
            fixedRightWidget={this.getAccountAddForm()}
            rightWidget={this.getAccountList()}
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