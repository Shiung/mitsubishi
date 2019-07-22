<template>
  <ol class="BackBreadCrumbItem d-flex justify-content-start align-items-center">
    <li class="breadcrumb_items font_14 d-flex align-items-center" v-for="(item, key) in pathProps" :key="key">
      <span class="text-capitalize" v-if="!item.connect">{{item.name}}</span>
      <router-link class="text-capitalize" :to='{name: item.connectPath}' v-else>{{item.name}}</router-link>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'BackBreadCrumbItem',
  props: {
    pathProps: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
  .BackBreadCrumbItem{
    list-style: none;
    background-color: $color-cus-darkgray3;
    color:$color-cus-darkgray4;
    padding: 5px 15px;
    .breadcrumb_items{
      & + .breadcrumb_items::before{
        display: inline-block;
        padding: 0 0.5rem;
        content: ">";
      }
      > a{
        text-decoration: none;
        color: $color-cus-green;
      }
    }
    &.border_top {
      border-top: 1px solid $color-cus-gray;
    }
    &.border_bottom {
      border-bottom: 1px solid $color-cus-gray;
    }
  }
</style>
