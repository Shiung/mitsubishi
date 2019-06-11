import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'
// loading
import Loading from 'vue-loading-overlay'
// vue image loading
import VueLazyload from 'vue-lazyload'
// vue snotify
import Snotify, { SnotifyPosition } from 'vue-snotify'

Vue.config.productionTip = false

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
