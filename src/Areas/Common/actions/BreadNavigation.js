const BREAD_NAVIGATION_INIT = "BREAD_NAVIGATION_INIT";

const breadNavigationInitAction = (breadNavigationData) => {
    return {
        type: BREAD_NAVIGATION_INIT,
        breadNavigationData
    };
}

export {BREAD_NAVIGATION_INIT, breadNavigationInitAction}