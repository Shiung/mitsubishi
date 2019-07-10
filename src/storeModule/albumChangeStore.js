export default {
  // ***state 屬於模組區域變數
  // ***actions , mutations , getters 屬於全域變數
  namespaced: true, // ***加入此設定 actions , mutations , getters 屬於區域變數
  state: {
    changeData: []
  },
  actions: {
    update_data (context, params) {
      context.commit('UPDATECHANGE', params)
    },
    delete_data (context, params) {
      context.commit('DELETECHANGE', params)
    },
    reset_data (context, params) {
      context.commit('RESETCHANGE')
    }
  },
  mutations: {
    UPDATECHANGE (state, payload) {
      const updateIndex = state.changeData.findIndex(item => item.id === payload.id)
      updateIndex === -1 ? state.changeData.push(payload) : state.changeData[updateIndex] = payload
    },
    DELETECHANGE (state, payload) {
      const deleteIndex = state.changeData.findIndex(item => item.id === payload.id)
      deleteIndex !== -1 && state.changeData.splice(deleteIndex, 1)
    },
    RESETCHANGE (state) {
      state.changeData = []
    }
  },
  // 運用getters 可以在其他頁面 用 mapGetters 方式 取代compute 抓取store 的方式
  getters: {
    changeData: state => state.changeData
  }
}
