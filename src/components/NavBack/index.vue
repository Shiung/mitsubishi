<script>
export default {
  name: 'navBack',
  props: {
    titleProps: {
      type: String,
      default: 'title' // 'Album Setting'
    }
  },
  data () {
    return {
      showTitle: true
    }
  },
  watch: {
    titleProps (val) {
      this.showTitle = false
      this.$nextTick(() => {
        this.showTitle = true
      })
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
