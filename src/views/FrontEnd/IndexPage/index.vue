<script>
import { mapActions } from 'vuex'
export default {
  name: 'indexPage',
  components: {
    navItem: () => import('@/components/NavFront'),
    footerItem: () => import('@/components/FooterItem'),
    titleItem: () => import('@/components/TitleItem')
  },
  computed: {
    routerName () {
      let routerName = this.$route.name
      switch (routerName) {
        case 'AlbumsPage':
          return 'albums list'
        case 'ordersPage':
          return 'order list'
        case 'createAlbumPage':
          return 'create album'
        case 'editAlbumPage':
          return 'edit album'
        case 'signupPage':
          return 'sign up'
        case 'userSettingPage':
          return 'user setting'
        default:
          return 'error'
      }
    }
  },
  methods: {
    // vuex
    ...mapActions(['device_status'])
  },
  mounted () {
    // 判斷裝置
    this.device_status()
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
