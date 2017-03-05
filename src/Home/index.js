import React, { Component } from 'react';

class Home extends Component{
    render(){
        return (<div className="home-container">
            <span>这是home页面</span>
            <a href="#/admin">admin</a>
                <form action="/signin">
                    <label>用户名：<input type="text" name="username"/></label><br />
                    <label>密码<input type="password" name="password"/></label><br />
                    <input type="submit" value="登录"/>
                </form>
            </div>);
    }
}

export default Home;