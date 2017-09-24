import React, { Component } from 'react';
import FormItem from "./FormItem";
import Tree from "./Tree";
import Modal from "./Modal";

class FormTreeItem extends FormItem {
    constructor(props) {
        super(props);
        this.toggleModalTree = this.toggleModalTree.bind(this);
        this.handleYesClicked = this.handleYesClicked.bind(this);
        this.handleNoClicked = this.handleNoClicked.bind(this);
        this.renderCurrentSelectedText = this.renderCurrentSelectedText.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.handleResetAndOpenModalTree = this.handleResetAndOpenModalTree.bind(this);
        this.setSelectedIdsAndTexts = this.setSelectedIdsAndTexts.bind(this);

        this.state = {
            showTree: false,
            selectedIds: [],
            selectedTexts: []
        }

        this.child = {};
    }

    renderModelTree() {
        if (this.state.showTree) {
            const body = <Tree url={this.props.url} selectedIds={this.props.selectedIds} onNodeClick={this.setSelectedIdsAndTexts} selectMode={this.props.selectMode} />;
            return (<Modal onYesClick={this.handleYesClicked} onNoClick={this.handleNoClicked} title="请选择" body={body}/>);
        }
        return null;
    }

    setSelectedIdsAndTexts(node, selectedIds, selectedTexts) {
        this.setState({
            selectedIds,
            selectedTexts
        });
    }

    toggleModalTree() {
        this.setState({showTree: !this.state.showTree});
    }

    renderTriggerText() {
        return this.props.selectedTexts ? "重新选择" : "请选择";
    }

    handleYesClicked(e) {
        e.stopPropagation();
        e.preventDefault();
        this.toggleModalTree();

        if (this.props.onChange) {
            const currentSelected = {
                value: this.state.selectedIds.join(","),
                text: this.state.selectedTexts.join(",")
            };
            this.props.onChange(currentSelected);
        }
    }

    handleNoClicked(e) {
        e.stopPropagation();
        e.preventDefault();
        this.toggleModalTree();
    }

    handleResetClick() {

        if (this.props.onChange) {
            this.props.onChange({});
        }
    }

    handleResetAndOpenModalTree() {
        this.handleResetClick();
        this.toggleModalTree();

        if (this.props.onChange) {
            this.props.onChange({});
        }
    }

    renderCurrentSelectedText() {
        if (_.isEmpty(this.props.selectedTexts)) {
            return null;
        }
        return (<div className="current-selected-text">{this.props.selectedTexts}</div>);
    }

    renderResetBtn() {
        if (_.isEmpty(this.props.selectedTexts)) {
            return null;
        }
        const result = [];
        result.push(<span key="reset" onClick={this.handleResetClick} className="form-tree-reset">清空</span>);
        // result.push(<span key="resettrigger" onClick={this.handleResetAndOpenModalTree} className="form-tree-reset">清空并重新选择</span>);
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
    selectedIds: React.PropTypes.string,
    selectedTexts: React.PropTypes.string,
    onChange: React.PropTypes.func
};

export default FormTreeItem;