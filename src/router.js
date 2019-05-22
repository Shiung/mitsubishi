import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 前台
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "FrontEnd" */ '@/views/FrontEnd/IndexPage'),
      redirect: '/',
      children: [
        {
          path: '',
          name: 'IndexPage',
          component: () => import(/* webpackChunkName: "IndexPage" */ '@/views/FrontEnd/AlbumsPage')
        }
      ]
    },
    // 前台 (管理者)
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "BackEnd" */ './views/BackEnd/IndexPage')
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "404" */ '@/views/PageNotFound.vue')
    }
  ]
})
