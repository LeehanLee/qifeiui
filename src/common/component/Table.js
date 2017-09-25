import React, { Component } from 'react';
import _ from "lodash";
import css from "./Table.less";
import {connect} from "react-redux";
import Checkbox from "./Checkbox";

class Table extends Component{
    constructor(props){
        super(props);

        this.initSelectedIds = this.initSelectedIds.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleRowClicked = this.handleRowClicked.bind(this);
        this.state = {
            selectedIds: this.initSelectedIds()
        };
    }

    initSelectedIds(props) {
        const result = [];
        this.props.rows.forEach((r) => {
            if (r.checked === true) {
                result.push(r.id);
            }
        });
        return result;
    }

    handleSelectAll(e) {
        const result = [];
        const checked = e.target.checked;
        
        if (checked) {
            this.props.rows.forEach((r) => {
                result.push(r.id);
            });
        }
        
        this.setState({selectedIds: result});
        if (this.props.onSelecteAll) {
            this.props.onSelecteAll(result, checked);
        }
    }

    handleRowClicked(id) {
        const selectedIds = [...this.state.selectedIds];
        let newStateisChecked = false;

        if (selectedIds.indexOf(id) > -1) {
            _.remove(selectedIds, (id) => id === id);
        } else {
            selectedIds.push(id);
            newStateisChecked = true;
        }
        this.setState({
            selectedIds
        });

        if (this.props.onRowClicked) {
            this.props.onRowClicked(id, newStateisChecked);
        }
    }
    render(){
        const { titles, rows } = this.props;
        return (
            <div className="table-container">
            <table className="content-table">
                <thead>
                    <tr>
                        <th className="checkbox-container">
                            <Checkbox onChange={this.handleSelectAll} checked={!_.isEmpty(this.props.rows) && this.state.selectedIds.length === this.props.rows.length} />
                        </th>
                        {
                            titles.map((t, index) => {                                
                                return (<th key={index}>{t.value}</th>);
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    rows.map((row, rindex) => {
                        return (<tr onClick={_.partial(this.handleRowClicked, row.id)} onDoubleClick={_.partial(this.props.handleRowDoubleClick, row.id)} key={rindex}>
                                    <td className="select-checkbox">
                                        <Checkbox onChange={_.partial(this.handleRowClicked, row.id)} checked={this.state.selectedIds.indexOf(row.id) >= 0} />
                                    </td>
                                    {
                                        titles.map((t, cindex) => {
                                            const value = row[t.key];
                                            let displayValue = "";
                                            let tdClass = null;
                                            switch (typeof(value)) {
                                                case "boolean":
                                                    displayValue = (<Checkbox readOnly checked={value}/>);
                                                    tdClass = "select-checkbox";
                                                break;
                                                case "string":
                                                case "number":
                                                    displayValue = value;
                                                break;
                                            }
                                            return (<td className={tdClass} key={cindex}>{displayValue}</td>);
                                        })
                                    }
                                </tr>);
                    })
                }
                </tbody>
            </table>
            </div>
        );             
    }
}
export default Table;