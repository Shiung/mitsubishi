<script>
import { SnotifyPosition } from 'vue-snotify'
export default {
  name: 'albumsPage',
  components: {
    titleItem: () => import('@/components/TitleItem'),
    albumsItem: () => import('@/components/AlbumsItem')
  },
  methods: {
    deleteAlbumsGo (id) {
      console.log(`刪除 ${id}`)
      this.$snotify.confirm(`Delete Albums ID : ${id}`, `Are You Sure`, {
        timeout: 0, // 沒有時間限制關閉
        position: SnotifyPosition.centerCenter, // 位置
        backdrop: 0.3, // 背景
        buttons: [
          {
            text: 'Yes',
            action: (toast) => {
              this.removeRequest(id)
              this.$snotify.remove(toast.id)
            },
            bold: true
          },
          {
            text: 'No',
            action: (toast) => {
              this.$snotify.remove(toast.id)
            },
            bold: true
          }
        ]
      })
    },
    editAlbumsGo (id) {
      console.log(`編輯 ${id}`)
    },
    previewGo (id) {
      console.log(`預覽 ${id}`)
    },
    printAndPurchaseGo (id) {
      console.log(`購買 ${id}`)
    },
    removeRequest (id) {
      console.log(`確認刪除 ${id}`)
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
