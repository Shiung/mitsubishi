<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <nav aria-label="pagination">
      <ul class="pagination pagination-sm">
        <!-- 上一頁 function  -->
        <li class="page-item d-flex align-items-center" :class="{'disabled' : currentPage === 1}">
          <a class="page-link border-0" href="javascript:;" tabindex="-1" @click.prevent='prevPage'><i class="material-icons font_20">keyboard_arrow_left</i></a>
        </li>
        <!-- 多於頁數 front -->
        <li class="page-item" v-if="currentPage > 5">
          <a class="left_page page-link border-0" href="javascript:;">...</a>
        </li>
        <!-- 頁數(顯示五頁) -->
        <li class="page-item" v-for="item in pageList" :key="item">
          <a class="page-link border-0" :class="{'active' : item === currentPage}" href="javascript:;" @click.prevent="pageSelect(item)">{{item}}</a>
        </li>
        <!-- 多於頁數 back -->
        <li class="page-item disabled" v-if="totalPages - currentPage > 4">
          <a class="left_page page-link border-0" href="javascript:;">...</a>
        </li>
        <!-- 下一頁 function  -->
        <li class="page-item d-flex align-items-center" :class="{'disabled' : currentPage === totalPages}">
          <a class="page-link border-0" href="javascript:;" @click.prevent='nextPage'><i class="material-icons font_20">keyboard_arrow_right</i></a>
        </li>
      </ul>
    </nav>
    <p class="font_12">{{dataInfo}}</p>
  </div>
</template>

<script>
export default {
  name: 'paginationItem',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 1
    },
    count: {
      type: Number,
      default: 1
    },
    totalCount: {
      type: Number,
      default: 1
    }
  },
  computed: {
    dataInfo () {
      let currentPage = this.currentPage
      let perPage = this.perPage
      let count = this.count
      let totalPage = this.totalPages
      let totalCount = this.totalCount
      if (totalPage === 1) {
        return `${totalCount} 筆資料`
      } else {
        let from = (currentPage - 1) * perPage + 1
        let to = from + count - 1
        return `顯示 ${from} 到 ${to} 筆資料 ，  總共 ${totalCount} 筆資料`
      }
    },
    pageList () {
      let currentPage = this.currentPage
      let totalPage = this.totalPages
      let pageArr = []

      // 方法一
      let start = totalPage <= 5 || currentPage <= 5 // 總頁數 或是 當前頁數小於等於 5 --> 起始: 1
        ? 1 : totalPage - currentPage < 5 // 當前頁數 之剩餘頁數 小於5 ? 總頁數 - 4(最後5頁) : 當前頁數-2(中間五頁)
          ? totalPage - 4 : currentPage - 2
      let end = totalPage <= 5 || totalPage - currentPage < 5 // 總頁數小於等於5 或是 當前頁數之剩餘頁數 小於5 -> 結尾 總頁數
        ? totalPage : currentPage <= 5 // 當前頁數小於等於 5 ? 結尾 = 5 : 結尾 = 當前頁數+2(中間五頁)
          ? 5 : currentPage + 2

      // 方法二
      // let start = 0
      // let end = 0
      // 總頁數小於5
      // if (totalPage <= 5) {
      //   start = 1
      //   end = totalPage
      // } else if (totalPage - currentPage < 5) {
      //   // 剩餘小於等於 5頁 (顯示五頁)
      //   start = totalPage - 4
      //   end = totalPage
      // } else if (currentPage <= 5) {
      //   // 前面 5頁 (顯示五頁)
      //   start = 1
      //   end = 5
      // } else {
      //   // 其餘頁面 (顯示五頁)
      //   start = currentPage - 2
      //   end = currentPage + 2
      // }
      while (start <= end) {
        pageArr.push(start)
        start++
      }
      return pageArr
    }
  },
  methods: {
    prevPage () { this.currentPage > 1 && this.$emit('prevPage') },
    nextPage () { this.currentPage < this.totalPages && this.$emit('nextPage') },
    pageSelect (val) { val !== this.currentPage && this.$emit('pageSelect', val) }
  }
}
</script>

<style lang="scss" scoped>
.page-item{
  height: 30px;
  > a {
    height: 100%;
    color: $color-cus-darkgray4;
    transition: .3s;
    box-shadow: none;
    &.active{
      color:$color-cus-green;
    }
    &:hover{
      background-color: transparent;
      color: lighten($color-cus-green, 5%);
    }
  }
  &.disabled {
    a{
      color:$color-cus-gray;
      &.left_page{
        color:$color-cus-darkgray2;
        text-decoration: none;
      }
    }
  }
}
</style>
