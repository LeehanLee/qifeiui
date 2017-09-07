import React, { Component } from 'react';
import FormItem from "./FormItem";
import Tree from "./Tree";
import Modal from "./Modal";

class FormTreeItem extends FormItem{
    constructor(props) {
        super(props);
        this.toggleModalTree = this.toggleModalTree.bind(this);
        this.handleYesClicked = this.handleYesClicked.bind(this);
        this.handleNoClicked = this.handleNoClicked.bind(this);
        this.renderCurrentSelectedText = this.renderCurrentSelectedText.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.handleResetAndOpenModalTree = this.handleResetAndOpenModalTree.bind(this);

        this.state = {
            currentSelectedText: null,
            showTree: false
        }
    }

    renderModelTree() {
        const body = <Tree ref="tree" show={this.state.showTree}/>;
        return (<Modal onYesClick={this.handleYesClicked} onNoClick={this.handleNoClicked} ref="modalTree" title="请选择" body={body}/>);
    }

    toggleModalTree() {
        this.refs.modalTree.toggleModal();
        this.setState({showTree: !this.state.showTree});
    }

    renderTriggerText() {
        return this.state.currentSelectedText ? "重新选择" : "请选择";
    }

    handleYesClicked(e) {
        e.stopPropagation();
        e.preventDefault();
        this.toggleModalTree();

        const currentSelectedText = this.refs.tree.state.selectedNodes.map((snode) => {
            return snode.text;
        }).join(",");
        this.setState({currentSelectedText});
        
        if (this.props.onChange) {
            const currentSelectedId = this.refs.tree.state.selectedNodes.map((snode) => {
                return snode.id;
            }).join(",");
            this.props.onChange(currentSelectedId);
        }
    }

    handleNoClicked(e) {
        e.stopPropagation();
        e.preventDefault();
        this.toggleModalTree();
    }

    handleResetClick() {
        const newTreeData = _.cloneDeep(this.refs.tree.state.treeData);
        this.refs.tree.state.selectedNodes.forEach((snode) => {
            const node = _.get(newTreeData, snode.path);
            node.selected = false;
            _.set(newTreeData, snode.path, node);
        });
        
        this.refs.tree.setState({
            treeData: newTreeData,
            selectedNodes: []
        });
        this.setState({currentSelectedText: null});

        if (this.props.onChange) {
            this.props.onChange("");
        }
    }

    handleResetAndOpenModalTree() {
        this.handleResetClick();
        this.toggleModalTree();

        if (this.props.onChange) {
            this.props.onChange("");
        }
    }

    renderCurrentSelectedText() {
        if (_.isEmpty(this.state.currentSelectedText)) {
            return null;
        }
        return (<div className="current-selected-text">{this.state.currentSelectedText}</div>);
    }

    renderResetBtn() {
        if (_.isEmpty(this.state.currentSelectedText)) {
            return null;
        }
        const result = [];
        result.push(<span key="reset" onClick={this.handleResetClick} className="form-tree-reset">清空</span>);
        result.push(<span key="resettrigger" onClick={this.handleResetAndOpenModalTree} className="form-tree-reset">清空并重新选择</span>);
        return result;
    }

    renderValueWidget(props) {
        return (<div className="form-tree-item">
            {this.renderCurrentSelectedText()}
            <span className="form-tree-trigger" onClick={this.toggleModalTree}>{this.renderTriggerText()}</span>
            {this.renderResetBtn()}
            {this.renderModelTree()}
        </div>);
    }
}

FormTreeItem.propTypes = {
    title: React.PropTypes.string,
    onChange: React.PropTypes.func
};

export default FormTreeItem;