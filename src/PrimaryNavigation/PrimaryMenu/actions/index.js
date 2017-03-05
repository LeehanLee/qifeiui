const INIT_PRIMARY_MENU = "INIT_PRIMARY_MENU";

const primaryMenuInitAction = (data) => {
    return {
        type: INIT_PRIMARY_MENU,
        data
    };
};

const INIT_SECONDARY_MENU = "INIT_SECONDARY_MENU";

const secondaryMenuInitAction = (primaryMenuIndex, secondaryMenuList) => {
    return {
        type: INIT_SECONDARY_MENU,
        primaryMenuIndex,
        secondaryMenuList
    };
};

const MenuMap = {
    "admin": [
        {text: "账号管理", href: "account", isActive: true},
        {text: "部门管理", href: "org", isActive: false},
        {text: "角色管理", href: "role", isActive: false},
        {text: "权限管理", href: "right", isActive: false},
        {text: "分类管理", href: "category", isActive: false},
        {text: "分类类型管理", href: "categorytype", isActive: false}
    ],
    "info": [
        {text: "文章管理", href: "", isActive: true},
        {text: "其它文章管理", href: "", isActive: false},
        {text: "角色管理", href: "", isActive: false},
        {text: "权限管理", href: "", isActive: false},
        {text: "分类管理", href: "", isActive: false},
        {text: "分类类型管理", href: "", isActive: false}
    ],
    "product": [
        {text: "产品管理", href: "", isActive: true},
        {text: "部门管理", href: "", isActive: false},
        {text: "角色管理", href: "", isActive: false},
        {text: "权限管理", href: "", isActive: false},
        {text: "分类管理", href: "", isActive: false},
        {text: "分类类型管理", href: "", isActive: false}
    ],
    "order": [
        {text: "订单管理", href: "", isActive: true},
        {text: "部门管理", href: "", isActive: false},
        {text: "角色管理", href: "", isActive: false},
        {text: "权限管理", href: "", isActive: false},
        {text: "分类管理", href: "", isActive: false},
        {text: "分类类型管理", href: "", isActive: false}
    ],
    "stock": [
        {text: "库存管理", href: "", isActive: true},
        {text: "部门管理", href: "", isActive: false},
        {text: "角色管理", href: "", isActive: false},
        {text: "权限管理", href: "", isActive: false},
        {text: "分类管理", href: "", isActive: false},
        {text: "分类类型管理", href: "", isActive: false}
    ],
    "hehe": [
        {text: "hehe管理", href: "", isActive: true},
        {text: "部门管理", href: "", isActive: false},
        {text: "角色管理", href: "", isActive: false},
        {text: "权限管理", href: "", isActive: false},
        {text: "分类管理", href: "", isActive: false},
        {text: "分类类型管理", href: "", isActive: false}
    ]
};

export {INIT_PRIMARY_MENU, primaryMenuInitAction, INIT_SECONDARY_MENU, secondaryMenuInitAction, MenuMap }