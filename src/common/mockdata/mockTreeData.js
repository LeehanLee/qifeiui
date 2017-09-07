const mockData = [
    {
        id: "1", 
        text: "管理中心",
        expanded: true,
        children: [{
            id: "2", 
            text: "管理1部", 
            children: [{
                id: "3", 
                text: "管理a组"
            }]
        }]
    }, {
        id: "6", 
        text: "行政中心", 
        children: [{
            id: "7", 
            text: "行政中心1"
        }]
    }
];

const bigData = [];
for(let i = 10; i< 500; i++) {
    bigData.push({
        id: i, 
        text: `IT中心${i}`, 
        children: [{
            id: `5${i}`, 
            text: `IT中心5${i}`, 
            children: [{
                id: `55${i}`, 
                text: `IT中心55${i}`, 
                children: [{
                    id: `5${i}`, 
                    text: `IT中心5${i}`, 
                    children: [{
                        id: `55${i}`, 
                        text: `IT中心55${i}`
                    }]
                }, {
                    id: `6${i}`, 
                    text: `IT中心6${i}`,
                    children: [{
                        id:  `66${i}`, 
                        text: `IT中心66${i}`
                    }]
                }, {
                    id: `7${i}`, 
                    text: `IT中心7${i}`,
                    children: [{
                        id:  `77${i}`, 
                        text: `IT中心77${i}`
                    }]
                }]
            }]
        }, {
            id: `6${i}`, 
            text: `IT中心6${i}`,
            children: [{
                id:  `66${i}`, 
                text: `IT中心66${i}`
            }]
        }, {
            id: `7${i}`, 
            text: `IT中心7${i}`,
            children: [{
                id:  `77${i}`, 
                text: `IT中心77${i}`
            }]
        }]
    });
}

const smallData = [];
for(let i = 10; i< 100; i++) {
    smallData.push({
        id: i, 
        text: `IT中心${i}`, 
        children: [{
            id: `5${i}`, 
            text: `IT中心5${i}`, 
            children: [{
                id: `55${i}`, 
                text: `IT中心55${i}`,
                children: []
            }, {
                id: `5${i}`, 
                text: `IT中心5${i}`, 
                children: [{
                    id: `55${i}`, 
                    text: `IT中心55${i}`
                }]
            }, {
                id: `7${i}`, 
                text: `IT中心7${i}`,
                children: [{
                    id:  `77${i}`, 
                    text: `IT中心77${i}`
                }]
            }]
        }]
    });
}

const mockBigTreeData = [].concat(mockData).concat(bigData);
const mockSmallTreeData = [].concat(mockData).concat(smallData);

export default mockSmallTreeData;