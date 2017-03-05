import _ from "lodash";
import {TABLE_DATA_INIT, TABLE_ITEM_CLICK, TABLE_SELECT_ALL} from "../actions/Table";

export default (state = {titles: [], rows: []}, action) => {
    let newState;
    let newRows;
    switch (action.type){
        case TABLE_DATA_INIT:
            newState = _.assign({}, state, {
                titles: action.data.tableTitles,
                rows: action.data.tableRows
            });
            return newState;
        case TABLE_ITEM_CLICK:
            let oldtmp = state.rows[action.clickItemIndex];
            let newtmp = _.assign({}, oldtmp, {checked: action.isCheck});
            newRows = [...state.rows.slice(0, action.clickItemIndex),
                newtmp,
                ...state.rows.slice(action.clickItemIndex + 1)
            ];
            newState = _.assign({}, state, {rows: newRows});
            return newState;
        case TABLE_SELECT_ALL:
            newRows = state.rows.map(item => {
                return _.assign({}, item, {checked: action.isCheck});
            });
            newState = _.assign({}, state, {rows: newRows});
            return newState;
    }
    return state;
};