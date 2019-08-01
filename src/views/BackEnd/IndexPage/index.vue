<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'indexPage',
  data () {
    return {
      apiPath: `${process.env.VUE_APP_APIPATH}/admin`
    }
  },
  computed: {
    // vuex
    ...mapGetters('adminStore', ['adminToken', 'adminCookieKey', 'adminInfo']),
    routerName () {
      return this.$route.name
    },
    titleName () {
      switch (this.routerName) {
        // 主要頁面
        case 'memAdmin':
          return 'member list'
        case 'albumsAdmin':
          return 'Album Setting'
        case 'AlbumSizeAdmin':
          return 'Size list'
        case 'AlbumSizeAddAdmin':
          return 'add size'
        case 'AlbumCoverAdmin':
          return 'cover list'
        case 'AlbumCoverAddAdmin':
          return 'add cover'
        case 'AlbumLayoutAdmin':
          return 'layout list'
        case 'ordersAdmin':
          return 'order list'
        case 'orderEditAdmin':
          return 'order setting'
        case 'AdminstratorAdmin':
          return 'Adminstrator list'
        // 修改內頁
        case 'memEditAdmin':
          return 'member setting'
        default:
          return 'error router'
      }
    }
  },
  components: {
    navItem: () => import('@/components/NavBack'),
    sideBarItem: () => import('@/components/SideBarBack')
  },
  methods: {
    // vuex
    ...mapActions('adminStore', ['token_update', 'log_out', 'set_adminInfo']),
    async initToken () {
      let localToken = this.getlocalStorageStatus()
      if (!localToken) {
        this.$router.push({ name: 'adminLogin' })
      } else {
        await this.getAdminInfo(localToken)
      }
    },
    getAdminInfo (token) {
      let url = this.apiPath
      return this.axios.get(url, {
        headers: {
          'Authorization': token
        }
      })
        .then(res => {
          let respond = res.data.data
          this.set_adminInfo(respond)
          !this.adminToken && (this.token_update(token))
        })
        .catch(e => {
          // 登入失敗(token 過期...)
          // console.log('token 過期')
          this.log_out()
          this.$router.push({ name: 'adminLogin' })
        })
    },
    getlocalStorageStatus () {
      let key = this.adminCookieKey
      return localStorage[key] ? localStorage[key] : null
    }
  },
  created () {
    // 1. 登入進來
    if (this.adminToken) return
    // 2. 登入初始
    this.initToken()
  },
  watch: {
    adminToken (val) { !val && (this.$router.push({ name: 'adminLogin' })) }
  },
  beforeRouteUpdate (to, from, next) {
    // console.log(to)
    // console.log(from)
    next()
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
