import React from "react";
import "./Home.css";
import { NavLink, Switch, Route } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import Main from './home/Main'
import Info from './home/Info'
import Chat from './home/Chat'
import My from './home/My'
// 测试插件文件
import Demo from './home/demo/Demo.jsx'

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="home_content">
           <Switch>
             <Route exact path='/home' component={Main} />
             <Route path='/home/info' component={Info} />
             <Route path='/home/chat' component={Chat} />
             <Route path='/home/my' component={My} />
           </Switch>
        </div>
        <div className="home_menu">
          <div className="ui four column grid">
            <div className="column">
              <NavLink exact to="/home">
                <Icon className="home" />
                <p>主页</p>
              </NavLink>
            </div>
            <div className="column">
              <NavLink to="/home/info">
                <Icon className="search" />
                <p>资讯</p>
              </NavLink>
            </div>
            <div className="column">
              <NavLink to="/home/chat">
                <Icon className="chat" />
                <p>微聊</p>
              </NavLink>
            </div>
            <div className="column">
              <NavLink to="/home/my">
                <Icon className="user" />
                <p>我的</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
