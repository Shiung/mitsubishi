<script>
export default {
  name: 'layerItem',
  props: {
    layerObj: {
      type: Object,
      required: true
    },
    optionUse: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      opened: false, // 當layout build 玩 init open canvas
      width: 842, // container 寬
      ratioHeight: 0, // 長寬比
      ratioAll: 1 // 尺寸縮放比例
    }
  },
  components: {
    canvasBox: () => import('@/components/CanvasItem'),
    textBox: () => import('@/components/TextContentItem')
  },
  methods: {
    init () {
      // layout 位置尺寸
      this.getlayerBoxParams()
      this.layerPos()
    },
    resizeHandler (e) {
      this.init()
    },
    getlayerBoxParams () {
      let layerBox = this.$el // document.querySelector('.layerItem')
      this.width = layerBox.clientWidth // 版面寬度
      this.ratioHeight = this.layerObj.height / this.layerObj.width // 版面寬高比
      this.ratioAll = layerBox.clientWidth / this.layerObj.width // 尺寸與標準縮放比
    },
    layerPos () {
      // console.log(this.$el.children[0])
      let layerOuter = this.$el.children[0] // document.querySelector('.canvas_container')
      layerOuter.style.width = `${this.width}px`
      layerOuter.style.height = `${this.width * this.ratioHeight}px` // `${this.width * this.height / this.width}px`

      // console.log(this.$el.children[0].children)
      let layers = this.$el.children[0].children // document.querySelectorAll('.layer')
      let layersArr = [...layers]
      layersArr.forEach(item => {
        let x = item.dataset.x // 原點x軸定位
        let y = item.dataset.y // 原點y軸定位
        let width = item.dataset.width // 長度
        let height = item.dataset.height // 寬度
        let ratio = this.ratioAll // 尺寸縮放比
        item.style.top = `${y * ratio}px`
        item.style.left = `${x * ratio}px`
        item.style.width = `${width * ratio}px`
        item.style.height = `${height * ratio}px`
      })
    }
  },
  mounted () {
    this.init()
    window.addEventListener('resize', this.resizeHandler)
    this.opened = true
  },
  beforeDestroy () {
    // 清除 監聽事件
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
