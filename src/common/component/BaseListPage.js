import React, { Component } from 'react';
import BasePage from "./BasePage";
import EventEmitter from "../utils/MyEventEmitter";
import Table from "./Table";
import Pager from "./Pager";

class BaseListPage extends BasePage{
    constructor(props) {
        super(props);
        this.handleAddButtonClicked = this.handleAddButtonClicked.bind(this);

        // this.handleRowDoubleClick = this.handleRowDoubleClick.bind(this);
        this.handleTableSelectAll = this.handleTableSelectAll.bind(this);
        this.handleTableRowClicked = this.handleTableRowClicked.bind(this);
        this.handlePagerClicked = this.handlePagerClicked.bind(this);
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

    // handleRowDoubleClick(id, index) {
    //     ApiHelper.get(`/account/get?id=${id}`).then((response) => {
    //         const formData = response.data;
    //         const state = this.state;
    //         const newstate = _.assign({}, state, {
    //             formData,
    //             formAction: "/account/edit",
    //             formMessage: ""
    //         });
    //         this.setState(newstate);

    //         EventEmitter.emit("ShowFixedRight");
    //     });
    // }

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
        this.getAccountList(page, pageSize);
    }

    getTableList() {
        if (_.isEmpty(this.props.accountTitleList) || _.isEmpty(this.props.accountDataList)) {
            return null;
        }
        return (<div className="list-container">
                    {this.getActionButtons()}
                    <Table titles={this.props.accountTitleList} rows={this.props.accountDataList}
                        handleRowDoubleClick={this.handleRowDoubleClick}
                        onSelecteAll={this.handleTableSelectAll}
                        onRowClicked={this.handleTableRowClicked}
                    />
                    <Pager ref="pager" page={this.props.page} pageSize={this.props.pageSize} totalCount={this.props.totalCount} onPagerClicked={this.handlePagerClicked}/>
                </div>);
    }
}

export default BaseListPage;