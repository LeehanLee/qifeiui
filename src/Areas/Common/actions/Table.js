const TABLE_ITEM_CLICK = "TABLE_ITEM_CLICK";
const TABLE_SELECT_ALL = "TABLE_SELECT_ALL";
const TABLE_DATA_INIT = "TABLE_DATA_INIT";

const tableInitAction = (data) => {
    return {
        type: TABLE_DATA_INIT,
        data
    };
};
const handleTableItemClick = (index, isCheck) => {
    return (dispatch, getState) => {
        dispatch({
            type: TABLE_ITEM_CLICK,
            clickItemIndex: index,
            isCheck
        });        
    };
};
const handleTableSelectAll = (isCheck) => {
    return (dispatch, getState) => {
        dispatch({
            type: TABLE_SELECT_ALL,
            isCheck
        });        
    };
};

export {TABLE_DATA_INIT, TABLE_ITEM_CLICK, TABLE_SELECT_ALL, tableInitAction, handleTableItemClick, handleTableSelectAll}