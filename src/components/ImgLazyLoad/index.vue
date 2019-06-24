<script>
export default {
  name: 'imgLazyLoad',
  props: {
    imgUrl: {
      type: String,
      default: null
    },
    imgLoading: {
      type: String,
      default: `${process.env.BASE_URL}img/image_Loading.png`
    },
    imgError: {
      type: String,
      default: `${process.env.BASE_URL}img/image_error.png`
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
