const ENTER_ROUTER = "ENTER_ROUTER";

const enterRouterAction = (routeState) => {
    return {
        type: ENTER_ROUTER,
        routeState
    };
};

export {ENTER_ROUTER, enterRouterAction}