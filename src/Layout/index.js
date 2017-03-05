import React, { Component } from 'react';
import PrimaryNavigation from "../PrimaryNavigation/index.js";
import SecondaryNavigation from "../SecondaryNavigation/components/index.js";
import Logo from "../Logo/index.js";
import css from "./index.less";

class Layout extends Component{
    render(){
        return (<div>
                    <PrimaryNavigation />
                    <Logo />
                    <div className="sencondary-nav-content">
                        <SecondaryNavigation />
                        {this.props.children}
                    </div>
                </div>);
    }
}

export default Layout;