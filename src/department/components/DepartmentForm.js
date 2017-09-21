import React, { Component } from 'react';
import { FormInputItem, Form, FormTreeItem} from "../../common/component";
import ValidationState from "../../common/utils/ValidationState.js";

class DepartmentForm extends Component{
    constructor(props) {
        super(props);
        this.getmessage = this.getmessage.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleParentChange = this.handleParentChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        
        this.formValidationState = new ValidationState();
        this.child = {};
    }
    
    validateForm() {
        this.formValidationState.validateMessage = [];
        this.refs.nameInput.validate();
    }

    getmessage() {
        return null;
    }

    handleFormSubmit(e) {
        this.validateForm();
        e.preventDefault(); //阻止form自动提交

        if (!_.isEmpty(_.compact(this.formValidationState.validateMessage))) {
            EventEmitter.emit("ShowMessageBar", "请修正表单错误", false);
        } else {
            if (this.props.onFormSubmit) {
                this.props.onFormSubmit(e);
            }
        }
    }

    handleParentChange(currentSelected) {//currentSelected is like {value: xxx, text: xxx}
        this.props.onFormTreeItemChange({
            "parentid": currentSelected.value,
            "parentName": currentSelected.text
        });
    }

    render(){
        const { formAction, formData } = this.props;
        return (<div className="form-container">
                    {this.getmessage()}
                    <Form method="post" action={formAction} handleFormSubmit={this.handleFormSubmit}>
                        <FormInputItem ref="nameInput" validationState={this.formValidationState} validate={["notEmpty"]}
                            title="部门名" type="text" id="name" name="name" value={formData.name} onChange={this.props.handleFormChange}/>

                        <FormTreeItem selectedIds={formData.parentid} selectedTexts={formData.parentName} url="/department/tree"
                            title="上级部门" id="parentid" name="parentid" onChange={this.handleParentChange} selectMode="radio"/>

                        <FormInputItem title="启用" id="available" name="available" type="checkbox" checked={formData.available} 
                            onClick={this.props.handleFormChange}/>
                    </Form>
                </div>);
    }
}

DepartmentForm.propTypes = {
    formAction: React.PropTypes.string,
    formData: React.PropTypes.object,
    onFormTreeItemChange: React.PropTypes.func,
    onFormSubmit: React.PropTypes.func,
    handleFormChange: React.PropTypes.func,
};

export default DepartmentForm;