const SECONDARY_MENU_INIT = "SECONDARY_MENU_INIT";
const ACTIVE_SECONDARY_CURRENT_ITEM = "ACTIVE_SECONDARY_CURRENT_ITEM";

const secondaryMenuInitAction = (data) => {
    return {
        type: SECONDARY_MENU_INIT,
        data
    };
};

const activeSecondaryCurrentItemAction = (index) => {
    return {
        type: ACTIVE_SECONDARY_CURRENT_ITEM,
        index
    };
};

export {SECONDARY_MENU_INIT, ACTIVE_SECONDARY_CURRENT_ITEM, secondaryMenuInitAction, activeSecondaryCurrentItemAction}