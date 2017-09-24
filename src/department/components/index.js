import React, { Component } from 'react';
import * as Actions from "../actions/index.js";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import css from "./index.less";
import {BaseTreePage, Layout, Tree, FormInputItem, Form, FormTreeItem} from "../../common/component";
import ValidationState from "../../common/utils/ValidationState.js";
import ApiHelper from "../../common/utils/ApiHelper";
import EventEmitter from "../../common/utils/MyEventEmitter.js";
import DepartmentForm from "./DepartmentForm";

const initFormData = {name: "", parentid: "", available: false};

class DepartmentWidget extends BaseTreePage{
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.setDepartmentForm = this.setDepartmentForm.bind(this);
        this.setDepartmentFormWithRemoteData = this.setDepartmentFormWithRemoteData.bind(this);
        this.initActionButtons = this.initActionButtons.bind(this);

        this.state = {
            formAction: "/department/add",
            formData: initFormData
        }

        this.child = {};
        this.actionButtonsUrl = "/department/actionButtons";
    }

    handleAddButtonClicked() {
        this.setState({
            formData: initFormData,
            formAction: "/department/add",
            formMessage: null,
            formHasError: false
        });
    }

    handleFormSubmit(e) {
        ApiHelper.post(this.state.formAction, this.state.formData).then((result) => {
            const success = result.data.success;
            if (result.data.success) {
                const {page, pageSize} = this.props;
                this.setState({
                    formData: initFormData,
                    formAction: "/department/add"
                });
                this.child.departmentTree.initTree("/department/tree", result.data.modifiedId);
            }
            
            EventEmitter.emit("ShowMessageBar", result.data.message, success);
        }).catch((err) => {
            EventEmitter.emit("ShowMessageBar", err.response.data.message, false);
        });
    }

    renderForm() {
        const {formAction, formData} = this.state;
        
        return (<DepartmentForm formAction={formAction} formData={formData} onFormTreeItemChange={this.handleFormTreeItemChange}
                    handleFormChange={this.handleFormChange} onFormSubmit={this.handleFormSubmit}/>);
    }

    setDepartmentFormWithRemoteData(response) {
        this.setState({formData: response.data, formAction: "/department/edit"});
    }

    setDepartmentForm(newnode, selectedIds) {
        if (newnode.selected) {
            const params = {id: newnode.id};
            this.setState({selectedIds: [...selectedIds]});
            ApiHelper.get(`/department/get`, {params}).then(this.setDepartmentFormWithRemoteData);
        } else {
            this.setState({formData: initFormData, formAction: "/department/add"});
        }
    }
    
    getDepartmentTreeWidget() {
        return (<div className="tree-container">
            {this.getActionButtons()}
            <div className="tree-and-form clearfix">
                <div className="span1 fl">
                    <div className="tree-area">
                        <Tree ref={(departmentTree) => {this.child.departmentTree = departmentTree;}} url="/department/tree"
                            onNodeClick={this.setDepartmentForm} selectMode="radio"/>
                    </div>
                </div>
                <div className="span3 fl">
                    {this.renderForm()}
                </div>
            </div>
        </div>);
    }

    componentDidMount() {
        this.initActionButtons();
    }

    initActionButtons() {
        ApiHelper.get("/department/actionButtons").then((response) => {
            const actionButtons = response.data.map((button) => {
                if (button.id === "add") {
                    button.onClick = this.handleAddButtonClicked;
                } else if (button.ajaxAction) {
                    button.onClick = _.partial(this.handleAjaxButtonClicked,
                                               button.url,
                                               _.partial(this.child.departmentTree.initTree, "/department/tree"));
                }
                return button;
            });
            this.setState({actionButtons});
        });
    }

    render(){
        return (<Layout 
            rightWidget={this.getDepartmentTreeWidget()}
        />);
    }
}
const mapStatesToProps = (state) => {
    return {
        departmentTreeData: state.departmentData.departmentTreeData
    };
};
const mapDispatchToProps = (dispatch, getState) => {
    return bindActionCreators(Actions, dispatch);
};

export default connect(mapStatesToProps, mapDispatchToProps)(DepartmentWidget);