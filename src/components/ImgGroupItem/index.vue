<script>
export default {
  name: 'imgGroupItem',
  data () {
    return {
      selectImg: null,
      // vue2-dropzone ----------------
      dropzoneOptions: {
        url: 'https://httpbin.org/post', // server 位置
        thumbnailMethod: 'contain',
        addRemoveLinks: false,
        autoProcessQueue: true,
        acceptedFiles: 'image/*',
        headers: {
          'Authorization': null
        }
      },
      dropzoneOpen: false,
      processArr: [],
      finishArr: []
      // vue2-dropzone ---------------- end
    }
  },
  computed: {
    // vue2-dropzone
    vue2Dropzonefinish () {
      return this.processArr.length === this.finishArr.length
    }
  },
  components: {
    albumsItem: () => import('@/components/AlbumsItem')
  },
  methods: {
    closeBox () {
      this.$emit('closeHandler', false)
    },
    submit () {
      if (this.selectImg === null) {
        this.$snotify.error(`please select photo`, {
          showProgressBar: true,
          pauseOnHover: false,
          closeOnClick: true
        })
      } else {
        let src = 'https://www.tgilive.com/image/product/426_MES007POR_img1.jpg'
        this.$emit('imgSetHandler', src)
      }
    },
    // vue2 dropzone
    uploadImgSuccess (file, response) {
      // if (file.xhr.getResponseHeader('Authorization')) {
      //   this.token_update(file.xhr.getResponseHeader('Authorization'))
      // }
      // console.log(response)
      this.finishArr.push(file)
    },
    uploadImgError (file, message, xhr) {
      alert(message)
      this.$refs.vueDropZoneDZ.removeFile(file)
    },
    processItem (file) {
      console.log(file)
      this.processArr.push(file)
    },
    uploadComplete (response) {
      console.log('進行中')
      console.table(this.processArr)
      console.log('完成')
      console.table(this.finishArr)
    },
    closeVue2Dropzone () {
      if (!this.vue2Dropzonefinish) {
        this.$snotify.info(`Photo Still Uploading`, {
          showProgressBar: true,
          pauseOnHover: false,
          closeOnClick: true
        })
        return
      }
      this.dropzoneOpen = false
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
