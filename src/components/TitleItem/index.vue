<script>
export default {
  name: 'titleItem',
  props: {
    title: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      showTitle: true
    }
  },
  watch: {
    title (val) {
      this.showTitle = false
      this.$nextTick().then(() => {
        this.showTitle = true
      })
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
