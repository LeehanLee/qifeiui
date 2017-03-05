import {ENTER_ROUTER} from "../actions/app.js";

export default function(state = {}, action){
    switch (action.type) {
        case ENTER_ROUTER:
            return action.routeState;
    }
    return state;
}