<script>
import { mapGetters } from 'vuex'
import Vector from '@/assets/js/vectorClass.js'
export default {
  name: 'canvasItem',
  props: {
    idProp: {
      type: String,
      required: true
    },
    img: {
      type: Object,
      default: function () {
        return {}
      }
    },
    imgScaleProp: {
      type: Number,
      default: null
    },
    imgTranslateProp: {
      type: Object,
      default: function () {
        return {}
      }
    },
    imgRotateProp: {
      type: Number,
      default: null
    },
    // 功能是否要開啟
    optionStatus: {
      type: Boolean,
      default: true
    },
    // 等比例縮放 依據外層的傳入值
    ratio: {
      type: Number,
      required: true
    },
    // 是否要有背景網線
    bgUse: {
      type: Boolean,
      default: true
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
      // img config-------
      imgSrc: Object.assign({}, this.img), // 記憶體圖片obj , defeult props 資料
      imgDom: null,
      imgScale: this.imgScaleProp ? this.imgScaleProp : 1, // 縮放比例
      imgHeightRatio: 1, // 圖片寬高比
      imgRatio: 1, // 圖片與畫布尺寸比
      imgObj: {}, // 圖片物件 --> 偵測滑鼠事件用
      imgTranslate: Object.keys(this.imgTranslateProp).length !== 0 ? new Vector({ x: this.imgTranslateProp.x, y: this.imgTranslateProp.y }) : new Vector({ x: 0, y: 0 }), // 圖片位移向量
      imgRotate: this.imgRotateProp ? this.imgRotateProp : 0, // 圖片旋轉(角度)
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
      fullNone: false,
      // loading -------------- end
      // photo 選單開啟 --------
      photoOpen: false
      // photo 選單開啟 -------- end
    }
  },
  computed: {
    // vuex
    ...mapGetters(['deviceMobileStatus']),
    // 監聽如果圖片參數有異動 與 watch 並用
    imgObjectChange () {
      let obj = {}
      // 圖片
      if (Object.keys(this.img).length !== 0) {
        // 1. 有圖片props 傳入 且圖片有更換
        this.imgSrc.src !== this.img.src && (obj.img = this.imgSrc)
      } else if (Object.keys(this.img).length === 0 && Object.keys(this.imgSrc).length !== 0) {
        // ２. 沒有有圖片props 傳入 且圖片有更換
        obj.img = this.imgSrc
      }
      // 位移
      if (Object.keys(this.imgTranslateProp).length !== 0) {
        // 1. 有傳入 props 位移量 且資料有異動
        this.imgTranslate.x !== this.imgTranslateProp.x && (obj.translateX = this.imgTranslate.x)
        this.imgTranslate.y !== this.imgTranslateProp.y && (obj.translateY = this.imgTranslate.y)
      } else if (Object.keys(this.imgTranslateProp).length === 0 && Object.keys(this.imgTranslate).length !== 0) {
        // 2. 沒有傳入 props 位移量 且資料有異動
        obj.translateX = this.imgTranslate.x
        obj.translateY = this.imgTranslate.y
      }
      // 放大縮小
      if (this.imgScaleProp !== null) {
        // 1. 有傳入 props 位移量 且資料有異動
        this.imgScale !== this.imgScaleProp && (obj.scale = this.imgScale)
      } else {
        // 2. 沒有傳入 props 位移量 且資料有異動
        obj.scale = this.imgScale
      }
      // 旋轉
      if (this.imgRotateProp !== null) {
        // 1. 有傳入 props 位移量 且資料有異動
        this.imgRotate !== this.imgRotateProp && (obj.rotate = this.imgRotate)
      } else {
        // 2. 沒有傳入 props 位移量 且資料有異動
        obj.rotate = this.imgRotate
      }
      return obj
    }
  },
  components: {
    imgGroupBox: () => import('@/components/ImgGroupItem')
  },
  methods: {
    init () {
      // 抓取動元素
      this.canvasDom = this.$el.children[0]
      this.canvasBoxDom = this.$el
      this.ctx = this.canvasDom.getContext('2d')
      // 視窗 resize
      window.addEventListener('resize', this.resizeHandler)
      this.resizeCanvas()
      // 如果功能prop 為false 結束
      if (!this.optionStatus) return
      // 取得滑鼠監聽事件 (pc || mobile)
      if (this.deviceMobileStatus) {
        this.touchAddEventListener()
      } else this.mouseAddEventListener()
    },
    resizeHandler (e) {
      this.resizeCanvas()
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
      if (Object.keys(this.imgSrc).length !== 0) {
        let vm = this
        if (!this.imgDom) {
          vm.showLoading = true
          let img = new Image()
          img.src = this.imgSrc.src
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
    },
    // imgGroupBox handler ------------------
    openImgBox () {
      this.photoOpen = true
    },
    closePhotoBox () {
      this.photoOpen = false
    },
    imgReset (src) {
      // 關閉photo 視窗
      this.closePhotoBox()
      // 移除舊的圖片 讓canvas 判斷是否要重新 load 圖檔
      this.imgDom = null
      // 更換新的圖片src
      // this.imgSrc.src = src
      this.imgSrc = { src: src }
      // 定位重新定義
      this.imgTranslate.set(0, 0) // 移動位置重設(0, 0)
      this.imgScale = 1 // 重設放大為1
      this.imgRotate = 0 // 重設旋轉角度為 0
      // 重新畫圖
      this.canvasDraw()
    }
    // imgGroupBox handler ------------------ end
  },
  mounted () {
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
    },
    // 功能 ----------------- end
    // 圖片設定有異動
    imgObjectChange (val) {
      let data = {
        id: this.idProp,
        ...val
      }
      if (Object.keys(val).length === 0) this.$emit('dataDeleteStore', data)
      else this.$emit('dataChangeStore', data)
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
