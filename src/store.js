import Vue from 'vue'
import Vuex from 'vuex'

import albumChangeStore from './storeModule/albumChangeStore'
// 後台
import memberTableStore from './storeModule/admin/memberTableStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deviceCheck: false // true => 移動裝置 || false => pc
  },
  mutations: {
    DEVICEUPDATE (state, payload) {
      state.deviceCheck = payload
    }
  },
  actions: {
    device_status (context, params) {
      context.commit('DEVICEUPDATE', deviceMethods())
    }
  },
  getters: {
    deviceMobileStatus: state => state.deviceCheck
  },
  modules: {
    albumChangeStore,
    memberTableStore
  }
})

function deviceMethods () {
  // 判斷裝置
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
