/* eslint-disable */
export default {
  // ***state 屬於模組區域變數
  // ***actions , mutations , getters 屬於全域變數
  namespaced: true, // ***加入此設定 actions , mutations , getters 屬於區域變數
  state: {
    adminToken: '',
    adminCookieKey: 'MPM_admin_token',
    adminInfo: {}
  },
  actions: {
    // 後台權限
    token_update (context, newToken) {
      let token = newToken
      context.commit('TOKENUPDATE', token)
      context.dispatch('set_localStorage')
      console.log('後台 更新token')
    },
    log_out (context) {
      let token = ''
      let obj = {}
      context.commit('TOKENUPDATE', token)
      context.dispatch('set_adminInfo', obj)
      context.dispatch('remove_localStorage')
    },
    set_adminInfo (context, obj) {
      context.commit('ADMININFOUPDATE', obj)
    },
    set_localStorage (context) {
      let key = context.state.adminCookieKey
      let tooken = context.state.adminToken
      localStorage.setItem(key, tooken)
      console.log('後台 更新token in localstorage')
    },
    remove_localStorage (context) {
      let key = context.state.adminCookieKey
      localStorage.removeItem(key)
    }
  },
  mutations: {
    TOKENUPDATE (state, payload) {
      state.adminToken = payload
    },
    ADMININFOUPDATE (state, payload) {
      state.adminInfo = payload
    }
  },
  getters: {
    adminToken: state => state.adminToken,
    adminCookieKey: state => state.adminCookieKey,
    adminInfo: state => state.adminInfo
  }
}
