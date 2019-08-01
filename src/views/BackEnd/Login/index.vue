<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: '',
      // loading
      showLoading: false,
      loadingOpacity: 0.8,
      fullNone: true,
      apiPath: `${process.env.VUE_APP_APIPATH}/login`
    }
  },
  computed: {
    // vuex
    ...mapGetters('adminStore', ['adminToken', 'adminCookieKey', 'adminInfo'])
  },
  methods: {
    // vuex
    ...mapActions('adminStore', ['token_update', 'log_out', 'set_adminInfo']),
    getlocalStorageStatus () {
      let key = this.adminCookieKey
      return localStorage[key] ? localStorage[key] : null
    },
    loginHandler () {
      this.$validator.validate().then(result => {
        if (result) {
          this.loginRequest()
        }
      })
    },
    async loginRequest () {
      this.showLoading = true
      await this.loginAPI()
      this.showLoading = false
      if (this.adminToken) this.$router.push({ name: 'admin' })
    },
    loginAPI () {
      let url = this.apiPath
      let data = {
        email: this.account,
        password: this.password
      }
      return this.axios.post(url, data)
        .then(res => {
          let respond = res.data.data
          this.token_update(`${respond.token_type} ${respond.access_token}`)
          this.set_adminInfo(respond.admin)
        })
        .catch(e => {
          // console.log('結果有 error')
          // console.error(e)
        })
    }
  },
  created () {
    if (this.getlocalStorageStatus()) this.$router.push({ name: 'admin' })
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
