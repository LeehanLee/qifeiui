import ApiHelper from "../../common/utils/ApiHelper";
import EventEmitter from "../../common/utils/MyEventEmitter.js";
import promise from 'es6-promise';
promise.polyfill();

const getAccountList = (page = 1, pageSize = 10) => {
    return (dispatch, getState) => {
        return ApiHelper.get(`/account/list?page=${page}&take=${pageSize}`).then(function (response) {
            dispatch({
                type: "RECEIVE_ACCOUNT_LIST",
                data: response.data,
                page,
                pageSize
            })
        })
    };
};

const selectListItem = (index, rows) => {
    return (dispatch) => {
        let oldtmp = rows[index];
        let newtmp = _.assign({}, oldtmp, {checked: !oldtmp.checked});
        const newRows = [...rows.slice(0, index), newtmp,
            ...rows.slice(index + 1)
        ];
        dispatch({
            type: "SELECT_ACCOUNT_LIST_ITEM",
            accountDataList: newRows
        });
    };
};

const selectListItemAll = (checked, rows) => {
    return (dispatch) => {
        const newRows = rows.map(r => {
            return _.assign({}, r, {checked});
        })
        dispatch({
            type: "SELECT_ACCOUNT_LIST_ITEM",
            accountDataList: newRows
        });
    };
};

const actionUrlMap = {
    delete: "/account/delete",
    avaliable: "/account/avaliable",
    unavaliable: "/account/unavaliable",
};

const refreshAccountList = (dispatch, getState) => {
    const {page, pageSize} = getState().accountData;
    getAccountList(page, pageSize)(dispatch, getState);
};

const doActionForAccounts = (ids, actionType) => {
    return (dispatch, getState) => {
        if (_.isEmpty(ids)) {
            EventEmitter.emit("ShowMessageBar", "请先选择用户", false);
        } else {
            const url = actionUrlMap[actionType];
            return ApiHelper.post(url, {ids}).then(function (response) {
                EventEmitter.emit("ShowMessageBar", response.data.message, response.data.success);
                if (response.data.success) {
                    refreshAccountList(dispatch, getState);
                }            
            })
        }
    };
};

export {getAccountList, selectListItem, doActionForAccounts, selectListItemAll};