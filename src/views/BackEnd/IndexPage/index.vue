<script>
export default {
  name: 'indexPage',
  computed: {
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
        case 'ordersAdmin':
          return 'order list'
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
  beforeRouteUpdate (to, from, next) {
    // console.log(to)
    // console.log(from)
    next()
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
