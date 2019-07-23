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
        { id: 1,size: 'B4', coverName: 'Hardback', description: '注意!!只有三種尺寸不會收裁切費：9x5.4、10.8x9、18x5.4其他特殊尺寸5盒內裁1模,皆收50元裁切費用10盒100以此類推.......', status: 1 },
        { id: 2,size: 'B4', coverName: 'Paperback', description: '此材質無法拼模製作 不適用於水性筆書寫/蓋章/燙金、銀/打流水號 紙面極為細緻平滑，不透明度高，稍具亮面有質感，擁有細膩真實的色彩還原度，適用於品質要求極高之印刷品。數量(100/盒)正負5張誤差', status: 0 },
        { id: 3,size: 'A4', coverName: 'Trade Paperback', description: '注意!!只有三種尺寸不會收裁切費：9x5.4、10.8x9、18x5.4 其他特殊尺寸5盒內裁1模,皆收50元裁切費用10盒100以此類推.......', status: 1 },
        { id: 4,size: 'A4', coverName: 'Mass Market Paperback', description: '注意!!只有三種尺寸不會收裁切費：9x5.4、10.8x9、18x5.4其他特殊尺寸5盒內裁1模,皆收50元裁切費用10盒100以此類推.......', status: 1 },
        { id: 5,size: 'B5', coverName: 'Hardback', description: '此材質無法拼模製作 不適用於水性筆書寫/蓋章/燙金、銀/打流水號 紙面極為細緻平滑，不透明度高，稍具亮面有質感，擁有細膩真實的色彩還原度，適用於品質要求極高之印刷品。數量(100/盒)正負5張誤差', status: 1 },
        { id: 6,size: 'B5', coverName: 'Paperback', description: '此材質無法拼模製作 不適用於水性筆書寫/蓋章/燙金、銀/打流水號 紙面極為細緻平滑，不透明度高，稍具亮面有質感，擁有細膩真實的色彩還原度，適用於品質要求極高之印刷品。數量(100/盒)正負5張誤差', status: 1 }
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
