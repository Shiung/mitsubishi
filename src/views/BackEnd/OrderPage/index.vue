<template>
  <div class="orderPage admin_page_box pb-1">
    <breadCrum class="border_bottom m-0" :pathProps="breadCrumPath"/>
    <div class="options d-flex justify-content-end align-items-center position-relative">
      <button class="btn d-flex justify-content-center align-items-center font_14" type="button" @click="filterOpen = !filterOpen">
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
          <path fill="none" fill-rule="evenodd" stroke="#666" stroke-linecap="round" stroke-linejoin="round" d="M9.833 13.375a7.002 7.002 0 0 1-5.333-6.8V4.908h14v1.667a7.002 7.002 0 0 1-5.333 6.8v4.867l-3.334 1.333v-6.2zm-6-8.467h15.334H3.833z"/>
        </svg>
        <span class="ml-1">filter</span>
      </button>
      <transition name="navShow" mode="out-in" appear>
        <div class="position-absolute filterBox shadow-sm" v-if="filterOpen">
          <div class="trangle"></div>
          <div class="content px-3">
            <div class="filterTitle font_14">狀態 / Status</div>
            <div class="custom-control custom-checkbox checkBox_cus">
              <input type="checkbox" class="custom-control-input" id="approvelCheck">
              <label class="custom-control-label" for="approvelCheck">Approvel</label>
            </div>
            <div class="custom-control custom-checkbox checkBox_cus">
              <input type="checkbox" class="custom-control-input" id="rejectCheck">
              <label class="custom-control-label" for="rejectCheck">Rejected</label>
            </div>

            <div class="border-bottom my-3"></div>

            <div class="filterTitle font_14">尺寸 / Size</div>
            <div class="custom-control custom-checkbox checkBox_cus">
              <input type="checkbox" class="custom-control-input" id="sizeA4Check">
              <label class="custom-control-label" for="sizeA4Check">A4</label>
            </div>
            <div class="custom-control custom-checkbox checkBox_cus">
              <input type="checkbox" class="custom-control-input" id="sizeB3Check">
              <label class="custom-control-label" for="sizeB3Check">B3</label>
            </div>
            <div class="custom-control custom-checkbox checkBox_cus">
              <input type="checkbox" class="custom-control-input" id="sizeB4Check">
              <label class="custom-control-label" for="sizeB4Check">B4</label>
            </div>
            <div class="custom-control custom-checkbox checkBox_cus">
              <input type="checkbox" class="custom-control-input" id="sizeB5Check">
              <label class="custom-control-label" for="sizeB5Check">B5</label>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="table_zone">
      <div class="table_header sticky-top d-flex align-items-center border-bottom">
        <div data-column='no'>
          <span class="font_14">編號</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">NO</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='albumName'>
          <span class="font_14">相簿名稱</span>
          <div class="d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Album Name</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='size'>
          <span class="font_14">尺寸</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Size</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='member'>
          <span class="font_14">會員名稱</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Member</span>
          </div>
        </div>
        <div data-column='orderTime'>
          <span class="font_14">訂單時間</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Order Time</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='imagePath'>
          <span class="font_14">下載位置</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Image Path</span>
            <i class="material-icons font_16">play_arrow</i>
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
          </div>
        </div>
      </div>
      <table class="table mb-3">
        <tbody>
          <tr v-for="item in 15" :key="item">
            <td class="font_12" data-column='no'>201907120001</td>
            <td class="font_12" data-column='albumName'><a href="javascript:;">東京日帰りツアー</a></td>
            <td class="font_12" data-column='size'>B4</td>
            <td class="font_12" data-column='member'><a href="javascript:;">鈴木 くるみ</a></td>
            <td class="font_12" data-column='orderTime'>
              <div>2019-07-12</div>
              <div>14:00:32</div>
            </td>
            <td class="font_12" data-column='imagePath'>
              <a href="javascript:;">ftp://peter@www.abc. com/406940c0449a0bfa</a>
            </td>
            <td class="font_12" data-column='status'>approved</td>
            <td class="font_12" data-column='action'>
              <div class="d-flex align-items-center">
                <button class="btn d-flex align-items-center p-0"><i class="material-icons font_18">visibility</i></button>
                <button class="btn d-flex align-items-center p-0 ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
                    <path fill="#666" fill-rule="evenodd" d="M11.779 13.444l-.387.387a.481.481 0 0 1-.236.134l-2.02.489c-.354.067-.657-.236-.573-.573l.455-2.037a.543.543 0 0 1 .134-.236l.556-.555 2.24 2.222-.17.169-2.23-2.231 6.204-6.204 2.238 2.238-6.204 6.204-.007-.007zm5.068 3.822h-.017v-6.719l1.532-1.532v8.47a1.3 1.3 0 0 1-1.313 1.296H5.313A1.3 1.3 0 0 1 4 17.484V6.204c0-.708.59-1.297 1.313-1.297h8.352l-1.532 1.532h-6.6v10.827h11.314zm3.014-12.561a.478.478 0 0 1 0 .673l-.993.994-2.24-2.24.994-.993a.478.478 0 0 1 .673 0l1.566 1.566z"/>
                  </svg>
                </button>
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
</template>

<script>
export default {
  name: 'orderPage',
  data () {
    return {
      breadCrumPath: [{ name: 'order list', connect: false }],
      // filter
      filterOpen: false,
      // pagination test
      currentPage: 1,
      totalPages: 13,
      perPage: 15,
      count: 15,
      totalCount: 100
    }
  },
  components: {
    breadCrum: () => import('@/components/BackBreadCrumbItem'),
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
$filterHeight: 317px;

.orderPage{
  .options{
    height: 50px;
    padding-right: 15px;
    border-bottom: 1px solid $color-cus-gray;
    color:$color-cus-darkgray4;
    >button{
      padding: 0;
      width: 80px;
      height: 30px;
      border-radius: 15px;
      background-color: white;
      color:$color-cus-darkgray4;
      border-color:$color-cus-gray;
      box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    }
    .filterBox{
      z-index: 1021;
      width: 283px;
      height: $filterHeight;
      border: solid 1px $color-cus-gray;
      background-color: white;
      bottom: -($filterHeight + 4px );
      right: 15px;
      .trangle{
        content: '';
        display: block;
        width:0;
        height:0;
        position: absolute;
        top: -10px;
        right: 35px;
        border-style: solid;
        border-width: 0px 10px 10px 10px;
        border-color: transparent transparent $color-cus-gray transparent;
        &::after{
          content: '';
          display: block;
          width:0;
          height:0;
          position: absolute;
          bottom: -12px;
          right: -10px;
          border-style: solid;
          border-width: 0px 10px 10px 10px;
          border-color: transparent transparent #fff transparent;
        }
      }
      .content{
        // padding: 15px;
        height:auto;
        max-height: $filterHeight;
        overflow-y: auto;
        .filterTitle{
          margin-top: 5px;
          padding: 5px 0;
        }
        &::-webkit-scrollbar {
          width: 3px;
        }
        &::-webkit-scrollbar-track {
          // box-shadow: inset 0 0 4px rgba(0,0,0,0.1);
          border-radius: 3px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 3px;
          background-color: $color-cus-green;
        }
      }
    }
  }
}

// table customer
$width1: 120px; // no
$width2: 140px; // albumName
$width3: 70px; // size
$width4: 120px; // member
$width5: 120px; // orderTime
$width6: 100px; // status
$width7: 100px; // action

[data-column=no] {
  width: $width1;
}
[data-column=albumName] {
  width: $width2;
}
[data-column=size] {
  width: $width3;
}
[data-column=member] {
  width: $width4;
}
[data-column=orderTime] {
  width: $width5;
}
[data-column=imagePath] {
  width: calc( 100% - #{$width1} - #{$width2} - #{$width3} - #{$width4} - #{$width5} - #{$width6} - #{$width7});
  word-break: break-all;
}
[data-column=status] {
  width: $width6;
}
[data-column=action] {
  width: $width7;
}
</style>
