<script>
export default {
  name: 'albumsPage',
  components: {
    breadCrum: () => import('@/components/BackBreadCrumbItem')
  },
  computed: {
    // 麵包屑
    breadCrumPath () {
      let routerName = this.$route.name
      let path = [
        { name: 'Albums Setting', connect: true, connectPath: 'albumsAdmin' }
      ]
      switch (routerName) {
        case 'AlbumSizeAdmin':
          path.push({
            name: 'size list', connect: false
          })
          break
        case 'AlbumCoverAdmin':
          path.push({
            name: 'cover list', connect: false
          })
          break
        case 'AlbumLayoutAdmin':
          path.push({
            name: 'layout list', connect: false
          })
          break
        default:
          break
      }
      return path
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
