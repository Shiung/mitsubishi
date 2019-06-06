<script>
import Vector from '@/assets/js/vectorClass.js'
export default {
  name: 'canvasItem',
  props: {
    img: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 等比例縮放 依據外層的傳入值
    ratio: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      devicePC: true, // true : pc , false : 移動裝置
      // canvas config----
      canvasDom: null, // canvas dom
      canvasBoxDom: null, // canvas 基準容器
      ctx: null, // getContext('2d')
      canvasWidth: 0,
      canvasHeight: 0,
      // canvas config---- end
      // img config-------
      imgDom: null,
      imgScale: this.img.scale ? this.img.scale : 1, // 縮放比例
      imgHeightRatio: 1, // 圖片寬高比
      imgRatio: 1, // 圖片與畫布尺寸比
      imgObj: {}, // 圖片物件 --> 偵測滑鼠事件用
      imgTranslate: this.img.translate ? new Vector({ x: this.img.translate.x, y: this.img.translate.y }) : new Vector({ x: 0, y: 0 }), // 圖片位移向量
      imgRotate: this.img.rotate ? this.img.rotate : 0, // 圖片旋轉(角度)
      // img config------- end
      // 滑鼠位置 ---------
      mousePos: { x: 0, y: 0 }, // 滑鼠位置向量
      mouseDragging: false,
      // 滑鼠位置 --------- end
      // 功能 ------------
      zoomOption: false,
      rotateOption: false,
      optionsTrigger: false,
      // 功能 ------------ end
      // loading --------------
      showLoading: true,
      loadingOpacity: 0.6,
      fullNone: false
      // loading -------------- end
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
      // 取得滑鼠監聽事件 (pc || mobile)
      if (this.devicePC) {
        vm.mouseAddEventListener()
      } else vm.touchAddEventListener()
    },
    // 滑鼠事件(電腦) --------------------------------------------
    mouseAddEventListener () {
      let vm = this
      vm.canvasDom.addEventListener('mousemove', function (e) {
        // 判斷是有圖片物件 以及 是否在範圍內
        if (vm.mousePosCheck(e)) {
          vm.canvasDom.style.cursor = vm.mouseDragging ? 'grabbing' : 'grab'
        } else {
          vm.canvasDom.style.cursor = 'initial'
        }
        // 移動translate
        let newPos = new Vector({ x: e.offsetX, y: e.offsetY })
        if (vm.mouseDragging) {
          // 1. 與上一次更新滑鼠位置偏移量
          let delta = newPos.sub(vm.mousePos)
          // 2. 將變化量等比依照畫布長寬改為比例
          delta.set(delta.x / vm.canvasWidth, delta.y / vm.canvasHeight)
          vm.imgTranslate.move(delta.x, delta.y)
          vm.canvasDraw()
        }
        // 滑鼠位置更新
        vm.mousePos.x = e.offsetX
        vm.mousePos.y = e.offsetY
      })
      vm.canvasDom.addEventListener('mouseleave', e => { vm.mouseDragging = false })
      vm.canvasDom.addEventListener('mouseup', e => {
        vm.mouseDragging = false
        vm.canvasDom.style.cursor = 'initial'
      })
      vm.canvasDom.addEventListener('mousedown', e => {
        if (vm.mousePosCheck(e)) vm.mouseDragging = true
      })
    },
    mousePosCheck (evt) {
      // 偵測圖片位置
      let imgPos = this.imgObj
      // 判斷是否有存在圖片obj
      if ((Object.keys(imgPos).length === 0)) return false
      // 滑鼠位置是否在圖片範圍內
      if (imgPos.rotate !== 0) {
        // 圖片有旋轉 抓取圖片中心到最某一點的 r 用原心內的距離判斷
        let newPos = new Vector({ // 滑鼠位置
          x: evt.offsetX,
          y: evt.offsetY
        })
        let imgCenter = new Vector({ // 圖片中心
          x: imgPos.w / 2 + imgPos.x,
          y: imgPos.h / 2 + imgPos.y
        })
        return newPos.sub(imgCenter).length() < imgCenter.sub({ x: imgPos.x, y: imgPos.y }).length()
      } else {
        // 圖片沒有旋轉 比對長寬位置是否在圖片範圍內
        if (evt.offsetX < imgPos.x ||
            evt.offsetX > (imgPos.x + imgPos.w) ||
            evt.offsetY < imgPos.y ||
            evt.offsetY > (imgPos.y + imgPos.h)) {
          return false
        } else {
          return true
        }
      }
    },
    // 滑鼠事件(電腦) -------------------------------------------- end
    // 觸碰事件(移動裝置) -----------------------------------------
    touchAddEventListener () {
      let vm = this
      // 移動裝置監聽事件
      vm.canvasDom.addEventListener('touchstart', e => {
        if (e.cancelable) {
          e.preventDefault()
          if (vm.touchPosCheck(e)) vm.mouseDragging = true
          // 滑鼠位置更新
          let relatedPos = this.touchRelatePos(e)
          vm.mousePos.x = relatedPos.x
          vm.mousePos.y = relatedPos.y
        }
      }, false)
      vm.canvasDom.addEventListener('touchend', e => {
        e.preventDefault()
        vm.mouseDragging = false
      }, false)
      vm.canvasDom.addEventListener('touchmove', e => {
        e.preventDefault()
        // 移動translate
        let relatedPos = this.touchRelatePos(e)
        let newPos = new Vector({ x: relatedPos.x, y: relatedPos.y })
        if (vm.mouseDragging) {
          // 1. 與上一次更新滑鼠位置偏移量
          let delta = newPos.sub(vm.mousePos)
          // 2. 將變化量等比依照畫布長寬改為比例
          delta.set(delta.x / vm.canvasWidth, delta.y / vm.canvasHeight)
          vm.imgTranslate.move(delta.x, delta.y)
          vm.canvasDraw()
        }
        // 滑鼠位置更新
        vm.mousePos.x = relatedPos.x
        vm.mousePos.y = relatedPos.y
      }, false)
    },
    touchRelatePos (evt) {
      // 抓取 offset 偏移量
      let target = evt.target
      let offset = {
        x: 0,
        y: 0
      }
      while (target.offsetParent) {
        target = target.offsetParent
        offset.x += target.offsetLeft
        offset.y += target.offsetTop
      }
      return {
        x: evt.targetTouches[0].pageX - offset.x, // 觸碰page 位置 - dom 相對位置
        y: evt.targetTouches[0].pageY - offset.y // 觸碰page 位置 - dom 相對位置
      }
    },
    touchPosCheck (evt) {
      // 抓去dom 與 畫面的相對位置
      let relatedPos = this.touchRelatePos(evt)
      // 偵測圖片位置
      let imgPos = this.imgObj
      // 判斷是否有存在圖片obj
      if ((Object.keys(imgPos).length === 0)) return false
      // 判斷手指觸碰位置是否在圖片範圍內
      if (imgPos.rotate !== 0) {
        // 圖片有旋轉 抓取圖片中心到最某一點的 r 用原心內的距離判斷
        let newPos = new Vector({ // 滑鼠位置
          x: relatedPos.x,
          y: relatedPos.y
        })
        let imgCenter = new Vector({ // 圖片中心
          x: imgPos.w / 2 + imgPos.x,
          y: imgPos.h / 2 + imgPos.y
        })
        return newPos.sub(imgCenter).length() < imgCenter.sub({ x: imgPos.x, y: imgPos.y }).length()
      } else {
        if (relatedPos.x < imgPos.x || relatedPos.x > imgPos.x + imgPos.w || relatedPos.y < imgPos.y || relatedPos.y > imgPos.y + imgPos.h) {
          return false
        } else {
          return true
        }
      }
    },
    // 觸碰事件(移動裝置) ----------------------------------------- end
    resizeCanvas () {
      this.canvasWidth = this.canvasDom.width = this.canvasBoxDom.clientWidth
      this.canvasHeight = this.canvasDom.height = this.canvasBoxDom.clientHeight
      this.canvasDraw()
    },
    canvasDraw () {
      let ctx = this.ctx
      // 初始清除畫布
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      if (Object.keys(this.img).length !== 0) {
        let vm = this
        if (!this.imgDom) {
          vm.showLoading = true
          let img = new Image()
          img.src = this.img.src
          // 圖片loading
          img.onload = function () {
            vm.imgDom = this
            vm.imgHeightRatio = this.height / this.width
            vm.imgRatio = vm.canvasWidth / this.width
            vm.imgDraw(this)
            vm.showLoading = false
          }
        } else {
          vm.imgDraw(vm.imgDom)
        }
      } else this.showLoading = false
    },
    imgDraw (img) {
      let ctx = this.ctx
      let imgCtxWidth = this.canvasWidth * this.imgScale // 圖片寬度 * 縮放
      let imgCtxHeight = this.canvasWidth * this.imgHeightRatio * this.imgScale // 圖片高度 =  圖片寬度 * 圖片長寬比 * 縮放
      let center = new Vector({ x: this.canvasWidth / 2, y: this.canvasHeight / 2 }) // 畫布中心位置
      let imgCenter = new Vector({ x: imgCtxWidth / 2, y: imgCtxHeight / 2 }) // 圖片中心位置
      let imgTranslateReal = this.imgTranslate.clone().set(this.imgTranslate.x * this.canvasWidth, this.imgTranslate.y * this.canvasHeight)
      let centerTranslate = center.sub(imgCenter).add(imgTranslateReal) // 圖片起始位置移動
      let centerRotate = centerTranslate.clone().add(imgCenter) // 圖片中心位置(放大位移後) rotate 使用
      ctx.save()
      // ctx.translate(centerTranslate.x, centerTranslate.y)
      // ctx.drawImage(img, 0, 0, imgCtxWidth, imgCtxHeight)
      ctx.translate(centerRotate.x, centerRotate.y)
      ctx.rotate(this.imgRotate * Math.PI / 180)
      ctx.drawImage(img, centerTranslate.x - centerRotate.x, centerTranslate.y - centerRotate.y, imgCtxWidth, imgCtxHeight)
      ctx.restore()
      // 更新img 物件
      this.imgObj = {
        x: centerTranslate.x, // x起始點
        y: centerTranslate.y, // y起始點
        w: imgCtxWidth, // 圖片寬度
        h: imgCtxHeight, // 圖片高度
        translateX: this.imgTranslate.x, // x軸移動量
        translateY: this.imgTranslate.y, // y軸移動量
        scale: this.imgScale, // 圖片縮放量
        rotate: this.imgRotate // 圖片旋轉角度
      }
    }
  },
  mounted () {
    // 判斷裝置
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) this.devicePC = false
    // 啟動初始化
    this.init()
  },
  watch: {
    // 圖片縮放
    imgScale () {
      this.canvasDraw()
    },
    // 圖片旋轉
    imgRotate () {
      this.canvasDraw()
    },
    // 功能 -----------------
    zoomOption (val) {
      if (val) {
        this.rotateOption = false
      }
    },
    rotateOption (val) {
      if (val) {
        this.zoomOption = false
      }
    },
    optionsTrigger (val) {
      if (!val) {
        this.rotateOption = false
        this.zoomOption = false
      }
    }
    // 功能 ----------------- end
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
