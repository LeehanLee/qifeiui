import PrimaryMenu from "./PrimaryMenu/components/index.js";
import SignOut from "./SignOut/index";
import React, { Component } from 'react';

class PrimaryNavigation extends Component{
    render(){
        return (<div className="primary-navigation-container">
                    <div className="primary-navigation clearfix">
                        <a href="#/" className="home fl">Eric Home</a>
                        <PrimaryMenu />
                        <SignOut />
                    </div>
                </div>);
    }
}

export default PrimaryNavigation;