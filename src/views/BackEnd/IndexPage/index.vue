<script>
export default {
  name: 'indexPage',
  computed: {
    routerName () {
      return this.$route.name
    }
  },
  components: {
    navItem: () => import('@/components/NavBack'),
    sideBarItem: () => import('@/components/SideBarBack')
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
