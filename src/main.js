import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 加载全局样式
import './styles/index.less'

// 导入动态设置rem 基准值
import 'amfe-flexible'

import '@/utils/dayjs'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
