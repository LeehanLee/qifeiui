import React, { Component } from 'react';
import BasePage from "./BasePage";
import EventEmitter from "../utils/MyEventEmitter";
import Table from "./Table";
import Pager from "./Pager";

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

    getTableList() {
        if (_.isEmpty(this.props.accountTitleList) || _.isEmpty(this.props.accountDataList)) {
            return null;
        }
        return (<div className="list-container">
                    {this.getActionButtons()}
                    <Table titles={this.props.accountTitleList} rows={this.props.accountDataList}
                        handleRowDoubleClick={this.handleRowDoubleClick}
                        handleSelectAll={this.handleTableSelectAll}
                        handleSelectRow={this.handleTableSelectRow}
                    />
                    <Pager ref="pager" page={this.props.page} pageSize={this.props.pageSize} totalCount={this.props.totalCount} onPagerClicked={this.handlePagerClicked}/>
                </div>);
    }
}

export default BaseListPage;