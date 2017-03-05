import React, { Component } from 'react';

class Footer extends Component{
    render(){
        return (<div className="logo-container">
                    <div className="logo">
                        <img className="logo-img" src={require('../../images/logo.png')}/>
                        <div className="logo-text">Eric Home</div>
                    </div>
                </div>);
    }
}

export default Footer;