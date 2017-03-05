import React, { Component } from 'react';
import css from "./Content.less";
import ButtonGroup from "./ButtonGroup";
import BreadNavigation from "./BreadNavigation";
import Table from "./Table";

class Content extends Component{
    renderBreadNavigation(){
        return (<div className="bread-navigation-container">
                    <BreadNavigation />
                </div>);
    }
    renderButtonGroup(){
        if (this.props.buttonGroup) {
            return (<div className="button-group-container">
                        <ButtonGroup data={this.props.buttonGroup}/>
                    </div>);
        } else {
            return null;
        }
    }
    renderTable(){
        return (<div className="table-container">
                    <Table />
                </div>);
    }
    render(){
        return (<div className="content-container">
                    <div className="content">
                        {this.renderBreadNavigation()}
                        {this.renderButtonGroup()}
                        {this.renderTable()}
                    </div>
                </div>);
    }
}

export default Content;