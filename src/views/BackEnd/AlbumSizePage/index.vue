<template>
  <div class="albumSizePage">
    <div class="option d-flex justify-content-end align-items-center">
      <btnItem class="default text-capitalize" @click="$router.push({name: 'AlbumSizeAddAdmin'})"><i class="material-icons font_18 mr-1">add</i>create size</btnItem>
    </div>

    <div class="table_zone">
      <div class="table_header sticky-top d-flex align-items-center border-bottom border-top">
        <div data-column='size'>
          <span class="font_14">尺寸</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">size</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='type'>
          <span class="font_14">類別</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Type</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='width'>
          <span class="font_14">寬</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Width(mm)</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='height'>
          <span class="font_14">高</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Height(mm)</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='descript'>
          <span class="font_14">描述</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Description</span>
          </div>
        </div>
        <div data-column='status'>
          <span class="font_14">狀態</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Status</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='action'>
          <span class="font_14">動作</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Action</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
      </div>

      <table class="table mb-3 position-relative">
        <tbody>
          <tr v-for="item in datatables" :key="item.id">
            <td class="font_12" data-column='size'>{{item.size}}</td>
            <td class="font_12" data-column='type'>{{item.type}}</td>
            <td class="font_12" data-column='width'>{{item.width}}</td>
            <td class="font_12" data-column='height'>{{item.height}}</td>
            <td class="font_12" data-column='descript'>{{item.description}}</td>
            <td class="font_12" data-column='status'>
              <div class="d-flex align-items-center albumStatus" :class="{'inactive' : item.status === 0}">
                <i class="material-icons font_14 mr-1">{{item.status === 1 ? 'check_circle' : 'cancel'}}</i> {{item.status | statusFilter}}
              </div>
            </td>
            <td class="font_12" data-column='action'>
              <div class="d-flex align-items-center">
                <btnItem class="p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
                    <path fill="#666" fill-rule="evenodd" d="M11.779 13.444l-.387.387a.481.481 0 0 1-.236.134l-2.02.489c-.354.067-.657-.236-.573-.573l.455-2.037a.543.543 0 0 1 .134-.236l.556-.555 2.24 2.222-.17.169-2.23-2.231 6.204-6.204 2.238 2.238-6.204 6.204-.007-.007zm5.068 3.822h-.017v-6.719l1.532-1.532v8.47a1.3 1.3 0 0 1-1.313 1.296H5.313A1.3 1.3 0 0 1 4 17.484V6.204c0-.708.59-1.297 1.313-1.297h8.352l-1.532 1.532h-6.6v10.827h11.314zm3.014-12.561a.478.478 0 0 1 0 .673l-.993.994-2.24-2.24.994-.993a.478.478 0 0 1 .673 0l1.566 1.566z"/>
                  </svg>
                </btnItem>
                <btnItem class="p-0 ml-2" @click="deleteHandler(item.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
                    <path fill="#666" fill-rule="evenodd" d="M8.347 6.653A2.067 2.067 0 0 1 10.372 5h2.205c1 0 1.833.71 2.025 1.653h1.832c1.141 0 2.066.925 2.066 2.066a.413.413 0 0 1-.827 0 1.24 1.24 0 0 0-1.24-1.24H7.067a1.24 1.24 0 0 0-1.24 1.24.413.413 0 0 1-.826 0c0-1.14.925-2.066 2.066-2.066h1.281zm.856 0h4.543a1.24 1.24 0 0 0-1.17-.826h-2.204c-.54 0-.999.344-1.169.826zM7.48 17.673h8.54V8.168a.413.413 0 1 1 .827 0v9.919a.413.413 0 0 1-.413.413H7.066a.413.413 0 0 1-.413-.413V8.168a.413.413 0 1 1 .827 0v9.505zm1.377-7.852c0-.228.224-.413.5-.413s.5.185.5.413v6.613c0 .228-.224.413-.5.413s-.5-.185-.5-.413V9.82zm2.755 0c0-.228.224-.413.5-.413s.5.185.5.413v6.613c0 .228-.224.413-.5.413s-.5-.185-.5-.413V9.82zm2.755 0c0-.228.224-.413.5-.413s.5.185.5.413v6.613c0 .228-.224.413-.5.413s-.5-.185-.5-.413V9.82z"/>
                  </svg>
                </btnItem>
              </div>
            </td>
          </tr>
          <tr v-if="datatables.length === 0">
            <td colspan="7" class="text-center">沒有資料</td>
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
  name: 'AlbumSizePage',
  data () {
    return {
      // loading
      showLoading: true,
      loadingOpacity: 0.8,
      fullNone: false,
      // 分頁
      showPagination: false
    }
  },
  components: {
    btnItem: () => import('@/components/ButtonItem'),
    paginationItem: () => import('@/components/PaginationItem')
  },
  filters: {
    statusFilter (val) {
      return val === 1 ? 'active' : 'in active'
    }
  },
  computed: {
    // vuex
    ...mapGetters('albumSizeTableStore', ['datatables', 'perPage', 'count', 'totalPages', 'totalCount', 'currentPage', 'paramsObj', 'paramsStatus', 'trashStatus'])
  },
  methods: {
    // vuex
    ...mapActions('albumSizeTableStore', ['initData', 'getDatatable', 'getRequestParams', 'setParamsStatus', 'setTrashStatus']),
    async init () {
      this.initData()
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
    },
    // list action
    deleteHandler (id) {
      console.log(`刪除ID: ${id}`)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.albumSizePage{
  .option{
    height: 50px;
    padding: 0 15px;
  }
}

// table customer
$width1: 70px; // size
$width2: 100px; // type
$width3: 100px; // width
$width4: 100px; // height
$width5: 100px; // status
$width6: 120px; // action

[data-column=size] {
  width: $width1;
}
[data-column=type] {
  width: $width2;
}
[data-column=width] {
  width: $width3;
}
[data-column=height] {
  width: $width4;
}
[data-column=status] {
  width: $width5;
}
[data-column=action] {
  width: $width6;
}
[data-column=descript] {
  width: calc( 100% - #{$width1} - #{$width2} - #{$width3} - #{$width4} - #{$width5} - #{$width6});
  word-break: break-all;
}

.albumStatus{
  i {
    color: $color-cus-green;
  }
  &.inactive{
    i {
      color: $color-cus-red;
    }
  }
}
</style>
