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
    initData (context) {
      context.commit('DATATABLE', [])
      context.commit('PERPAGE', null)
      context.commit('CURRENTPAGES', null)
      context.commit('COUNT', null)
      context.commit('TOTALCOUNT', null)
      context.commit('TOTALPAGES', null)
    },
    getDatatable (context, params){
      // let data = [
      //   { id: 1, name: '入山 杏奈', email: 'peter@emai.com', addresCode: '580-0015',address: '4-23-7 Shindou, Matsubara, Osaka', loginTime: '2019-07-11 14:20:11' },
      //   { id: 2, name: '加藤 玲奈', email: 'jack@emai.com', addresCode: '104-0031',address: 'Kyobashi MID Bldg., 13-10, Kyobashi 2-chome, Chuo-ku, Tokyo', loginTime: '2019-07-11 14:20:11' },
      //   { id: 3, name: '後藤 萌咲', email: 'syun_wei@emai.com', addresCode: '153-0051',address: 'Risonanakameguro Bldg, 2-16-13 Kamimeguro, Meguro, Tokyo', loginTime: '2019-07-11 14:20:11' },
      //   { id: 4, name: '篠崎 彩奈', email: 'marty@emai.com', addresCode: '162-0812',address: '6-17 Nishigoken, Shinjuku, Tokyo', loginTime: '2019-07-11 14:20:11' },
      //   { id: 5, name: '鈴木 くるみ', email: 'mpm@emai.com', addresCode: '106-0031',address: 'FUJIFILM Nishiazabu Bldg, 2-26-30 Nishiazabu, Minato, Tokyo', loginTime: '2019-07-11 14:20:11' },
      //   { id: 6, name: '田口 愛佳', email: 'asahi@emai.com', addresCode: '338-0002',address: '15-7, 3-chome, Shimoochiai, Chuo-ku, Saitama-shi, Saitama', loginTime: '2019-07-11 14:20:11' },
      //   { id: 7, name: '入山 杏奈', email: 'mpm@emai.com', addresCode: '153-0051',address: 'Risonanakameguro Bldg, 2-16-13 Kamimeguro, Meguro, Tokyo', loginTime: '2019-07-11 14:20:11' },
      //   { id: 8, name: '加藤 玲奈', email: 'mpm@emai.com', addresCode: '153-0051',address: 'Risonanakameguro Bldg, 2-16-13 Kamimeguro, Meguro, Tokyo', loginTime: '2019-07-11 14:20:11' },
      //   { id: 9, name: '後藤 萌咲', email: 'mpm@emai.com', addresCode: '153-0051',address: 'Risonanakameguro Bldg, 2-16-13 Kamimeguro, Meguro, Tokyo', loginTime: '2019-07-11 14:20:11' },
      //   { id: 10, name: '篠崎 彩奈', email: 'mpm@emai.com', addresCode: '153-0051',address: 'Risonanakameguro Bldg, 2-16-13 Kamimeguro, Meguro, Tokyo', loginTime: '2019-07-11 14:20:11' },
      //   { id: 11, name: '鈴木 くるみ', email: 'mpm@emai.com', addresCode: '153-0051',address: 'Risonanakameguro Bldg, 2-16-13 Kamimeguro, Meguro, Tokyo', loginTime: '2019-07-11 14:20:11' },
      //   { id: 12, name: '入山 杏奈', email: 'peter@emai.com', addresCode: '580-0015',address: '4-23-7 Shindou, Matsubara, Osaka', loginTime: '2019-07-11 14:20:11' },
      //   { id: 13, name: '加藤 玲奈', email: 'jack@emai.com', addresCode: '104-0031',address: 'Kyobashi MID Bldg., 13-10, Kyobashi 2-chome, Chuo-ku, Tokyo', loginTime: '2019-07-11 14:20:11' },
      //   { id: 14, name: '後藤 萌咲', email: 'syun_wei@emai.com', addresCode: '153-0051',address: 'Risonanakameguro Bldg, 2-16-13 Kamimeguro, Meguro, Tokyo', loginTime: '2019-07-11 14:20:11' },
      //   { id: 15, name: '篠崎 彩奈', email: 'marty@emai.com', addresCode: '162-0812',address: '6-17 Nishigoken, Shinjuku, Tokyo', loginTime: '2019-07-11 14:20:11' }
      // ]
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     context.commit('DATATABLE', data)
      //     context.commit('PERPAGE', data.length)
      //     context.commit('CURRENTPAGES', 1)
      //     context.commit('COUNT', 1)
      //     context.commit('TOTALCOUNT', data.length)
      //     context.commit('TOTALPAGES', 1)
      //     resolve()
      //   },2000)
      // })
      let token = context.rootState.adminStore.adminToken
      return this._vm.axios.get(`${process.env.VUE_APP_APIPATH}/member`, {
        headers: {
          'Authorization': token
        },
        params: context.state.paramsObj
      })
        .then(res => { 
          let resData = res.data
          context.commit('DATATABLE', resData.data)
          context.commit('PERPAGE', resData.meta.pagination.per_page)
          context.commit('CURRENTPAGES', resData.meta.pagination.current_page)
          context.commit('COUNT', resData.meta.pagination.count)
          context.commit('TOTALCOUNT', resData.meta.pagination.total)
          context.commit('TOTALPAGES', resData.meta.pagination.total_pages)
        })
        .catch(e => {
          console.dir(e)
          // console.log(e.response.data.code)
          // 權限過期
          if (e.response.data.code === 401) {
            // 登出
            context.dispatch('adminStore/log_out', null,{ root : true })
          } 
        })
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
