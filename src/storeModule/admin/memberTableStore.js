import ParamsObj from '@/assets/js/params.js'

/* eslint-disable */
export default {
  // ***state 屬於模組區域變數
  // ***actions , mutations , getters 屬於全域變數
  namespaced: true, // ***加入此設定 actions , mutations , getters 屬於區域變數
  state: {
    datas: [],
    paramsObj: {},
    perPage: 15, // 單頁50筆
    totalPages: null,
    count: null,
    currentPage: null,
    totalCount: null,
    paramsStatus: false, // 記憶舊的paramsObj 狀態 下次reload 不更新
    trashStatus: false // 黑名單資料切換
  },
  actions: {
    getDatatable (context, params){
      let data = [
        { id: 1, fname: 'Mark', lname: 'Tot' },
        { id: 2, fname: 'Mark2', lname: 'Tot2' },
        { id: 3, fname: 'Mark3', lname: 'Tot3' },
        { id: 4, fname: 'Mark4', lname: 'Tot4' },
        { id: 5, fname: 'Mark5', lname: 'Tot5' },
        { id: 6, fname: 'Mark6', lname: 'Tot6' },
        { id: 7, fname: 'Mark7', lname: 'Tot7' },
        { id: 8, fname: 'Mark8', lname: 'Tot8' },
        { id: 9, fname: 'Mark9', lname: 'Tot9' },
        { id: 10, fname: 'Mark10', lname: 'Tot10' },
        { id: 11, fname: 'Mark11', lname: 'Tot11' }
      ]
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('DATATABLE', data)
          context.commit('PERPAGE', data.length)
          context.commit('CURRENTPAGES', 1)
          context.commit('COUNT', 1)
          context.commit('TOTALCOUNT', data.length)
          context.commit('TOTALPAGES', 1)
          resolve()
        },2000)
      })
      // return this._vm.axios.get(`${process.env.VUE_APP_APIPATH}/member`)
      //   .then(res => {
      //     let resData = res.data
      //     context.commit('DATATABLE', resData)
      //     context.commit('PERPAGE', resData.length)
      //     context.commit('CURRENTPAGES', 1)
      //     context.commit('COUNT', 1)
      //     context.commit('TOTALCOUNT', resData.length)
      //     context.commit('TOTALPAGES', 1)
      //   })
      //   .catch(e => {
      //     console.log(e)
      //     this._vm.$snotify.error(`request error`, {
      //       showProgressBar: true,
      //       pauseOnHover: false,
      //       closeOnClick: true
      //     })
      //   })
    },
    getRequestParams (context, newParams) {
      let paramsObj = ''
      if (newParams) {
        paramsObj = new ParamsObj({...newParams})
      } else {
        paramsObj = new ParamsObj({})
      }
      context.commit('SETPARAMSOBJ', paramsObj)
    },
    setParamsStatus (context, status) {
      context.commit('PARAMSSTATUS', status)
    },
    setTrashStatus (context, status) {
      context.commit('TRASHSTATUS', status)
    }
  },
  mutations: {
    DATATABLE ( state, payload ) {
      state.datas = payload
    },
    PERPAGE ( state, payload ) {
      state.perPage = payload
    },
    COUNT ( state, payload ) {
      state.count = payload
    },
    TOTALPAGES ( state, payload ) {
      state.totalPages = payload
    },
    CURRENTPAGES ( state, payload ) {
      state.currentPage = payload
    },
    TOTALCOUNT ( state, payload ) {
      state.totalCount = payload
    },
    SETPARAMSOBJ ( state, payload ) {
      state.paramsObj = payload
    },
    PARAMSSTATUS ( state, payload ) {
      state.paramsStatus = payload
    },
    TRASHSTATUS ( state, payload ) {
      state.trashStatus = payload
    }
  },
  // 運用getters 可以在其他頁面 用 mapGetters 方式 取代compute 抓取store 的方式
  getters: {
    datatables: state => state.datas,
    perPage: state => state.perPage,
    count: state => state.count,
    totalCount: state => state.totalCount,
    currentPage: state => state.currentPage,
    totalPages: state => state.totalPages,
    paramsObj: state => state.paramsObj,
    paramsStatus: state => state.paramsStatus,
    trashStatus: state => state.trashStatus
  }
}
