<template>
  <button
    class="btn buttonItem d-flex justify-content-center align-items-center"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'buttonItem'
}
</script>

<style lang="scss" scoped>
@mixin btnStyle ($className: default, $bgColor: #ccc, $width: 250px, $height: 50px, $fontColor: #ccc, $letter-space: 1px, $fontSize: 14px ) {
  &.#{$className}{
    background-color: $bgColor;
    height: $height;
    width: $width;
    padding:0;
    color:$fontColor;
    letter-spacing: $letter-space;
    font-size: $fontSize;
    cursor: pointer;
    overflow: hidden;
    transition: .2s;
    border-radius: 15px;
    box-shadow: none;
    &:hover{
      filter: brightness(110%);
    }
  }
}
.buttonItem{
  @include btnStyle(default, $color-cus-green, 130px, 30px, white, 0, 14px) ;
  @include btnStyle(cancel, $color-cus-darkgray, 130px, 30px, white, 0, 14px) ;
}
</style>
