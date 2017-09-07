import React, { Component } from 'react';
import _ from "lodash";
import css from "./Table.less";
import {connect} from "react-redux";
import Checkbox from "./Checkbox";

class Table extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { titles, rows } = this.props;
        return (
            <div className="table-container">
            <table className="content-table">
                <thead>
                    <tr>
                        <th className="checkbox-container">
                            <Checkbox onChange={this.props.handleSelectAll} checked={!_.isEmpty(this.props.rows) && (!_.find(this.props.rows, item => _.isNil(item.checked) || !item.checked))} />
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
                        return (<tr onClick={_.partial(this.props.handleSelectRow, rindex)} onDoubleClick={_.partial(this.props.handleRowDoubleClick, row, rindex)} key={rindex}>
                                    <td className="select-checkbox">
                                        <Checkbox onChange={_.partial(this.props.handleSelectRow, rindex)} checked={_.isNil(row.checked) ? false : row.checked} />
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