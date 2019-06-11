<script>
import { mapGetters } from 'vuex'
export default {
  name: 'albumsItem',
  props: {
    // 是否要有網線背景
    backUse: {
      type: Boolean,
      default: true
    },
    // 功能是否啟用
    optionFunction: {
      type: Boolean,
      default: true
    },
    // 相簿 首頁圖
    imgObj: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 相簿 id
    ID: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      rwdOptionSwitch: false
    }
  },
  components: {
    imgLazyLoading: () => import('@/components/ImgLazyLoad')
  },
  computed: {
    // vuex
    ...mapGetters(['deviceMobileStatus'])
  },
  methods: {
    deleteAlbums () {
      this.$emit('deleteHandler', this.ID)
    },
    editAlbums () {
      this.$emit('editHandler', this.ID)
      // this.$router.push({ name: 'editAlbumPage' })
    },
    printAndPurchase () {
      this.$emit('printAndPurchaseHandler', this.ID)
    },
    preview () {
      this.$emit('previewHandler', this.ID)
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
