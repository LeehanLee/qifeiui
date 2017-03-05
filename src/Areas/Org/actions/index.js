import $ from "jquery";
import {breadNavigationInitAction} from "../../Common/actions/BreadNavigation";
import {tableInitAction} from "../../Common/actions/Table";
import _ from "lodash";

const tableTitles = () => {
    return [{
        key: "orgId",
        value: "产品编号"
    },{
        key: "OrgName",
        value: "产品名称"
    },{
        key: "price",
        value: "产品单价"
    },{
        key: "color",
        value: "产品颜色"
    },{
        key: "color",
        value: "产品库存数量"
    },{
        key: "time",
        value: "生产时间"
    },{
        key: "onsale",
        value: "是否在卖"
    },{
        key: "arriveTime",
        value: "到货时间"
    }];
}
const tableRows = () => {
    return [{
        orgId: "aaa-content-id-xxx",
        OrgName: "Content",
        price: "3000",
        color: "小红",
        count: "23",
        time: "2019-06-26",
        onsale: "是",
        arriveTime: "2020-02-04"
    },{
        orgId: "aaa-ma-id-xxss",
        OrgName: "MA",
        price: "32300",
        color: "蓝",
        count: "23",
        time: "2019-06-26",
        onsale: "是",
        arriveTime: "2020-02-04"
    },{
        orgId: "aaa-mis-id-xxff",
        OrgName: "MIS",
        price: "3000",
        color: "小红",
        count: "23",
        time: "1265-06-05",
        onsale: "是",
        arriveTime: "2020-02-04"
    },{
        orgId: "aaa-service-id-ddxx",
        OrgName: "此时感觉到你的重要我为你唱最后的古谣你美目如当年",
        price: "3000",
        color: "流转我心间",
        count: "23",
        time: "1995-06-23",
        onsale: "是",
        arriveTime: "2020-02-04"
    },{
        orgId: "aaa-555512355",
        OrgName: "红雨瓢泼泛起了回忆怎么潜谁的耳边总有绝句在萦绕我们俩用文言文对话真的很搞笑还笑那曹操贪慕着小乔",
        price: "200",
        color: "了句点",
        count: "23",
        time: "1986-06-13",
        onsale: "是",
        arriveTime: "2020-02-04"
    },{
        orgId: "aaa-moo-id-xxbb",
        OrgName: "這也是一個明天，券關的姜兩红雨瓢泼泛起了回忆怎么潜谁的耳边总有绝句在萦绕我们俩用文言文对话真的很搞笑还笑那曹操贪慕着小乔",
        price: "200",
        color: "了句点",
        count: "23",
        time: "1986-06-13",
        onsale: "是",
        arriveTime: "2020-02-04"
    }];
}

const breadNavigation = () => {
    return [{
        "text": "系统管理",
        "href": "admin",
    },{
        "text": "部門管理",
        "href": "",
    }];
};
const buttonGroup = () => {
    return [{
        "text": "添加",
        "href": "admin/account/add"
    },{
        "text": "删除",
        "onClick": () => {
            console.log(this);
        }
    },{
        "text": "禁用哦",
        "onClick": () => {
            console.log(this);
        }
    }];
};

const initContent = () => {
    return (dispatch, getState) => {
        dispatch(breadNavigationInitAction(breadNavigation()));
        dispatch(tableInitAction({                
            tableTitles: tableTitles(),
            tableRows: tableRows().map(item => {
                return _.assign({}, item, {checked: false});
            })
        }));
    };
};

export {buttonGroup, breadNavigation, initContent}