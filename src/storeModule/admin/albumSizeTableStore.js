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
    initData (context, params) {
      context.commit('DATATABLE', [])
      context.commit('PERPAGE', 1)
      context.commit('CURRENTPAGES', 1)
      context.commit('COUNT', 1)
      context.commit('TOTALCOUNT', 1)
      context.commit('TOTALPAGES', 1)
    },
    getDatatable (context, params){
      let data = [
        { id: 1,size: 'B4', type: 'Horizontal', width: '250', height: '353', description: '東京日帰りツアー', status: 1 },
        { id: 2,size: 'B4', type: 'Vertical', width: '353', height: '250', description: 'A night in paradise', status: 0 },
        { id: 3,size: 'A4', type: 'Horizontal', width: '297', height: '210', description: '買東西..吃東西..買東西..吃東西', status: 1 },
        { id: 4,size: 'A4', type: 'Square', width: '210', height: '210', description: '楽園の夜', status: 1 },
        { id: 5,size: 'B5', type: 'Square', width: '176', height: '176', description: 'Been There... Done That!', status: 1 },
        { id: 6,size: 'B5', type: 'Vertical', width: '176', height: '250', description: '1234', status: 1 },
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
