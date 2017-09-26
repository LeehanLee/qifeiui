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

export {getAccountList};