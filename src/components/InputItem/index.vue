<template>
  <div class="form-group InputItem">
    <label><slot/></label>
    <input
      v-if="controlType === 'input'"
      class="form-control rounded-0"
      v-bind="$attrs"
      :class="inputClass"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    <textarea
      v-if="controlType === 'textarea'"
      class="form-control rounded-0"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"></textarea>

    <slot name="error"></slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'InputItem',
  props: {
    controlType: {
      type: String,
      default: 'input'
    },
    value: {
      type: [ String, Number ]
    },
    inputClass: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
label {
  font-size: 14px;
  color:$color-cus-darkgray2;
}
input{
  height: 32px;
}
input,
textarea{
  font-size: 14px;
  // box-shadow: none !important;
  // border-color: $color-cus-darkgray5 !important;
  // outline: none;
  width: 100%;
  &:focus{
    box-shadow: none !important;
    border-color: $color-cus-green-back;
  }
}
</style>
