import React from "react";
import "./my.css";
import { Modal, Button } from "semantic-ui-react";

import AvatarEditor from "react-avatar-editor";

class My extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      username: "",
      isShowSelect: false,
      isShowCrop: false,
      avatarFile: ""
    };
  }

  // 点击头像是否显示模态框
  showSelect = () => {
    this.setState({
      isShowSelect: true
    });
  };

  // 显示裁切图片模态框  关闭选择头像模态框
  showCrop = file => {
    console.log("2222", file);

    this.setState({
      //  1.关闭选择头像模态框
      isShowSelect: false,
      // 2. 收集提交的图片
      avatarFile: file,
      // 3.显示图裁切模态框
      isShowCrop: true
    });
  };

  // 关闭裁切图片模态框
  closeCrop = avatar => {
    this.setState({
      isShowCrop: false,
      avatar: avatar
    });
  };

  // 页面加载的时候，发送请求 获取到个人信息
  async componentDidMount() {
    let res = await this.axios.post("my/info", {
      user_id: localStorage.getItem("uid")
    });
    // console.log(res);
    let { meta, data } = res;
    if (meta.status === 200) {
      this.setState({
        avatar: data.avatar,
        username: data.username
      });
    }
  }

  render() {
    return (
      <div className="my-container">
        <SelectAvatar open={this.state.isShowSelect} showCrop={this.showCrop} />
        <CropAvatar
          open={this.state.isShowCrop}
          avatarFile={this.state.avatarFile}
          closeCrop={this.closeCrop}
        />
        <div className="my-title">
          <img src="http://127.0.0.1:9999/public/my-bg.png" />
          <div className="myicon">
            <img src={this.state.avatar} onClick={this.showSelect} />
          </div>
          <div className="info">
            <div className="name">{this.state.username}</div>
            <button className="ui green button">个人认证</button>
            <div className="edit">编辑个人资料</div>
          </div>
        </div>
        <div className="my_content">
          <div className="item">
            <i className="heart icon big" />
            <p>看房记录</p>
          </div>
          <div className="item">
            <i className="heart icon big" />
            <p>我的订单</p>
          </div>
          <div className="item">
            <i className="heart icon big" />
            <p>我的收藏</p>
          </div>
          <div className="item">
            <i className="heart icon big" />
            <p>个人资料</p>
          </div>
          <div className="item">
            <i className="heart icon big" />
            <p>身份认证</p>
          </div>
          <div className="item">
            <i className="heart icon big" />
            <p>联系我们</p>
          </div>
        </div>
      </div>
    );
  }
}

export default My;

// 定义选中头像的弹出组件
class SelectAvatar extends React.Component {
  constructor(props) {
    super(props);
    // React组件提供的图片收集方法
    this.fileRef = React.createRef();
  }

  submitFile = () => {
    console.log(this.fileRef.current.files[0]);

    // 获取到提交的文件，传递给父组件My
    let file = this.fileRef.current.files[0];
    // 然后把file传给父组件
    // 子组件 通过props可以访问到父组件的属性和方法
    // react是单向数据流，核心，就是只能父到子， 所有的数据都交给父组件，然后子组件在获取父组件的方法
    this.props.showCrop(file);
  };

  render() {
    console.log(this.props);
    let { open } = this.props;
    return (
      <div>
        {/* 弹窗组件 */}
        <Modal size="small" open={open}>
          <Modal.Header>选择图片</Modal.Header>
          <Modal.Content>
            <input type="file" ref={this.fileRef} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="确定"
              onClick={this.submitFile}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

// 裁切图片的弹窗
class CropAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1
    };
  }

  handleScale = e => {
    this.setState({
      scale: e.target.value - 0
    });
  };

  // 设置编辑的ref
  setEditorRef = editor => (this.editor = editor);

  // 发送ajax请求 上传裁切的图片
  submitAvatar = async () => {
    let avatar = this.editor.getImageScaledToCanvas().toDataURL();
    let res = await this.axios.post("my/avatar", {
      avatar: avatar
    });
    let { meta } = res;
    if (meta.status === 200) {
      //  修改成功后，需要关闭模态框(只有父组件才能关闭) 调用父组件关闭模态框的方法
      // 并且把裁切后的图片传给父组件
      this.props.closeCrop(avatar);
    }
  };

  render() {
    let { open, avatarFile } = this.props;

    return (
      <Modal size="small" open={open}>
        <Modal.Header>上传头像</Modal.Header>
        <Modal.Content>
          <AvatarEditor
            ref={this.setEditorRef}
            borderRadius={100}
            image={avatarFile}
            width={200}
            height={200}
            border={50}
            color={[255, 255, 255, 0.8]} // RGBA
            scale={this.state.scale}
            rotate={0}
          />
          <div>
            <span className="avatar-zoom">缩放:</span>
            <input
              name="scale"
              type="range"
              min="1"
              max="2"
              step="0.01"
              value={this.state.scale}
              onChange={this.handleScale}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="确定"
            onClick={this.submitAvatar}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}
