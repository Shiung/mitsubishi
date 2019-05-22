<script>
export default {
  name: 'indexPage',
  components: {
    navItem: () => import('@/components/NavFront'),
    footerItem: () => import('@/components/FooterItem')
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
