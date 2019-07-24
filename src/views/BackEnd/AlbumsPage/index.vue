<script>
export default {
  name: 'albumsPage',
  components: {
    breadCrum: () => import('@/components/BackBreadCrumbItem')
  },
  computed: {
    routerName () {
      return this.$route.name
    },
    // 麵包屑
    breadCrumPath () {
      let path = [
        { name: 'Albums Setting', connect: true, connectPath: 'albumsAdmin' }
      ]
      switch (this.routerName) {
        case 'AlbumSizeAdmin':
          path.push({
            name: 'size list', connect: false
          })
          break
        case 'AlbumSizeAddAdmin':
          path.push(
            { name: 'size list', connect: true, connectPath: 'AlbumSizeAdmin' },
            { name: 'add size', connect: false }
          )
          break
        case 'AlbumCoverAdmin':
          path.push({
            name: 'cover list', connect: false
          })
          break
        case 'AlbumCoverAddAdmin':
          path.push(
            { name: 'cover listt', connect: true, connectPath: 'AlbumCoverAdmin' },
            { name: 'add cover', connect: false }
          )
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
