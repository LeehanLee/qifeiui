import {INIT_PRIMARY_MENU} from "../actions/index.js";
import _ from "lodash";

export default function(state = [], action){
    switch (action.type) {
        case INIT_PRIMARY_MENU:
            return action.data;
    }
    return state;
}