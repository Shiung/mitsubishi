export default class Vector {
  constructor (args) {
    let def = {
      x: 0,
      y: 0
    }

    Object.assign(def, args) // 覆蓋到def 裡
    Object.assign(this, def)
  }
  // 加法
  add (v) {
    // 產生新向量 不影響初始向量
    return new Vector({
      x: this.x + v.x,
      y: this.y + v.y
    })
  }
  // 減法
  sub (v) {
    // 產生新向量 不影響初始向量
    return new Vector({
      x: this.x - v.x,
      y: this.y - v.y
    })
  }
  // 縮放
  mul (s) {
    // 產生新向量 不影響初始向量
    return new Vector({
      x: this.x * s,
      y: this.y * s
    })
  }
  // 長度
  length () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
  // 移動
  move (x, y) {
    this.x += x
    this.y += y
    return this
  }
  // 設定向量
  set (x, y) {
    this.x = x
    this.y = y
    return this
  }
  // 向量比較
  equal (v) {
    return (this.x === v.x) && (this.y === v.y)
  }
  // 複製函數(如果不希望改變動到原本向量)
  clone () {
    return new Vector({
      x: this.x,
      y: this.y
    })
  }
  // 角度
  angle () {
    return Math.atan2(this.y, this.x)
  }
  // 轉為字串
  toString () {
    return `(${this.x}, ${this.y})`
  }
}
