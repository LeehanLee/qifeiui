import React, { Component } from 'react';
import {Link } from "react-router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class BreadNavigation extends Component{
    render(){
        if (this.props.breadNavigationData) {
            const navigationLength = this.props.breadNavigationData.length;
            return (<div className="bread-navigation">
                        {this.props.breadNavigationData.map((b, index) => {
                            if (index == navigationLength - 1){
                                return (<div key={index}><Link className="bread" to={b.href}>{b.text}</Link></div>);
                            } else {
                                return (<div key={index}><Link className="bread linkable" to={b.href}>{b.text}</Link><span className="divider">/</span></div>);
                            }
                            
                        })}
                    </div>);
        } else {
            return null;
        }
    }
}

const mapStatesToProps = (state) => {
    return {
        breadNavigationData: state.breadNavigationData
    };
}
export default connect(mapStatesToProps)(BreadNavigation);