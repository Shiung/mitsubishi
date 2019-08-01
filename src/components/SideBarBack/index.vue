<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'sideBarBack',
  computed: {
    // vuex
    ...mapGetters('adminStore', ['adminInfo'])
  },
  methods: {
    // vuex
    ...mapActions('adminStore', ['log_out'])
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
