<template>
  <div class="ordersPage">
    <div class="container">
      <div class="row">
        <div class="content_main_box shadow-sm w-100">

          <div class="table_zone">
            <div class="table_header sticky-top d-md-flex align-items-center border-bottom d-none">
              <div data-column='datetime' class="flex-shrink-0">
                <span class="font_14">時間</span>
                <div class="font_12 d-flex align-items-center subTitle">
                  <span class="font_12 mr-2">Datetime</span>
                  <i class="material-icons font_16">play_arrow</i>
                </div>
              </div>
              <div data-column='albumName' class="flex-shrink-0">
                <span class="font_14">相簿名稱</span>
                <div class="d-flex align-items-center subTitle">
                  <span class="font_12 mr-2">Album Name</span>
                  <i class="material-icons font_16">play_arrow</i>
                </div>
              </div>
              <div data-column='status' class="flex-shrink-0">
                <span class="font_14">狀態</span>
                <div class="font_12 d-flex align-items-center subTitle">
                  <span class="font_12 mr-2">Status</span>
                  <i class="material-icons font_16">play_arrow</i>
                </div>
              </div>
              <div data-column='action' class="flex-shrink-0">
                <span class="font_14">動作</span>
                <div class="font_12 d-flex align-items-center subTitle">
                  <span class="font_12 mr-2">Action</span>
                </div>
              </div>
            </div>
            <table class="table mb-3">
              <thead class="d-md-none">
                <tr>
                  <th data-column='datetime'>
                    <span class="font_14">時間</span>
                    <div class="font_12 d-flex align-items-center subTitle">
                      <span class="font_12 mr-2">Datetime</span>
                      <i class="material-icons font_16">play_arrow</i>
                    </div>
                  </th>
                  <th data-column='albumName'>
                    <span class="font_14">相簿名稱</span>
                    <div class="d-flex align-items-center subTitle">
                      <span class="font_12 mr-2">Album Name</span>
                      <i class="material-icons font_16">play_arrow</i>
                    </div>
                  </th>
                  <th data-column='status'>
                    <span class="font_14">狀態</span>
                    <div class="font_12 d-flex align-items-center subTitle">
                      <span class="font_12 mr-2">Status</span>
                      <i class="material-icons font_16">play_arrow</i>
                    </div>
                  </th>
                  <th data-column='action'>
                    <span class="font_14">動作</span>
                    <div class="font_12 d-flex align-items-center subTitle">
                      <span class="font_12 mr-2">Action</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in 25" :key="item">
                  <td class="font_12" data-column='datetime'>2019-06-17 15:32:00</td>
                  <td class="font_12" data-column='albumName'><a href="javascript:;">ビバリーヒルズ - それが私が行きたいところです！</a></td>
                  <td class="font_12" data-column='status'>Waiting for approval</td>
                  <td class="font_12" data-column='action'>
                    <div class="d-flex align-items-center">
                      <button class="btn d-flex align-items-center p-0"><i class="material-icons font_18">visibility</i></button>
                      <button class="btn d-flex align-items-center p-0 mx-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
                          <path fill="#666" fill-rule="evenodd" d="M11.779 13.444l-.387.387a.481.481 0 0 1-.236.134l-2.02.489c-.354.067-.657-.236-.573-.573l.455-2.037a.543.543 0 0 1 .134-.236l.556-.555 2.24 2.222-.17.169-2.23-2.231 6.204-6.204 2.238 2.238-6.204 6.204-.007-.007zm5.068 3.822h-.017v-6.719l1.532-1.532v8.47a1.3 1.3 0 0 1-1.313 1.296H5.313A1.3 1.3 0 0 1 4 17.484V6.204c0-.708.59-1.297 1.313-1.297h8.352l-1.532 1.532h-6.6v10.827h11.314zm3.014-12.561a.478.478 0 0 1 0 .673l-.993.994-2.24-2.24.994-.993a.478.478 0 0 1 .673 0l1.566 1.566z"/>
                        </svg>
                      </button>
                      <button class="btn d-flex align-items-center p-0"><i class="material-icons font_18">cancel</i></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <paginationItem
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrdersPage',
  data () {
    return {
      // pagination test
      currentPage: 1,
      totalPages: 13,
      perPage: 15,
      count: 15,
      totalCount: 100
    }
  },
  components: {
    paginationItem: () => import('@/components/PaginationItem')
  },
  methods: {
    prevPageGo () {
      console.log('上一頁')
    },
    nextPageGo () {
      console.log('下一頁')
    },
    pageGo (val) {
      console.log(`前往 ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
// table customer
$width1: 200px; // datetime
$width2: 180px; // status
$width3: 100px; // action

$width1-md: 150px; // datetime
$width2-md: 150px; // status
$width3-md: 100px; // action

$width1-sm: 100px; // datetime
$width2-sm: 150px; // status
$width3-sm: 100px; // action

[data-column=datetime] {
  width: $width1;
}
[data-column=status] {
  width: $width2;
}
[data-column=action] {
  width: $width3;
}
[data-column=albumName] {
  width: calc( 100% - #{$width1} - #{$width2} - #{$width3});
  word-break: break-all;
}
@media screen and (max-width: 991px) {
  [data-column=datetime] {
    width: $width1-md;
  }
  [data-column=status] {
    width: $width2-md;
  }
  [data-column=action] {
    width: $width3-md;
  }
  [data-column=albumName] {
    width: calc( 100% - #{$width1-md} - #{$width2-md} - #{$width3-md});
    word-break: break-all;
    min-width: 200px;
  }
}
@media screen and (max-width: 767px) {
  .table_zone{
    overflow: auto;
    max-height:400px;
  }
  table{
    table-layout:fixed;
    thead {
      .subTitle{
        color:$color-cus-darkgray4;
        > i {
          transition: .5s;
          transform: rotateZ(90deg);
          &.sort_up {
            color: $color-cus-lightblue;
            transform: rotateZ(-90deg)
          }
          &.sort_down {
            color: $color-cus-lightblue;
            transform: rotateZ(90deg)
          }
        }
      }
    }
  }
  [data-column=datetime] {
    width: $width1-sm;
  }
  [data-column=status] {
    width: $width2-sm;
  }
  [data-column=action] {
    width: $width3-sm;
  }
  [data-column=albumName] {
    width: 200px;
    word-break: break-all;
  }
}
</style>
