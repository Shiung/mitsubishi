<script>
import { Chrome } from 'vue-color'
export default {
  name: 'textEditItem',
  props: {
    textProp: {
      type: String,
      default: null
    },
    postionProp: {
      type: String,
      default: null
    },
    weightProp: {
      type: Number,
      default: 400
    },
    scaleProp: {
      type: Number,
      default: 1
    },
    colorProp: {
      type: String,
      default: '#000'
    },
    widthHeightRatio: {
      type: Number,
      default: 1
    },
    standardWidthProp: {
      type: Number,
      default: 890
    }
  },
  data () {
    return {
      inputText: this.textProp,
      textPosition: this.postionProp,
      whRatio: this.widthHeightRatio,
      // 文字編輯內容
      inputEdit: null, // 新增編輯文字
      fontStandard: 0, // 字體標準尺寸比 與layout 尺寸比較
      fontWeight: this.weightProp, // font-weight
      textScale: this.scaleProp, // 字體放大倍數
      textColor: {
        hex: this.colorProp
      },
      // 開關
      scaleOpen: false,
      inputOpen: false,
      colorOpen: false
    }
  },
  computed: {
    // class 動態
    stylePostion () {
      return this.textPosition === 'left'
        ? 'justify-content-start' : this.textPosition === 'center'
          ? 'justify-content-center' : 'justify-content-end'
    },
    // style 動態
    fontScale () {
      let transformList = `scale(${this.textScale * this.fontStandard})`
      let transformPositon = this.textPosition
      let fontWeightUse = this.fontWeight
      let fontColor = this.textColor.hex ? this.textColor.hex : '#000'
      return {
        transform: transformList,
        transformOrigin: transformPositon,
        fontWeight: fontWeightUse,
        color: fontColor
      }
    }
  },
  components: {
    'chrome-picker': Chrome
  },
  methods: {
    init () {
      // 初始設定
      this.editAreaSize()
      this.fontSize()
      window.addEventListener('resize', this.resizeHandler)
    },
    resizeHandler (e) {
      this.fontSize()
    },
    fontSize () {
      let editShowArea = this.$el.querySelector('.edit_area_father')
      this.fontStandard = editShowArea.clientWidth / this.standardWidthProp
    },
    editAreaSize () {
      let editShowArea = this.$el.querySelector('.edit_area_father')
      editShowArea.style.width = `100%`
      editShowArea.style.paddingTop = `${100 * this.whRatio}%`
    },
    inputChange () {
      this.inputText = this.inputEdit
      this.inputOpen = false
    },
    selectPostion (pos) {
      this.textPosition = pos
    },
    cancel () {
      this.$emit('closeHandler')
    },
    submit () {
      let obj = {
        text: this.inputText,
        postion: this.textPosition,
        weight: this.fontWeight,
        color: this.textColor.hex,
        scale: this.textScale
      }
      this.$emit('updateHandler', obj)
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    inputOpen (val) {
      if (!val) this.inputEdit = null
    }
  },
  beforeDestroy () {
    // 清除 監聽事件
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
