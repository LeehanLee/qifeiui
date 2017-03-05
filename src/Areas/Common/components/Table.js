import React, { Component } from 'react';
import _ from "lodash";
import css from "./Table.less";
import {connect} from "react-redux";
import * as Actions from "../actions/Table.js";
import {bindActionCreators} from "redux";

class Table extends Component{
    constructor(){
        super();
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.selectAllChange = this.selectAllChange.bind(this);
    }
    handleCheckboxChange(changeIndex, e){
        this.props.handleTableItemClick(changeIndex, e.target.checked);
    }
    selectAllChange(e) {
        this.props.handleTableSelectAll(e.target.checked);
    }
    render(){
        const { titles, rows } = this.props;
        return (
            <table className="content-table">
                <thead>
                    <tr>
                        <th className="checkbox-container"><input onChange={this.selectAllChange} checked={!_.find(this.props.rows, item => !item.checked)} type="checkbox" /></th>
                        {
                            titles.map((t, index) => {
                                let classname = t.contentTextAlign ? `${classname} ${t.contentTextAlign}` : `${classname} text-center`;
                                return (<th className={classname} key={index}>{t.value}</th>);
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    rows.map((row, rindex) => {
                        let classname = "border-right";
                        classname = rindex + 1 == rows.length ? classname : `${classname} border-bottom`;
                        classname = `${classname} checkbox-container`
                        return (<tr key={rindex}>
                                    <td className={classname}><input onChange={_.partial(this.handleCheckboxChange, rindex)} checked={row.checked} type="checkbox" value={rindex}/></td>
                                    {
                                        titles.map((t, cindex) => {
                                            let classname = cindex + 1 == titles.length ? "" : "border-right";
                                            classname = rindex + 1 == rows.length ? classname : `${classname} border-bottom`;
                                            classname = t.contentTextAlign ? `${classname} ${t.contentTextAlign}` : `${classname} text-left`;
                                            return (<td className={classname} key={cindex}>{row[t.key].toString()}</td>);
                                        })
                                    }
                                </tr>);
                    })
                }
                </tbody>
            </table>
        );             
    }
}
const mapStatesToProps = (state) => {
    return {
        titles: state.tableData.titles,
        rows: state.tableData.rows
    };
}
const mapDispatchToProps = (dispatch, getState) => {
    return bindActionCreators(Actions, dispatch);
}
export default connect(mapStatesToProps, mapDispatchToProps)(Table);