import React, { Component } from 'react';
import { FormInputItem, Form, FormTreeItem} from "../../common/component";
import ValidationState from "../../common/utils/ValidationState.js";

class AccountForm extends Component{
    constructor(props) {
        super(props);
        this.getmessage = this.getmessage.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
        
        this.formValidationState = new ValidationState();
        this.state = {
            formMessage: null,
            formHasError: false
        }
    }
    
    validateForm() {
        this.formValidationState.validateMessage = [];
        this.refs.nameInput.validate();
        this.refs.passwordInput.validate();
        this.refs.mobileInput.validate();
    }

    getmessage() {
        if (this.state.formMessage) {
            const className = this.state.formHasError ? "message error" : "message";
            return <div className={className}>{this.state.formMessage}</div>;
        }
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

    handleDepartmentChange(currentSelected) {//currentSelected is like {value: xxx, text: xxx}
        this.props.onFormTreeItemChange({
            "departmentid": currentSelected.value,
            "departmentName": currentSelected.text
        });
    }

    render(){
        const { formAction, formData } = this.props;
        return (<div className="form-container">
                    {this.getmessage()}
                    <Form method="post" action={this.state.formAction} handleFormSubmit={this.handleFormSubmit}>
                        <FormInputItem ref="nameInput" validationState={this.formValidationState} validate={["notEmpty"]}
                            title="用户名" type="text" name="name" id="name" value={formData.name} onChange={this.props.handleFormChange}/>

                        <FormInputItem ref="passwordInput" validationState={this.formValidationState} validate={["notEmpty"]}
                            title="密码" name="password" id="password" type="text" value={formData.password} onChange={this.props.handleFormChange}/>

                        <FormInputItem ref="mobileInput" validationState={this.formValidationState} validate={[{func: "maxLength", maxLength: 15}]}
                            title="手机号" type="text" name="mobile" id="mobile" value={formData.mobile} onChange={this.props.handleFormChange}/>

                        <FormTreeItem url="/department/tree" title="部门" id="dep" name="dep" onChange={this.handleDepartmentChange}
                            selectedIds={formData.departmentId} selectedTexts={formData.departmentName}/>

                        <FormTreeItem title="角色" id="role" name="role" onChange={_.partial(this.handleDepartmentChange, "role")}/>

                        <FormInputItem title="启用"  id="available" name="available" type="checkbox" checked={formData.available} onClick={this.props.handleFormChange}/>
                    </Form>
                </div>);
    }
}

AccountForm.propTypes = {
    formAction: React.PropTypes.string,
    formData: React.PropTypes.object,
    onFormTreeItemChange: React.PropTypes.func,
    onFormSubmit: React.PropTypes.func,
    handleFormChange: React.PropTypes.func,
};

export default AccountForm;