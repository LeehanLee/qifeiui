import _ from "lodash";

export default (state = {accountTitleList: [], accountDataList: []}, action) => {
    let newState;
    switch (action.type){
        case "RECEIVE_ACCOUNT_LIST":
            newState = _.assign({}, state, {
                accountTitleList: action.data.accountTitleList,
                accountDataList: action.data.accountDataList,
                totalCount: action.data.totalCount,
                page: action.page,
                pageSize: action.pageSize
            });
            return newState;
        case "SELECT_ACCOUNT_LIST_ITEM":
            newState = _.assign({}, state, {
                accountDataList: action.accountDataList
            });
            return newState;
    }
    return state;
};