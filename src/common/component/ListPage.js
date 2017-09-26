import React, { Component } from 'react';
import EventEmitter from "../utils/MyEventEmitter";
import Table from "./Table";
import Pager from "./Pager";
import Button from "./Button";
import ApiHelper from "..//utils/ApiHelper";

class ListPage extends Component{
    constructor(props) {
        super(props);
        this.handleRowDoubleClick = this.handleRowDoubleClick.bind(this);
        this.handleTableSelectAll = this.handleTableSelectAll.bind(this);
        this.handleTableRowClicked = this.handleTableRowClicked.bind(this);
        this.handlePagerClicked = this.handlePagerClicked.bind(this);
        this.handleAjaxButtonClicked = this.handleAjaxButtonClicked.bind(this);
        this.handleAjaxActionCallback = this.handleAjaxActionCallback.bind(this);
        this.initSelectedIds = this.initSelectedIds.bind(this);

        this.state = {
            selectedIds: this.initSelectedIds(props)
        }
    }

    initSelectedIds(props) {
        const result = [];
        this.props.dataList.forEach((r) => {
            if (r.checked === true) {
                result.push(r.id);
            }
        });
        return result;
    }

    handleRowDoubleClick(id, index) {
        if (this.props.onRowDoubleClick) {
            this.props.onRowDoubleClick(id, index);    
        }
    }

    handleTableSelectAll(selectedIds) {
        this.setState({selectedIds});
    }

    handleTableRowClicked(id, checked) {
        const selectedIds = [...this.state.selectedIds];
        if (checked) {
            selectedIds.push(id);
        } else {
            _.remove(selectedIds, (selectedId) => {return selectedId === id});
        }
        this.setState({selectedIds});
    }

    handlePagerClicked(page, pageSize) {
        this.props.getList(page, pageSize);
    }

    handleAjaxButtonClicked(url, callback) {
        const ids = this.state.selectedIds.join(",");
        if (_.isEmpty(ids)) {
            EventEmitter.emit("ShowMessageBar", "请先选择用户", false);
        } else {
            return ApiHelper.post(url, {ids}).then(this.handleAjaxActionCallback);
        }
    }

    handleAjaxActionCallback(response) {
        EventEmitter.emit("ShowMessageBar", response.data.message, response.data.success);
        if (response.data.success) {
            this.props.getList();
        }  
    }

    renderActionButtons() {
        if (!this.props.actionButtons) {
            return null;
        }
        return (<div className="action-btns">
            {
                this.props.actionButtons.map((button) => {
                    switch(button.id) {
                        case "add":
                            return <Button key={button.id} onClick={this.props.onAddButtonClicked} data-text={button.text}/>;
                        default:
                            return <Button key={button.id} onClick={_.partial(this.handleAjaxButtonClicked, button.url)} data-text={button.text}/>;
                    }
                })
            }
        </div>);
    }

    render() {
        if (_.isEmpty(this.props.titleList) || _.isEmpty(this.props.dataList)) {
            return null;
        }
        return (<div className="list-container">
                    {this.renderActionButtons()}
                    <Table colWidth={this.props.colWidth} titles={this.props.titleList} rows={this.props.dataList}
                        handleRowDoubleClick={this.handleRowDoubleClick}
                        onSelecteAll={this.handleTableSelectAll}
                        onRowClicked={this.handleTableRowClicked}
                    />
                    <Pager ref="pager" page={this.props.page} pageSize={this.props.pageSize} totalCount={this.props.totalCount} onPagerClicked={this.handlePagerClicked}/>
                </div>);
    }
}

export default ListPage;