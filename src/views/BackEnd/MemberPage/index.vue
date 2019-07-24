<template>
  <div class="memberPage admin_page_box">
    <breadCrum class="border-bottom m-0" :pathProps="breadCrumPath"/>
    <div class="options d-flex justify-content-end align-items-center">
      <btnItem class="inviteMember text-capitalize" @click="inviteBox"><i class="material-icons font_18 mr-1">person</i>Invite Member</btnItem>
    </div>

    <div class="table_zone">
      <div class="table_header sticky-top d-flex align-items-center border-bottom">
        <div data-column='ID'>
          <span class="font_14">ID</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Member ID</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='name'>
          <span class="font_14">名前</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Name</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='email'>
          <span class="font_14">電子郵件</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Email Address</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='addr'>
          <span class="font_14">地址</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Address</span>
            <i class="material-icons font_16">play_arrow</i>
          </div>
        </div>
        <div data-column='lastTime'>
          <span class="font_14">最後登入時間</span>
          <div class="font_12 d-flex align-items-center subTitle">
            <span class="font_12 mr-2">Lastest Login time</span>
          </div>
        </div>
      </div>

      <table class="table mb-3 position-relative">
        <tbody>
          <tr v-for="item in datatables" :key="item.id">
            <td class="font_12" data-column='ID'>{{item.id}}</td>
            <td class="font_12" data-column='name'>{{item.name}}</td>
            <td class="font_12" data-column='email'>{{item.email}}</td>
            <td class="font_12" data-column='addr'>
              <div>{{item.addresCode}}</div>
              <div>{{item.address}}</div>
            </td>
            <td class="font_12" data-column='lastTime'>{{item.loginTime}}</td>
          </tr>
          <tr v-if="datatables.length === 0">
            <td colspan="6" class="text-center">沒有資料</td>
          </tr>
        </tbody>

        <loading
          :active.sync="showLoading"
          color="rgba(36, 94, 96,1)"
          :opacity= "loadingOpacity"
          :is-full-page="fullNone"
          loader="dots"
          style="z-index: 1021;"
        >
        </loading>
      </table>
    </div>

    <paginationItem
      v-if="showPagination"
      class="mt-5"
      :currentPage='currentPage'
      :totalPages='totalPages'
      :perPage='perPage'
      :count='count'
      :totalCount='totalCount'
      @prevPage="prevPageGo"
      @nextPage="nextPageGo"
      @pageSelect="pageGo"
    />

    <dialogBox
      v-if="dialogStatus"
      :idProps="dialogID"
      :typeProps="dialogType"
      :titleProps="dialogTitle"
      :subTitleProps="dialogSubTitle"
      :describeProps="dialogDescibe"
      dialogSize="small"
      @confrimEmit="confirmHandler"
      @cancelEmit="dialogStatus = false"
    >
      <div slot="inputBox" class="d-flex align-items-center flex-column">
        <inputType
          type="email"
          class="w250 text-left"
          placeholder="peter@email.com"
          autocomplete="off"
          v-validate="'required|email'"
          data-vv-as='email'
          name="email"
          :class="{'was-validated' : !errors.has('email') && email.length > 0}"
          :inputClass="{'is-invalid' : errors.has('email')}"
          v-model.trim="email">
          Email / Eメール
          <span class="font_12 text-danger" slot="error">{{ errors.first('email') }}</span>
        </inputType>
        <inputType
          type="text"
          class="w250 text-left"
          placeholder="李彼得"
          autocomplete="off"
          v-validate="'required'"
          data-vv-as='name'
          name="name"
          :class="{'was-validated' : !errors.has('name') && name.length > 0}"
          :inputClass="{'is-invalid' : errors.has('name')}"
          v-model.trim="name">
          名前 / Member Name
          <span class="font_12 text-danger" slot="error">{{ errors.first('name') }}</span>
        </inputType>
      </div>
    </dialogBox>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'memberPage',
  data () {
    return {
      // 麵包屑
      breadCrumPath: [{ name: 'member list', connect: false }],
      // 分頁
      showPagination: false,
      // loading
      showLoading: true,
      loadingOpacity: 0.8,
      fullNone: false,
      // dialogBox提示視窗
      dialogStatus: false,
      dialogID: '',
      dialogType: '', // 0: delete 1: confirm 2: print& Purchase
      dialogTitle: '',
      dialogSubTitle: '',
      dialogDescibe: '',
      email: '',
      name: ''
    }
  },
  components: {
    breadCrum: () => import('@/components/BackBreadCrumbItem'),
    paginationItem: () => import('@/components/PaginationItem'),
    dialogBox: () => import('@/components/DialogBoxItem'),
    inputType: () => import('@/components/InputItem'),
    btnItem: () => import('@/components/ButtonItem')
  },
  computed: {
    // vuex
    ...mapGetters('memberTableStore', ['datatables', 'perPage', 'count', 'totalPages', 'totalCount', 'currentPage', 'paramsObj', 'paramsStatus', 'trashStatus'])
  },
  methods: {
    // vuex
    ...mapActions('memberTableStore', ['getDatatable', 'getRequestParams', 'setParamsStatus', 'setTrashStatus']),
    async init () {
      this.showLoading = true
      this.showPagination = false
      this.getRequestParams()
      await this.getDatatable()
      this.$nextTick().then(() => {
        this.showLoading = false
        this.showPagination = true
      })
    },
    // 分頁
    prevPageGo () {
      console.log('上一頁')
    },
    nextPageGo () {
      console.log('下一頁')
    },
    pageGo (val) {
      console.log(`前往 ${val}`)
    },
    // DialogBox
    inviteBox () {
      // 初始validate
      this.email = ''
      this.name = ''
      // 打開DialogBox
      this.dialogID = 123
      this.dialogType = 1
      this.dialogTitle = 'Invite Member'
      this.dialogSubTitle = '邀請會員將會寄出Email 告知會員後台位置與登入金鑰'
      this.dialogDescibe = ''
      this.dialogStatus = true
    },
    confirmHandler (obj) {
      // console.log(obj)
      this.$validator.validate().then(result => {
        if (!result) {
          this.errorMessage('incomplete')
        } else {
          let email = this.email
          let name = this.name
          console.log(`新增: email => ${email}, name => ${name}`)
        }
      })
    },
    closeDialogBox () {
      this.dialogStatus = false
      this.dialogID = null
      this.dialogType = null
      this.dialogTitle = null
      this.dialogSubTitle = null
      this.dialogDescibe = null
    },
    errorMessage (type) {
      if (type === 'incomplete') {
        this.$snotify.error(`data incomplete`, {
          showProgressBar: true,
          pauseOnHover: false,
          closeOnClick: true
        })
        this.sizeError = true
      } else {
        this.$snotify.error(`data error`, {
          showProgressBar: true,
          pauseOnHover: false,
          closeOnClick: true
        })
      }
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    dialogStatus (val) {
      !val && this.closeDialogBox()
    }
  }
}
</script>
<style lang="scss" scoped>
.memberPage{
  .options{
    height: 50px;
    padding-right: 15px;
    border-bottom: 1px solid $color-cus-gray;
    color:$color-cus-darkgray4;
    >button{
      padding: 3px 10px;
      border-radius: 15px;
      background-color: $color-cus-green;
      color:#fff;
      box-shadow: none;
      transition: .3s;
      &:hover{
        filter: brightness(110%)
      }
    }
  }
}
.w250{
  width: 250px;
}

// table customer
$width1: 110px; // ID
$width2: 120px; // name
$width3: 200px; // email
$width4: 135px; // lastlogin

[data-column=ID] {
  width: $width1;
}
[data-column=name] {
  width: $width2;
}
[data-column=email] {
  width: $width3;
}
[data-column=lastTime] {
  width: $width4;
}
[data-column=addr] {
  width: calc( 100% - #{$width1} - #{$width2} - #{$width3} - #{$width4});
  word-break: break-all;
}
</style>
