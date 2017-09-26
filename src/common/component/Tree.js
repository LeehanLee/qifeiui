
import React, { Component } from 'react';
import mockData from "../mockdata/mockTreeData";
import Checkbox from "./Checkbox";
import ApiHelper from "../../common/utils/ApiHelper";

const hasChild = (node) => {
    return !_.isEmpty(node.children);
}
class Tree extends Component{
    constructor(props) {
        super(props);
        this.toggleNodeExpanded = this.toggleNodeExpanded.bind(this);
        this.toggleNodeSelected = this.toggleNodeSelected.bind(this);
        this.renderNode = this.renderNode.bind(this);
        this.setTreeData = this.setTreeData.bind(this);
        this.initTree = this.initTree.bind(this);
        this.getSelectedFromInitTreeData = this.getSelectedFromInitTreeData.bind(this);

        this.state = {
            treeData: null,//别修改treeData，修改treeData非常麻烦，后续太多东西处理不过来
            expandedIds: [],
            selectedIds: [],//用来保存选中的节点的id
            selectedTexts: []
        };
    }

    toggleNodeExpanded(node, e) {
        e.preventDefault();
        e.stopPropagation();

        const expandedIds = [...this.state.expandedIds];
        if (expandedIds.indexOf(node.id) > -1) {
            _.remove(expandedIds, (id) => {return id === node.id});
        } else {
            expandedIds.push(node.id);
        }
        
        this.setState({expandedIds});
    }

    toggleNodeSelected(node, e) {
        e.stopPropagation();
        e.preventDefault();

        let newStateisChecked = false;
        const selectedIds = [...this.state.selectedIds];
        if (selectedIds.indexOf(node.id) > -1) {
            _.remove(selectedIds, (id) => {return id === node.id});
        } else {
            if (this.props.selectMode === "radio") {
                _.remove(selectedIds);
            }
            selectedIds.push(node.id);
            newStateisChecked = true;
        }

        const selectedTexts = [...this.state.selectedTexts];
        if (selectedTexts.indexOf(node.name) > -1) {
            _.remove(selectedTexts, (text) => {return text === node.name});
        } else {
            if (this.props.selectMode === "radio") {
                _.remove(selectedTexts);
            }
            selectedTexts.push(node.name);
        }

        this.setState({
            selectedIds,
            selectedTexts
        });

        if (this.props.onNodeClick) {
            const newnode = _.assign({}, node, {selected: newStateisChecked});
            this.props.onNodeClick(newnode, selectedIds, selectedTexts);
        }
    }

    renderNode(nodes, parentExpanded) {        
        return nodes.map((node) => {
            if (!parentExpanded) {//如果父节点是收缩的，则当前节点根本不需要展示
                return null;
            }

            let iconClass = "triangle";
            
            const needExpanded = this.state.expandedIds.indexOf(node.id) > -1;
            if (hasChild(node)) {
                if (needExpanded) {
                    iconClass = `${iconClass} triangle-down`;
                } else {
                    iconClass = `${iconClass} triangle-right`;
                }
            }
            
            let nodeContainerClass = "node";
            const isNodeSelected = this.state.selectedIds.indexOf(node.id) > -1;

            const nodeClass = isNodeSelected ? "text selected" : "text";
        
            return (<div key={node.id} className={nodeContainerClass}>
                <div className={nodeClass}  onClick={_.partial(this.toggleNodeSelected, node)} onDoubleClick={_.partial(this.toggleNodeExpanded, node)}>
                    <i className={iconClass} onClick={_.partial(this.toggleNodeExpanded, node)}></i>
                    <Checkbox className="tree-checkbox" checked={isNodeSelected}/>
                    {node.name}
                </div>
                {
                    node.children && this.renderNode(node.children, needExpanded)
                }
            </div>);
        });
    }

    componentDidMount() {
        if (this.props.url) {
            this.initTree(this.props.url, this.props.selectedIds);
        }
    }

    initTree(url, selectedIds) {
        const params = {
            selectedIds: selectedIds
        };
        ApiHelper.get(this.props.url, {params}).then(this.setTreeData);
    }
    
    setTreeData(response) {
        this.setState({treeData: response.data});
        const selectedIds = [];
        const selectedTexts = [];
        const expandedIds = [];
        this.getSelectedFromInitTreeData(response.data, selectedIds, selectedTexts, expandedIds);
        this.setState({
            selectedIds,
            selectedTexts,
            expandedIds
        });
    }

    getSelectedFromInitTreeData(nodes, selectedIds, selectedTexts, expandedIds) {
        nodes.forEach(node => {
            if (node.selected) {
                selectedIds.push(node.id);
                selectedTexts.push(node.name);
            }
            if (node.expanded) {
                expandedIds.push(node.id);
            }
            if (node.children) {
                this.getSelectedFromInitTreeData(node.children, selectedIds, selectedTexts, expandedIds);
            }
        });
    }

    setExpandedIds(expandedIds) {
        this.setState({ expandedIds });
    }

    render() {
        if (!this.state.treeData) {
            return null;
        }
        return (<div className="tree">
           {this.renderNode(this.state.treeData, true)}
        </div>);
    }
}
Tree.defaultProps = {
    treeData: null,
    onNodeClick: null,
    show: true
};
export default Tree;