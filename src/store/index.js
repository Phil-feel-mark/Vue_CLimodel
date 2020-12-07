import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'

Vue.use(Vuex)
const TOKEN_NAME = 'TOUTIAO_USER'
export default new Vuex.Store({
  // 数据中心
  state: {
    // user: window.localStorage.getItem(TOKEN_NAME) ? JSON.parse(
    //   window.localStorage.getItem(TOKEN_NAME)
    // ) : null
    user: getItem(TOKEN_NAME)
  },
  mutations: {
    // setUser (state, data) {
    //   state.user = data
    //   window.localStorage.setItem(TOKEN_NAME, JSON.stringify(data))
    // }
    setUser (state, data) {
      state.user = data
      setItem(TOKEN_NAME, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
