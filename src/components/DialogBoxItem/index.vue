<script>
export default {
  name: 'dialogBoxItem',
  props: {
    idProps: {
      type: Number,
      required: true
    },
    typeProps: {
      type: Number, // 0: delete 1: confirm 2: print& Purchase
      required: true
    },
    titleProps: {
      type: String,
      default: 'this is title'
    },
    subTitleProps: {
      type: String,
      default: 'this is sub title'
    },
    describeProps: {
      type: String,
      default: '印PされたアルバムH S HIの担当者によCD審査され、誰かがあ Eたに連絡しIA。'
    },
    dialogSize: {
      type: String // small
    }
  },
  data () {
    return {
      showBox: false
    }
  },
  computed: {
    confirmBtnStr () {
      return this.typeProps === 0 ? '刪除 delete' : '確認 confirm'
    }
  },
  methods: {
    confirm () {
      this.$emit('confrimEmit', {
        id: this.idProps,
        type: this.typeProps
      })
    },
    cancel () {
      this.$emit('cancelEmit')
    }
  },
  mounted () {
    this.showBox = true
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
