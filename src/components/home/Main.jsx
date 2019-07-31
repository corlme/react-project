import React from "react";

// 引入react轮播图插件 react-image-gallery
import "react-image-gallery/styles/css/image-gallery.css";
// 导入轮播图组件
import ImageGallery from "react-image-gallery";

import { Icon, Image } from "semantic-ui-react";

import "./Main.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
      menuList: [],
      InfoList: [],
      faqList: [],
      houseList: []
    };
  }
  render() {
    return (
      <div className="main">
        <div className="search">
          <div className="ui icon input fluid">
            <input type="text" placeholder="搜房源..." />
            <i className="circular search link icon" />
          </div>
        </div>

        <div className="content">
          <ImageGallery
            items={this.state.imgList}
            showFullscreenButton={false}
            showThumbnails={false}
            showPlayButton={false}
            showBullets={true}
          />
          <MenuList data={this.state.menuList} />
          <Info data={this.state.InfoList} />
          <Faq data={this.state.faqList} />
          <HouseList data={this.state.houseList} />
        </div>
      </div>
    );
  }

  // 获取轮播图
  getImgList = async () => {
    let res = await this.axios.post("homes/swipe");
    let { data, meta } = res;
    if (meta.status === 200) {
      this.setState({
        imgList: data.list
      });
    }
  };

  // 获取主页分类数据
  getMenuList = async () => {
    let res = await this.axios.post("homes/menu");

    let { data, meta } = res;
    if (meta.status === 200) {
      this.setState({
        menuList: data.list
      });
    }
  };

  // 获取主页资讯数据
  getInfoList = async () => {
    let res = await this.axios.post("homes/info");
    console.log("主页资讯", res);

    let { data, meta } = res;
    if (meta.status === 200) {
      this.setState({
        InfoList: data.list
      });
    }
  };

  // 获取好客问答数据
  getFaqList = async () => {
    let res = await this.axios.post("homes/faq");
    // console.log("好客问答", res);

    let { data, meta } = res;
    if (meta.status === 200) {
      this.setState({
        faqList: data.list
      });
    }
  };

  // 获取房屋数据
  getHouseList = async () => {
    let res = await this.axios.post("homes/house");
    // console.log("房屋数据", res);

    let { data, meta } = res;
    if (meta.status === 200) {
      this.setState({
        houseList: data.list
      });
    }
  };

  // 页面加载完成的钩子函数
  componentDidMount() {
    this.getImgList();
    this.getMenuList();
    this.getInfoList();
    this.getFaqList();
    this.getHouseList();
  }
}

export default Main;

// 主页菜单组件
function MenuList(props) {
  let { data } = props;
  return (
    <div className="menu">
      <div className="ui four column grid big">
        {data.map(item => (
          <div className="column" key={item.id}>
            <div className="ui">
              <Icon className="big home icon myIcon" />
              <p>{item.menu_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 主页资讯组件
function Info(props) {
  let { data } = props;
  return (
    <div className="menu_info">
      <div className="info_img">
        <Image src="../../../public/zixun.png" />
      </div>
      {data.map(item => (
        <div className="info_content" key={item.id}>
          <span>限购｜</span>
          <span>{item.info_title}</span>
        </div>
      ))}
      <div className="info_more">
        <Icon name="angle right" size="big" />
      </div>
    </div>
  );
}

// 好客问答组件
function Faq(props) {
  let { data } = props;
  return (
    <div className="home_faq">
      <div className="faq_title">好客问答</div>
      {data.map(item => (
        <div className="faq_content" key={item.question_id}>
          <Icon className="question circle outline" />
          <span>{item.question_name}</span>

          {item.question_tag.split(",").map(tag => (
            <button className="ui mini positive basic button" key={tag}>
              {tag}
            </button>
          ))}

          <div className="faq_msg">
            {item.atime} <Icon className="comment alternate outline" />
            {item.qnum}
          </div>
        </div>
      ))}
    </div>
  );
}

// 房屋组件
function HouseList({ data }) {
  let newHouse = [];
  let oldHouse = [];
  let hireHouse = [];

  data.forEach(item => {
    let temp = (
      <div className='house_main' key={item.id}>
        {/* <div className="house_img"> */}
          <Image className='house_img' src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564295948621&di=398e8a4761d0e8f8866cfc080f552a67&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_pic%2F17%2F03%2F03%2F75d77b410ed558a2b4ea5b7310f1b590.jpg" />
        {/* </div> */}
        <div className="house_content">
          <p>{item.home_name}</p>
          <p>{item.home_desc}</p>
          {item.home_tags.split(',').map(tag => (
            <button className="ui positive basic button mini" key={tag}>{tag}</button>
          ))}
          <p>{item.home_price}</p>
        </div>
      </div>
    );
    if(item.home_type === 1){
      newHouse.push(temp)
    }else if(item.home_type === 2){
      oldHouse.push(temp)
    } else {
      hireHouse.push(temp)
    }

  });

  return (
    <div className="house">
      <div>
        <div className="house-title">最新开盘</div>
        {newHouse}
      </div>

      <div>
        <div className="house-title">二手精选</div>
        {oldHouse}
      </div>

      <div>
        <div className="house-title">组一个家</div>
        {hireHouse}
      </div>
    </div>
  );
}
