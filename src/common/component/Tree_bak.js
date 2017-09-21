
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
        this.state = {
            treeData: null,
            expandedIdPaths: [],
            selectedNodes: []
        };

        this.selectedPath = null;
    }

    // refreshSelectedNodeIds(selectedNodeIds) {
    //     this.setState({selectedNodeIds});
    // }

    toggleNodeExpanded(currentNodePath, e) {
        e.stopPropagation();

        const newData = _.cloneDeep(this.state.treeData);
        const newnode = _.get(this.state.treeData, currentNodePath);
        newnode.expanded = !newnode.expanded;
        _.set(newData, currentNodePath, newnode);

        if (!newnode.expanded) {
            let newexpandedIdPaths = [...this.state.expandedIdPaths];
            newexpandedIdPaths = newexpandedIdPaths.filter((id) => { return id !== newnode.id; });
            this.setState({expandedIdPaths: newexpandedIdPaths});
        }
        
        this.setState({treeData: newData});
    }

    toggleNodeSelected(currentNodePath, e) {
        e.stopPropagation();
        e.preventDefault();


        const newData = _.cloneDeep(this.state.treeData);
        const newnode = _.get(newData, currentNodePath);
        newnode.selected = !newnode.selected;

        if (this.props.selectMode === "radio") {
            if(newnode.selected) {
                if (this.selectedPath && this.selectedPath !== currentNodePath) {
                    const oldselectednode = _.get(newData, this.selectedPath);
                    if (oldselectednode) {
                        oldselectednode.selected = false;
                        _.set(newData, this.selectedPath, oldselectednode);
                    }
                    this.selectedPath = currentNodePath;//remember selected path, if selectedMode is radio, we will need it.
                }
            } else {
                this.selectedPath = null;
            }
        }

        _.set(newData, currentNodePath, newnode);

        if (!newnode.selected) {
            let newexpandedIdPaths = [...this.state.expandedIdPaths];
            newexpandedIdPaths = newexpandedIdPaths.filter((id) => { return id !== newnode.id; });
            this.setState({expandedIdPaths: newexpandedIdPaths});
        }

        this.setState({treeData: newData});

        const nodewithpath = _.assign({}, newnode, {path: currentNodePath});        
        
        if (nodewithpath.selected) {
            if (this.props.selectMode === "radio") {
                this.state.selectedNodes = this.state.selectedNodes.filter((n) => {n.id !== nodewithpath.id});
            }
            this.state.selectedNodes.push(nodewithpath);
        } else {
            _.remove(this.state.selectedNodes, (snode) => {
                return snode.path === nodewithpath.path;
            });
        }

        if (this.props.onNodeClick) {
            this.props.onNodeClick(newnode, this.state.selectedNodes);
        }
    }

    renderNode(nodes, parentPath, parentExpanded) {        
        return nodes.map((node, index) => {
            if (!parentExpanded) {
                return null;
            }

            const currentNodePath = parentPath ? `${parentPath}.children.[${index}]` : `[${index}]`;

            if (node.selected === true) {
                this.selectedPath = currentNodePath;
            }

            let iconClass = "triangle";

            // const needExpanded = this.state.expandedIdPaths && this.state.expandedIdPaths.indexOf(node.id) > -1;
            const needExpanded = _.some(this.props.selectedPaths, (paths) => paths.indexOf(node.id) < paths.length - 1);
            
            if (hasChild(node)) {
                if (node.expanded || needExpanded) {
                    iconClass = `${iconClass} triangle-down`;
                } else {
                    iconClass = `${iconClass} triangle-right`;
                }
            }
            
            let nodeContainerClass = "node";

            //node.selected表示手动点击选中的，this.props.selectedPaths里表示默认就选中的
            const isNodeSelected = node.selected || _.some(this.props.selectedPaths, (paths) => paths.indexOf(node.parentId) === paths.length - 2);;

            const nodeClass = isNodeSelected ? "text selected" : "text";
        
            return (<div key={node.id} className={nodeContainerClass}>
                <div className={nodeClass}  onClick={_.partial(this.toggleNodeSelected, currentNodePath)} onDoubleClick={_.partial(this.toggleNodeExpanded, currentNodePath)}>
                    <i className={iconClass} onClick={_.partial(this.toggleNodeExpanded, currentNodePath)}></i>
                    <Checkbox className="tree-checkbox" checked={isNodeSelected}/>
                    {node.name}
                </div>
                {
                    node.children && this.renderNode(node.children, currentNodePath, node.expanded || needExpanded)
                }
            </div>);
        });
    }

    setTreeData(response) {
        this.setState({treeData: response.data});
        // this.selectedPath = response
    }

    componentDidMount() {
        if (this.props.url) {
            this.initTree(this.props.url, this.props.value);
        }
    }

    initTree(url, selectedNodeIds) {
        const params = {
            selectedIds: selectedNodeIds
        };
        ApiHelper.get(this.props.url, {params}).then(this.setTreeData);
    }

    setExpandedIdPath(expandedIdPathString) {
        const tmp = expandedIdPathString.split("/");
        tmp.pop();
        this.setState({expandedIdPaths: tmp});
    }

    render(){
        if (!this.props.show || !this.state.treeData) {
            return null;
        }
        return (<div className="tree">
           {this.renderNode(this.state.treeData, null, true)}
        </div>);
    }
}
Tree.defaultProps = {
    treeData: null,
    onNodeClick: null,
    show: true
};
export default Tree;