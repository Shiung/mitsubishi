<template>
  <div class="memberPage admin_page_box">
    <breadCrum class="border-bottom m-0" :pathProps="breadCrumPath"/>
    <div class="options d-flex justify-content-end align-items-center">
      <button class="btn font_12 d-flex justify-content-center align-items-center" type="button"><i class="material-icons font_18 mr-1">person</i>Invite Member</button>
    </div>

    <div class="table_zone">
      <div class="table_header sticky-top d-flex align-items-center border-bottom">
        <div data-column='ID'>
          <span class="font_14">ID</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Member ID</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='name'>
          <span class="font_14">名前</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Name</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='email'>
          <span class="font_14">電子郵件</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Email Address</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='addr'>
          <span class="font_14">地址</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Address</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='lastTime'>
          <span class="font_14">最後登入時間</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Lastest Login time</span>
          </div>
        </div>
      </div>

      <table class="table mb-3 position-relative">
        <tbody>
          <tr v-for="item in datatables" :key="item.id">
            <td class="font_12" data-column='ID'>{{item.id}}</td>
            <td class="font_12" data-column='name'>{{item.name}}</td>
            <td class="font_12" data-column='email'>{{item.email}}</td>
            <td class="font_12" data-column='addr'>
              <div>{{item.addresCode}}</div>
              <div>{{item.address}}</div>
            </td>
            <td class="font_12" data-column='lastTime'>{{item.loginTime}}</td>
          </tr>
          <tr v-if="datatables.length === 0">
            <td colspan="6" class="text-center">沒有資料</td>
          </tr>
        </tbody>

        <loading
          :active.sync="showLoading"
          color="rgba(36, 94, 96,1)"
          :opacity= "loadingOpacity"
          :is-full-page="fullNone"
          loader="dots"
          style="z-index: 1021;"
        >
        </loading>
      </table>
    </div>

    <paginationItem
      v-if="showPagination"
      class="mt-5"
      :currentPage='currentPage'
      :totalPages='totalPages'
      :perPage='perPage'
      :count='count'
      :totalCount='totalCount'
      @prevPage="prevPageGo"
      @nextPage="nextPageGo"
      @pageSelect="pageGo"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'memberPage',
  data () {
    return {
      // 麵包屑
      breadCrumPath: [{ name: 'member list', connect: false }],
      // 分頁
      showPagination: false,
      // loading
      showLoading: true,
      loadingOpacity: 0.8,
      fullNone: false
    }
  },
  components: {
    breadCrum: () => import('@/components/BackBreadCrumbItem'),
    paginationItem: () => import('@/components/PaginationItem')
  },
  computed: {
    // vuex
    ...mapGetters('memberTableStore', ['datatables', 'perPage', 'count', 'totalPages', 'totalCount', 'currentPage', 'paramsObj', 'paramsStatus', 'trashStatus'])
  },
  methods: {
    // vuex
    ...mapActions('memberTableStore', ['getDatatable', 'getRequestParams', 'setParamsStatus', 'setTrashStatus']),
    async init () {
      this.showLoading = true
      this.showPagination = false
      this.getRequestParams()
      await this.getDatatable()
      this.$nextTick().then(() => {
        this.showLoading = false
        this.showPagination = true
      })
    },
    // 分頁
    prevPageGo () {
      console.log('上一頁')
    },
    nextPageGo () {
      console.log('下一頁')
    },
    pageGo (val) {
      console.log(`前往 ${val}`)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.memberPage{
  .options{
    height: 50px;
    padding-right: 15px;
    border-bottom: 1px solid $color-cus-gray;
    color:$color-cus-darkgray4;
    >button{
      padding: 3px 10px;
      border-radius: 15px;
      background-color: $color-cus-green;
      color:#fff;
      box-shadow: none;
      transition: .3s;
      &:hover{
        filter: brightness(110%)
      }
    }
  }
}

// table customer
$width1: 110px; // ID
$width2: 120px; // name
$width3: 200px; // email
$width4: 135px; // lastlogin

[data-column=ID] {
  width: $width1;
}
[data-column=name] {
  width: $width2;
}
[data-column=email] {
  width: $width3;
}
[data-column=lastTime] {
  width: $width4;
}
[data-column=addr] {
  width: calc( 100% - #{$width1} - #{$width2} - #{$width3} - #{$width4});
  word-break: break-all;
}
</style>
