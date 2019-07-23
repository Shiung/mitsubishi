<template>
  <div class="albumLayoutPage">
    <div class="option col-12 d-flex justify-content-end align-items-center">
      <select class="custom-select select_cus font_12" v-model="sizeOption">
        <option value="none" disabled>selected</option>
        <option value="A4">A4</option>
        <option value="B3">B3</option>
        <option value="B4">B4</option>
        <option value="B5">B5</option>
      </select>
    </div>
    <div class="pt-2 pb-5 d-flex flex-wrap">
      <div class="layout_item d-flex flex-column justify-content-center align-items-center  mb-4" v-for='item in 10' :key="item">
        <input type="checkbox">
        <div class="layout_zone my-2">
          <div class="layout_box">
          </div>
        </div>
        <div class="text-center text-capitalize font_12">Layout {{item}}</div>
      </div>
    </div>

    <div class="option_zone d-flex justify-content-center align-items-center">
      <btnItem class="cancel text-capitalize" type="button" @click="cancelHandler">cancel</btnItem>
      <btnItem class="default text-capitalize ml-3" type="button" @click="saveHandler">save</btnItem>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumLayoutPage',
  data () {
    return {
      sizeOption: 'none'
    }
  },
  components: {
    btnItem: () => import('@/components/ButtonItem')
  },
  methods: {
    saveHandler () {
      console.log('save layout')
    },
    cancelHandler () {
      console.log('cancel layout')
    }
  },
  mounted () {
    // console.log('layout 取得資訊')
  }
}
</script>

<style lang="scss" scoped>
.option{
  height: 50px;
}
.select_cus{
  box-shadow: none;
  width: 150px;
  height: 30px;
  color:$color-cus-darkgray4;
  border-color:$color-cus-darkgray;
}
// layout
.layout_item{
  width: 20%;
  padding: 0 15px;
  .layout_zone{
    width: 100%;
    height: 0;
    padding-top: 80%;
    position: relative;
    .layout_box{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color : $color-cus-gray;
      background-image : linear-gradient(rgba(255,255,255,.5) 1px, transparent 0),
      linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 0);
      background-size: 10px 10px;
      background-position: left top;
      background-repeat: repeat;
    }
  }
}
</style>
