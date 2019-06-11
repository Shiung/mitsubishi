<script>
import { mapActions } from 'vuex'
export default {
  name: 'indexPage',
  components: {
    navItem: () => import('@/components/NavFront'),
    footerItem: () => import('@/components/FooterItem')
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
