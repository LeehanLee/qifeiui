import primaryMenuList from './PrimaryNavigation/PrimaryMenu/reducers/index.js';
import secondaryMenuList from './SecondaryNavigation/reducers/index.js';
// import accountData from "./Areas/Account/recuders/index";
import { combineReducers } from 'redux';
import routeState from "./App/reducers/app";
import tableData from "./Areas/Common/reducers/Table";
import breadNavigationData from "./Areas/Common/reducers/BreadNavigation";

export default combineReducers({
    primaryMenuList,
    secondaryMenuList,
    routeState,
    tableData,
    breadNavigationData
});