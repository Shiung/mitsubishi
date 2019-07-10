<script>
import { mapGetters, mapActions } from 'vuex'
import { SnotifyPosition } from 'vue-snotify'
import $ from 'jquery'
export default {
  name: 'editAlbumPage',
  data () {
    return {
      opened: false, // true,
      // data
      albumsApi: [],
      albumSelectID: null
    }
  },
  computed: {
    // vuex
    ...mapGetters('albumChangeStore', ['changeData']),
    titleHistory () {
      return 'edit album'
    },
    pageSelect () {
      return this.$route.query.id || this.albumSelectID
    },
    selectAlbum () {
      let selectId = this.pageSelect ? this.pageSelect : this.albumSelectID
      return this.albumsApi.find(item => item.id === selectId)
    }
  },
  components: {
    titleItem: () => import('@/components/TitleItem'),
    layerBox: () => import('@/components/LayerItem')
  },
  methods: {
    // vuex
    ...mapActions('albumChangeStore', ['reset_data']),
    async initPage () {
      await this.getFullList()
      this.scrollListNav()
    },
    getFullList () {
      this.opened = false
      return this.axios.get(`${process.env.VUE_APP_APIPATH}/albums`)
        .then(res => {
          this.albumSelectID = res.data[0].id
          this.albumsApi = res.data
          this.opened = true
        })
        .catch(e => console.log(e))
    },
    page (p) {
      this.$router.push({ name: 'editAlbumPage', query: { id: p } })
    },
    // 側邊欄位置設定
    scrollListNav () {
      this.$nextTick(() => {
        let el = this.$el.querySelector('.left')
        let target = el.querySelector('.active')
        if (!target) return false

        if (window.innerWidth > 767) {
          let topOffset = target.offsetTop - 2
          // 桌機 直立
          $(el).animate({
            'scrollTop': topOffset
          }, 'slow')
        } else {
          // rwd 橫式
          let offsetNum =
            target.offsetLeft -
            el.offsetLeft -
            el.offsetWidth / 2 +
            target.offsetWidth / 2
          $(el).animate({
            'scrollLeft': offsetNum
          }, 'slow')
        }
      })
    },
    // 儲存或是 reset data
    saveAlbum () {
      console.log(this.changeData)
    },
    resetAlbum () {
      this.opened = false
      this.reset_data().then(() => {
        this.opened = true
      })
    },
    // 畫面離開提示
    leavePage (e) {
      let dialogText = 'data not save'
      e.returnValue = dialogText
      return dialogText
    },
    windowListener () {

    }
  },
  mounted () {
    this.initPage()
  },
  watch: {
    changeData (val) {
      if (val.length > 0) {
        window.addEventListener('beforeunload', this.leavePage)
      } else {
        window.removeEventListener('beforeunload', this.leavePage)
      }
    }
  },
  beforeDestroy () {
    // 清除 監聽事件
    window.removeEventListener('beforeunload', this.leavePage)
  },
  beforeRouteUpdate (to, from, next) {
    if (this.changeData.length === 0) {
      this.opened = false
      next()
      this.$nextTick(() => {
        if (this.selectAlbum) this.opened = true
        this.scrollListNav()
      })
    } else {
      this.$snotify.error(`相簿有異動請先儲存或是取消設定`, {
        position: SnotifyPosition.centerCenter,
        showProgressBar: true,
        pauseOnHover: false,
        closeOnClick: true
      })
      next(false)
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
