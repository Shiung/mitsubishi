<script>
export default {
  name: 'textContentItem',
  props: {
    text: {
      type: String,
      default: null
    },
    position: {
      type: String,
      default: 'left'
    },
    weight: {
      type: Number,
      default: 400
    },
    scale: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: '#000'
    },
    standardWidth: {
      type: Number,
      default: 0
    },
    optionStatus: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      inputText: this.text,
      textPosition: this.position,
      // 文字編輯內容
      standardWidthRatio: 1,
      textScale: this.scale,
      fontWeight: this.weight,
      fontColor: this.color,
      whRatio: 1, // 文字區域長寬比
      showEdit: false
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
      let transformList = `scale(${this.textScale * this.standardWidthRatio})`
      let transformPositon = this.textPosition
      let fontWeightUse = this.fontWeight
      let fontColor = this.fontColor
      return {
        transform: transformList,
        transformOrigin: transformPositon,
        fontWeight: fontWeightUse,
        color: fontColor
      }
    },
    textRatio () {
      return this.$el.clientWidth
    }
  },
  components: {
    textEdit: () => import('@/components/TextEditItem')
  },
  methods: {
    init () {
      // 文字顯示寬長寬比
      this.whRatio = this.$el.clientHeight / this.$el.clientWidth
      // 文字比例
      this.standardWidthRatio = this.$el.clientWidth / this.standardWidth
      window.addEventListener('resize', this.resizeHandler)
    },
    resizeHandler (e) {
      this.standardWidthRatio = this.$el.clientWidth / this.standardWidth
    },
    selectPostion (pos) {
      this.textPosition = pos
    },
    edit () {
      this.showEdit = true
    },
    updateText (obj) {
      // 關閉視窗
      this.showEdit = false
      // 更新內容
      this.inputText = obj.text
      this.textPosition = obj.postion
      this.fontWeight = obj.weight
      this.textScale = obj.scale
      this.fontColor = obj.color
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    // 清除 監聽事件
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
