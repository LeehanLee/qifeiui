import _ from "lodash";

export default (state = {
    departmentTreeData: []
}, action) => {
    switch (action.type) {
        case "RECEIVE_DEPARTMENT_LIST":
            return _.assign({}, state, {departmentTreeData: action.departmentTreeData});
        // case "RECEIVE_DEPARTMENT":
        //     return _.assign({}, state, {departmentFormData: action.departmentFormData});
    }
    return state;
};