import React, { Component } from 'react';
import * as Actions from "../actions/index.js";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import css from "./index.less";

class DepartmentWidget extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (<div>let us fuck this shit</div>);
    }
}
// const mapStatesToProps = (state) => {
//     return {
//         accountTitleList: state.accountData.accountTitleList,
//         accountDataList: state.accountData.accountDataList,
//         totalCount: state.accountData.totalCount,
//         page: state.accountData.page,
//         pageSize: state.accountData.pageSize
//     };
// };
// const mapDispatchToProps = (dispatch, getState) => {
//     return bindActionCreators(Actions, dispatch);
// };

export default connect()(DepartmentWidget);