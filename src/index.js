import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './App';

// 引入公共的index.css样式文件
import './index.css'
 
// 配置全局的axios
// 把axios对象绑定到React组件的原型上，将来所有的React组件都能访问到axios对象
import axios from 'axios'
React.Component.prototype.axios = axios

// 配置全局公共路径.给axios配置全局默认路径

// 在线接口
axios.defaults.baseURL='http://47.96.21.88:8086/'
// 本地后台接口
// axios.defaults.baseURL='http://localhost:9999/'

// 添加axios响应拦截器
axios.interceptors.response.use(function(response){
  // 拦截到axios所有的请求，直接返回响应结果中的data数据
  return response.data
},function(error){
  return error
})

// 添加axios请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('111',config);
  
  if(!window.location.href.endsWith('/login')){
    config.headers.Authorization = localStorage.getItem('myToken')
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})


ReactDOM.render(<App />, document.getElementById('root'));
