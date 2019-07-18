<script>
// import { SnotifyPosition } from 'vue-snotify'
export default {
  name: 'albumsPage',
  data () {
    return {
      // dialogBox提示視窗
      dialogStatus: false,
      dialogID: '',
      dialogType: '', // 0: delete 1: confirm 2: print& Purchase
      dialogTitle: '',
      dialogSubTitle: '',
      dialogDescibe: ''
    }
  },
  components: {
    albumsItem: () => import('@/components/AlbumsItem'),
    dialogBox: () => import('@/components/DialogBoxItem')
  },
  methods: {
    deleteAlbumsGo (id) {
      console.log(`刪除 ${id}`)
      // this.$snotify.confirm(`Delete Albums ID : ${id}`, `Are You Sure`, {
      //   timeout: 0, // 沒有時間限制關閉
      //   position: SnotifyPosition.centerCenter, // 位置
      //   backdrop: 0.3, // 背景
      //   buttons: [
      //     {
      //       text: 'Yes',
      //       action: (toast) => {
      //         this.removeRequest(id)
      //         this.$snotify.remove(toast.id)
      //       },
      //       bold: true
      //     },
      //     {
      //       text: 'No',
      //       action: (toast) => {
      //         this.$snotify.remove(toast.id)
      //       },
      //       bold: true
      //     }
      //   ]
      // })
      this.dialogID = id
      this.dialogType = 0
      this.dialogTitle = '是否刪除相簿'
      this.dialogSubTitle = ''
      this.dialogDescibe = ''
      this.dialogStatus = true
    },
    editAlbumsGo (id) {
      console.log(`編輯 ${id}`)
      this.$router.push({ name: 'editAlbumPage', params: { id: id } })
    },
    previewGo (id) {
      console.log(`預覽 ${id}`)
    },
    printAndPurchaseGo (id) {
      // console.log(`購買 ${id}`)
      this.dialogID = id
      this.dialogType = 2
      this.dialogTitle = '是否列印相簿'
      this.dialogSubTitle = '列印相簿會由ASAHI人員審查後，專人與您聯絡'
      this.dialogDescibe = '印PされたアルバムH S HIの担当者によCD審査され、誰かがあ Eたに連絡しIA。'
      this.dialogStatus = true
    },
    removeRequest (id) {
      console.log(`確認刪除 ${id}`)
    },
    // dialogBox跳窗
    confirmHandler (obj) {
      // type 0: delete 1: confirm 2: print& Purchase
      console.log(`ID: ${obj.id} , 類別:${obj.type === 0 ? '刪除' : obj.type === 1 ? '確認' : '列印'}`)
      this.closeDialogBox()
    },
    closeDialogBox () {
      this.dialogStatus = false
      this.dialogID = null
      this.dialogType = null
      this.dialogTitle = null
      this.dialogSubTitle = null
      this.dialogDescibe = null
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
