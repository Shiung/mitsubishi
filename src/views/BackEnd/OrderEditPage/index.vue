<template>
  <div class="orderEditPage admin_page_box">
    <div class="option d-flex justify-content-between align-items-center">
      <div>
        <label class="font_14 text-capitalize w-100 mb-0">order status</label>
        <select class="custom-select select_cus font_12" v-model="orderStatus">
          <option value="0" disabled>selected</option>
          <option value="1">Approvel</option>
          <option value="2">Rejected</option>
        </select>
      </div>
      <btnItem class="default" type="button" @click="downloadPDF">Download PDF</btnItem>
    </div>
    <breadCrum class="border_top border_bottom m-0" :pathProps="breadCrumPath"/>

    <div class="box">
      <div class="text-capitalize font_12 title">order info</div>
      <div class="row mb-4">
        <div class="col-4">
          <div class="sub_title text-capitalize font_12">order time</div>
          <div class="font_14">2019-07-12 14:21:00</div>
        </div>
        <div class="col-4">
          <div class="sub_title text-capitalize font_12">member</div>
          <a href="javascript:;" class="font_14 aLink">鈴木 くるみ</a>
        </div>
      </div>

      <div class="text-capitalize font_12 title">cover info</div>
      <div class="row mb-4">
        <div class="col-4">
          <div class="sub_title text-capitalize font_12">Cover Name</div>
          <div class="font_14">Mass Market Paperback</div>
        </div>
        <div class="col-4">
          <div class="sub_title text-capitalize font_12">Cover Title</div>
          <div class="font_14">Bangkok has him now.</div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-4">
          <div class="sub_title text-capitalize font_12">Cover Images</div>
          <a href="javascript:;" class="font_14 aLink">thumbnail.png</a>
        </div>
        <div class="col-4">
          <div class="sub_title text-capitalize font_12">Sub Title</div>
          <div class="font_14">They were anthropomorphing the city of Bangkok for effect. In other words they were talking about the city as if it was a person. </div>
        </div>
      </div>

      <div class="text-capitalize font_12 title">album info</div>
      <div class="row mb-4">
        <div class="col-3">
          <div class="sub_title text-capitalize font_12">Album Name</div>
          <div class="font_14">東京日帰りツアー</div>
        </div>
        <div class="col-3">
          <div class="sub_title text-capitalize font_12">Album Type</div>
          <div class="font_14">B4</div>
        </div>
        <div class="col-3">
          <div class="sub_title text-capitalize font_12">Pages</div>
          <div class="font_14">36</div>
        </div>
        <div class="col-3 d-flex justify-content-end align-items-center">
          <btnItem class="default" type="button">Edit Album</btnItem>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-3">
          <div class="sub_title text-capitalize font_12">Download Images</div>
          <a href="javascript:;" class="font_14 aLink">ftp://root@asahi.com/20190712</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderEditPage',
  data () {
    return {
      orderStatus: '0'
    }
  },
  computed: {
    orderID () {
      return this.$route.params.id
    },
    // 麵包屑
    breadCrumPath () {
      return [
        { name: 'order list', connect: true, connectPath: 'ordersAdmin' },
        { name: this.orderID, connect: false }
      ]
    }
  },
  components: {
    breadCrum: () => import('@/components/BackBreadCrumbItem'),
    btnItem: () => import('@/components/ButtonItem')
  },
  methods: {
    downloadPDF () {
      console.log('下載 pdf')
    }
  }
}
</script>

<style lang="scss" scoped>
.orderEditPage{
  .option{
    height: 100px;
    padding: 0 15px;
    label{
      color:$color-cus-darkgray2;
    }
  }
  .select_cus{
    box-shadow: none;
    width: 150px;
    height: 30px;
    color:$color-cus-darkgray4;
    border-color:$color-cus-darkgray;
  }
  .box{
    padding: 20px 15px;
  }
  .title{
    color:$color-cus-green;
    &::after{
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: $color-cus-darkgray5;
      margin-top:5px;
      margin-bottom: 25px;
    }
  }
  .sub_title{
    color: $color-cus-darkgray4;
  }
  a.aLink{
    color:$color-cus-green;
    text-decoration: underline;
  }
}
</style>
