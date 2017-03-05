import React, { Component } from 'react';
import PrimaryItem from '../Common/components/PrimaryItem.js';

class SignOut extends Component{
    handClick(){
        window.location.href="/signout";
    }
    render(){
        return (<div className="primary-menu-container fr">
                    <PrimaryItem text="注销" handleClick={this.handClick}/>
                </div>);
    }
}

export default SignOut;