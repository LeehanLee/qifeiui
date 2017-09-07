
import React, { Component } from 'react';
import mockData from "../mockdata/mockTreeData";
import Checkbox from "./Checkbox";

const hasChild = (node) => {
    return !_.isEmpty(node.children);
}
class Tree extends Component{
    constructor(props) {
        super(props);
        this.toggleNodeExpanded = this.toggleNodeExpanded.bind(this);
        this.toggleNodeSelected = this.toggleNodeSelected.bind(this);
        this.renderNode = this.renderNode.bind(this);
        this.state = {
            treeData: mockData,
            selectedNodes: []
        };
    }

    toggleNodeExpanded(currentNodePath, e) {
        e.stopPropagation();

        const newData = _.cloneDeep(this.state.treeData);
        const node = _.get(this.state.treeData, currentNodePath);
        node.expanded = !node.expanded;
        _.set(newData, currentNodePath, node);
        this.setState({treeData: newData});
    }

    toggleNodeSelected(currentNodePath, e) {
        e.stopPropagation();
        e.preventDefault();

        const newData = _.cloneDeep(this.state.treeData);
        const node = _.get(newData, currentNodePath);
        node.selected = !node.selected;
        _.set(newData, currentNodePath, node);
        this.setState({treeData: newData});

        const selectedNodes = [...this.state.selectedNodes];
        const nodewithpath = _.assign({}, node, {path: currentNodePath});        
        
        if (nodewithpath.selected) {    
            selectedNodes.push(nodewithpath);
        } else {
            _.remove(selectedNodes, (snode) => {
                return snode.path === nodewithpath.path;
            });
        }

        if (this.props.onCheckboxClick) {
            this.props.onCheckboxClick(selectedNodes);
        }

        this.setState({selectedNodes});
    }

    renderNode(nodes, parentPath, parentExpanded) {        
        return nodes.map((node, index) => {
            const currentNodePath = parentPath ? `${parentPath}.children.[${index}]` : `[${index}]`;
            let iconClass = "triangle";
            if (hasChild(node)) {
                if (node.expanded) {
                    iconClass = `${iconClass} triangle-down`;
                } else {
                    iconClass = `${iconClass} triangle-right`;
                }
            }
            let nodeContainerClass = parentExpanded ? "node show" : "node hide";
            const isNodeSelected = _.some(this.state.selectedNodes, (snode) => snode.path === currentNodePath);
            const nodeClass = isNodeSelected ? "text selected" : "text";
            return (<div key={node.id} className={nodeContainerClass}>
                <div className={nodeClass}  onClick={_.partial(this.toggleNodeSelected, currentNodePath)} onDoubleClick={_.partial(this.toggleNodeExpanded, currentNodePath)}>
                    <i className={iconClass} onClick={_.partial(this.toggleNodeExpanded, currentNodePath)}></i>
                    <Checkbox className="tree-checkbox" checked={node.selected === true}/>
                    {node.text}
                </div>
                {
                    node.children && this.renderNode(node.children, currentNodePath, node.expanded)
                }
            </div>);
        });
    }

    render(){
        if (!this.props.show) {
            return null;
        }
        return (<div className="tree">
           {this.renderNode(this.state.treeData, null, true)}
        </div>);
    }
}
Tree.defaultProps = {
    treeData: [],
    onCheckboxClick: null,
    show: true
};
export default Tree;