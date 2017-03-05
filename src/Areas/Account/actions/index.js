import $ from "jquery";
import {breadNavigationInitAction} from "../../Common/actions/BreadNavigation";
import {tableInitAction} from "../../Common/actions/Table";
import _ from "lodash";

const breadNavigation = () => {
    return [{
        "text": "系统管理",
        "href": "admin",
    },{
        "text": "用户管理",
        "href": "",
    }];
};
const buttonGroup = () => {
    return [{
        "text": "添加",
        "href": "admin/account/add"
    },{
        "text": "删除",
        "onClick": () => {
            console.log(this);
        }
    }];
};

const initContent = () => {
    return (dispatch, getState) => {
        dispatch(breadNavigationInitAction(breadNavigation()));
        $.get('/account/index').then(response => {
            dispatch(tableInitAction({                
                tableTitles: response.titleList,
                tableRows: response.accountList.map(item => {
                    return _.assign({}, item, {checked: false});
                })
            }));
        });
    };
};

export {buttonGroup, breadNavigation, initContent}