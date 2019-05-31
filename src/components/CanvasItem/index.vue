<script>
import Vector from '@/assets/js/vectorClass.js'
export default {
  name: 'canvasItem',
  props: {
    layout: {
      type: String,
      default: 'A4'
    },
    // 等比例縮放 依據外層的傳入值
    ratio: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // canvas config----
      canvasDom: null, // canvas dom
      canvasBoxDom: null, // canvas 基準容器
      ctx: null, // getContext('2d')
      canvasWidth: 0,
      canvasHeight: 0,
      // canvas config---- end
      optionTrigger: true
    }
  },
  methods: {
    init () {
      // 抓取動元素
      this.canvasDom = this.$el.children[0]
      this.canvasBoxDom = this.$el
      this.ctx = this.canvasDom.getContext('2d')
      // 視窗 resize
      let vm = this
      window.addEventListener('resize', function () {
        vm.resizeCanvas()
      })
      vm.resizeCanvas()
    },
    resizeCanvas () {
      this.canvasWidth = this.canvasDom.width = this.canvasDom.clientWidth
      this.canvasHeight = this.canvasDom.height = this.canvasBoxDom.clientHeight
      this.canvasDraw()
    },
    canvasDraw () {
      let ctx = this.ctx

      let vector = new Vector({
        x: 50,
        y: 50
      })
      let subV = vector.mul(this.ratio)
      ctx.beginPath()
      ctx.fillRect(50, 0, subV.x, subV.y)
    },
    getConfigParams () {
      console.log(this.canvasDom)
      console.log(this.ctx)
      let ctx = this.ctx
      ctx.beginPath()
      ctx.fillStyle = 'white'
      ctx.fillRect(this.canvasWidth - 50, this.canvasHeight - 50, 50, 50)
      console.log(document.querySelectorAll('.myCanvas'))
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
