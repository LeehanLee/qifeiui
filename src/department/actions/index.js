import ApiHelper from "../../common/utils/ApiHelper";

const getDepartmentList = (parentid) => {
    return (dispatch, getState) => {
        const params = {};
        if (parentid) {
            params.parentid = parentid;
        }
        return ApiHelper.get(`/department/tree`, {params}).then(function (response) {
            dispatch({
                type: "RECEIVE_DEPARTMENT_LIST",
                departmentTreeData: response.data
            })
        })
    };
};

// const getDepartment = (id) => {
//     return (dispatch, getState) => {
//         const params = {};
//         if (id) {
//             params.id = id;
//         }
//         return ApiHelper.get(`/department/get`, {params}).then(function (response) {
//             dispatch({
//                 type: "RECEIVE_DEPARTMENT",
//                 departmentFormData: response.data
//             })
//         });
//     };
// };

// const resetDepartmentForm = () => {
//     return (dispatch, getState) => {
//         dispatch({
//             type: "RECEIVE_DEPARTMENT",
//             departmentFormData: {name: "", parentid: "", available: false}
            
//         });
//     };
// };

export {getDepartmentList};