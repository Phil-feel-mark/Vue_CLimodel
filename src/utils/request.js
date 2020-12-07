/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store/index'
import jsonBig from 'json-bigint'
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/app/'
  baseURL: 'http://toutiao-app.itheima.net/', // 基地址

  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers = {
    Authorization: store.state.user ? `Bearer ${store.state.user.token}` : null
  }
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
export default request
