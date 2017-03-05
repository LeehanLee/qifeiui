import _ from "lodash";
import {BREAD_NAVIGATION_INIT} from "../actions/BreadNavigation";

export default (state = [], action) => {
    switch (action.type){
        case BREAD_NAVIGATION_INIT:
            return action.breadNavigationData;
    }
    return state;
};