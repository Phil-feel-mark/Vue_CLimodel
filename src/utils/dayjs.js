// 引入 dayjs
import dayjs from 'dayjs'
// 语言包
import Vue from 'vue'
import 'dayjs/locale/zh-cn.js'

// 引入 时间过滤
import relativeTime from 'dayjs/plugin/relativeTime'
// 注册
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 默认预言

// 定义过滤器
Vue.filter('relativeTime', (value) => {
  return dayjs().from(dayjs(value)) // 2 年以前
})
