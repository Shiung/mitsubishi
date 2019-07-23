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
          name: 'AlbumsPage',
          component: () => import(/* webpackChunkName: "AlbumsPage" */ '@/views/FrontEnd/AlbumsPage')
        },
        {
          path: 'createAlbum',
          name: 'createAlbumPage',
          component: () => import(/* webpackChunkName: "CreateAlbumPage" */ '@/views/FrontEnd/CreateAlbumPage')
        },
        {
          path: 'editAlbumPage/:id',
          name: 'editAlbumPage',
          meta: { dataChangeCheck: true },
          component: () => import(/* webpackChunkName: "EditAlbumPage" */ '@/views/FrontEnd/EditAlbumPage')
        },
        {
          path: 'signup',
          name: 'signupPage',
          component: () => import(/* webpackChunkName: "SignupPage" */ '@/views/FrontEnd/SignupPage')
        },
        {
          path: 'userSetting',
          name: 'userSettingPage',
          component: () => import(/* webpackChunkName: "UserSettingPage" */ '@/views/FrontEnd/UserSettingPage')
        }
      ]
    },
    // 後台 (管理者)
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      redirect: '/admin/member',
      component: () => import(/* webpackChunkName: "BackEnd" */ './views/BackEnd/IndexPage'),
      children: [
        {
          path: 'member',
          name: 'memAdmin',
          component: () => import(/* webpackChunkName: "MemberPage" */ '@/views/BackEnd/MemberPage')
        },
        {
          path: 'member/:id',
          name: 'memEditAdmin',
          component: () => import(/* webpackChunkName: "MemberEditPage" */ '@/views/BackEnd/MemberEditPage')
        },
        {
          path: 'albums',
          name: 'albumsAdmin',
          component: () => import(/* webpackChunkName: "AlbumsPage" */ '@/views/BackEnd/AlbumsPage')
        },
        {
          path: 'orders',
          name: 'ordersAdmin',
          component: () => import(/* webpackChunkName: "OrderPage" */ '@/views/BackEnd/OrderPage')
        },
        {
          path: 'orders/:id',
          name: 'orderEditAdmin',
          component: () => import(/* webpackChunkName: "OrderEditPage" */ '@/views/BackEnd/OrderEditPage')
        },
        {
          path: 'Adminstrators',
          name: 'AdminstratorAdmin',
          component: () => import(/* webpackChunkName: "AdminstratorPage" */ '@/views/BackEnd/AdminstratorPage')
        }
      ]
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: () => import(/* webpackChunkName: "admin login" */ '@/views/BackEnd/Login')
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "404" */ '@/views/PageNotFound.vue')
    }
  ]
})
