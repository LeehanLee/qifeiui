import React, { Component } from 'react';
import Button from "../../common/component/Button";
import EventEmitter from "../utils/MyEventEmitter";
import ActionButtons from "./ActionButtons";
import ApiHelper from "../utils/ApiHelper";

class BasePage extends Component{
    constructor(props) {
        super(props);
        this.handleAddButtonClicked = this.handleAddButtonClicked.bind(this);
        this.handleAjaxButtonClicked = this.handleAjaxButtonClicked.bind(this);
        this.handleFormTreeItemChange = this.handleFormTreeItemChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    // handleAjaxButtonClicked(actionType) {
    //     const ids = this.props.accountDataList.filter(l => l.checked).map(l => {
    //         return l.id;
    //     });
    //     this.props.doActionForAccounts(ids.join(","), actionType);
    // }

    handleAjaxButtonClicked(url, callback) {
        const ids = this.state.selectedIds.join(",");
        if (_.isEmpty(ids)) {
            EventEmitter.emit("ShowMessageBar", "请先选择用户", false);
        } else {
            return ApiHelper.post(url, {ids}).then(function (response) {
                EventEmitter.emit("ShowMessageBar", response.data.message, response.data.success);
                if (response.data.success && callback) {
                    callback();
                }            
            })
        }
    }

    getActionButtons() {
        return (<ActionButtons actionButtons={this.state.actionButtons} />);
        // return (<div className="action-btns">
        //     <Button onClick={_.partial(this.handleAddButtonClicked)} data-text="新增"/>
        //     <Button onClick={_.partial(this.handleAjaxButtonClicked, "delete")} data-text="删除"/>
        //     <Button onClick={_.partial(this.handleAjaxButtonClicked, "avaliable")} data-text="启用"/>
        //     <Button onClick={_.partial(this.handleAjaxButtonClicked, "unavaliable")} data-text="禁用"/>
        // </div>);
    }

    
    handleFormChange(e) {
        const key = e.target.name;
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

    handleFormTreeItemChange(treeItemObject) {
        const formData = _.assign({}, this.state.formData, treeItemObject);
        this.setState({formData});
    }
}

export default BasePage;