import React from "react";
import { Item, Tab, Icon } from "semantic-ui-react";
import Tloader from "react-touch-loader";
import "./info.css";

class Info extends React.Component {
  render() {
    const panes = [
      {
        menuItem: "资讯",
        render: () => (
          <Tab.Pane>
            <M1 />
          </Tab.Pane>
        )
      },
      {
        menuItem: "头条",
        render: () => (
          <Tab.Pane>
            <M2 />
          </Tab.Pane>
        )
      },
      {
        menuItem: "问答",
        render: () => (
          <Tab.Pane>
            <M3 />
          </Tab.Pane>
        )
      }
    ];
    return (
      <div className="info">
        <div className="info_title">资讯</div>
        <div className="info_content">
          <Tab panes={panes} className="info_tab" />
        </div>
      </div>
    );
  }
}

export default Info;

function M1() {
  return <Loader type="1" />;
}
function M2() {
  return <Loader type="2" />;
}
function M3() {
  return <Loader type="3" />;
}

// 资讯、头条共有组件
function Massege({ data }) {
  return (
    <Item.Group unstackable>
      {data.map(item => (
        <Item key={item.id}>
          <Item.Image size="small" src="http://47.96.21.88:8086/public/1.png" />
          <Item.Content verticalAlign="middle">
            <Item.Header className="info-title">{item.info_title}</Item.Header>
            <Item.Meta>
              <span className="price">$1200</span>
              <span className="stay">1 Month</span>
            </Item.Meta>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
}

function AskAnswer({data}) {
  return (
    <ul className="info-ask-list">
      {data.map(item => (
        <li key={item.id}>
          <div className="title">
            <span className="cate">
              <Icon color="green" name="users" size="small" />
              思维
            </span>
            <span>
              你好你好你好你好你好你好你好你好你好你好你好你好你好你好
            </span>
          </div>
          <div className="user">
            <Icon circular name="users" size="mini" />
            张三的回答
          </div>
          <div className="info">
            你好你好你好你好你好你好你好你好你好你好你好你好你好你好
          </div>
          <div className="tag">
            <span>你好X</span>
            <span>你好X</span>
            <span>你好X</span>
            <span>123个回答</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

// 定义 touch-loader组件
class Loader extends React.Component {
  constructor() {
    super();
    this.state = {
      hasMore: false,
      initializing: 1,
      pagenum: 0,
      pagesize: 2,
      list: [],
      total: 0
    };
  }

  // 加载数据发送ajax 请求后台数据
  loadData = () => {
    console.log(this.props);

    return this.axios
      .post("infos/list", {
        type: this.props.type,
        pagenum: this.state.pagenum,
        pagesize: this.state.pagesize
      })
      .then(res => {
        // console.log("三合一数据", res);
        let { data, meta } = res;
        if (meta.status === 200) {
          return data.list;
        }
      });
  };

  // 需要在组件渲染的时候，动态的加载数据
  async componentDidMount() {
    let data = await this.loadData();
    let newNum = this.state.pagenum + this.state.pagesize;
    this.setState({
      list: data.data,
      initializing: 2,
      toal: data.total,
      pagenum: newNum,
      hasMore: newNum < data.total
    });
  }

  // 下拉刷新
  refresh = async (resolve, reject) => {
    //  重置初始的条数
    this.setState({
      pagenum: 0
    });

    setTimeout(async () => {
      let data = await this.loadData();
      let newNum = this.state.pagenum + this.state.pagesize;
      this.setState({
        list: data.data,
        pagenum: newNum,
        hasMore: newNum < data.total
      });
      resolve();
    }, 0);
  };

  // 加载更多
  loadMore = async (resolve, reject) => {
    let data = await this.loadData();
    let newNum = this.state.pagenum + this.state.pagesize;
    let newList = [...this.state.list, ...data.data];
    this.setState({
      list: newList,
      // 结束进度条
      initializing: 2,
      toal: data.total,
      pagenum: newNum,
      hasMore: newNum < data.total
    });
    resolve();
  };

  render() {
    let { hasMore, initializing, list } = this.state;
    let { type } = this.props;
    return (
      <div className="view">
        <Tloader
          className="main"
          onRefresh={this.refresh}
          onLoadMore={this.loadMore}
          hasMore={hasMore}
          initializing={initializing}
        >
          {type === '3' ? <AskAnswer data={list} /> : <Massege data={list} />}
        </Tloader>
      </div>
    );
  }
}
