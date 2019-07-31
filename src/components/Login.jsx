import React from "react";
import "./Login.css";

import { withRouter } from "react-router";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: "",
      pwd: ""
    };
  }

  handlerChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
      // uname: value,
      // pwd: value
    });
  };

  // 登录功能
  login = async e => {
    e.preventDefault();
    // console.log("333", e);
    let { history } = this.props;

    //  发送请求 后台登录
    let { uname, pwd } = this.state;
    let res = await this.axios.post(`users/login`, {
      uname,
      pwd
    });
    console.log(res);
    let { meta, data } = res;
    if (meta.status === 200) {
      console.log("登录成功，跳转页面");
      //  1.把token给保存到浏览器本地
      localStorage.setItem("myToken", data.token);
      //  2.把userid存储起来
      localStorage.setItem("uid", data.uid);
      // 3.跳转到首页
      history.push("/home");
      // localStorage.setItem("token");
    } else {
      console.log(meta.msg);
    }
  };

  render() {
    return (
      <div className="login_container">
        <div className="login_title">登录</div>
        <div className="login_form">
          <form className="ui form">
            <div className="field">
              <div className="ui left icon input big">
                <input
                  type="text"
                  placeholder="请输入用户名"
                  autoComplete="off"
                  name="uname"
                  required
                  value={this.state.uname}
                  onChange={this.handlerChange}
                />
                <i className="user icon" />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input big">
                <input
                  type="text"
                  placeholder="请输入密码"
                  autoComplete="off"
                  name="pwd"
                  required
                  value={this.state.pwd}
                  onChange={this.handlerChange}
                />
                <i className="lock icon" />
              </div>
            </div>
            <button
              className="ui button fluid big positive"
              type="submit"
              onClick={this.login}
            >
              登录
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
