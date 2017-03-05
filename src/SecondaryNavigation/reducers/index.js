import { INIT_SECONDARY_MENU} from "../../PrimaryNavigation/PrimaryMenu/actions/index.js";
import _ from "lodash";

export default function(state = [], action){
    switch (action.type) {
        case INIT_SECONDARY_MENU:
            return action.secondaryMenuList;
    }
    return state;
}