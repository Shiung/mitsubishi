import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
// loading
import Loading from 'vue-loading-overlay'
// vue image loading
import VueLazyload from 'vue-lazyload'
// vue snotify
import Snotify, { SnotifyPosition } from 'vue-snotify'
// vue2-dropzone
import vue2Dropzone from 'vue2-dropzone'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
axios.defaults.headers.common['Accept'] = 'application/json'

// loading
Vue.component('loading', Loading) // 全域使用
// vue image loading
Vue.use(VueLazyload, {
  lazyComponent: true,
  attempt: 1
})
// vue snotify
const options = {
  toast: {
    position: SnotifyPosition.rightBottom,
    timeout: 5000,
    showProgressBar: false, // true,
    closeOnClick: false,
    pauseOnHover: true // false
  }
}
Vue.use(Snotify, options)

// vue2-dropzone
Vue.component('vueDropzone', vue2Dropzone) // 全域使用

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 導航守衛 ==> 要在router 變動下才會觸發
router.beforeEach((to, from, next) => {
  let vm = router.app
  // 有暫存相簿修改內容
  if (from.meta.dataChangeCheck) {
    if (store.state.albumChangeStore.changeData.length !== 0) {
      vm.$snotify.error(`相簿有異動請先儲存或是取消設定`, {
        position: SnotifyPosition.centerCenter,
        showProgressBar: true,
        pauseOnHover: false,
        closeOnClick: true
      })
      next(false)
    } else next()
  } else {
    next()
  }
})

// 跳轉頁面後返回頂部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
