import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'
// loading
import Loading from 'vue-loading-overlay'

Vue.config.productionTip = false

// loading
Vue.component('loading', Loading) // 全域使用

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
