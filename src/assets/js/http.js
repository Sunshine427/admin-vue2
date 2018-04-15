// 该模块用来处理axios请求的三个问题
// 1. 多次通过import引入axios
// 2. 每次发送axios请求都要输入基准路径
// 3. 每次发送axios请求，都要在请求头中添加headers 将token发送到服务器
import axios from 'axios'
// 从auth的js文件中获取 获取token的函数
import {getToken} from './auth.js'

// -----创建axios实例 在实例中添加header
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// ======解决每次都在header中添加token  请求拦截器
http.interceptors.request.use(function (config) {
  // console.log(config)
  // 如果是非登陆页面才添加token，因为请求login页面时还没有token
  if (config.url !== '/login') {
    config.headers['Authorization'] = getToken()
  }
  // 相当于next，没有下面的就不会运行
  return config
}, function (error) {
  return Promise.reject(error)
})

// ========解决前两个问题====
// 0. 创建一个空对象
const httpPlugin = {}
// 1. 添加install方法
httpPlugin.install = function (Vue, options) {
  // 组件也是vue实例 给原型添加方法 实例通过this可以访问到
  // 添加发送请求的http方法 前面添加$与实例中的data中的数据区分
  Vue.prototype.$http = http
}

// 2. 导出
export default httpPlugin
// 3. 在Vue根实例中使用
