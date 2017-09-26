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

export {getDepartmentList};