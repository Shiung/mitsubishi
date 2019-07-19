<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'memberPage',
  data () {
    return {
      // vue table 2
      columns: ['id', 'name', 'email', 'address', 'loginTime'],
      options: {
        headings: {
          edit: '',
          id: '#',
          name: 'Name',
          email: 'email',
          address: '地址',
          loginTime: '最後登入時間'
        },
        columnsClasses: {
          edit: 'width-fix-50',
          id: 'width-fix-100'
        },
        perPage: 15,
        perPageValues: [10, 25, 100],
        pagination: { chunk: 5, nav: 'scroll', dropdown: false, edge: false },
        preserveState: true,
        sortable: ['noUse'],
        // filterable: ['name', 'album'],
        filterable: false,
        sortIcon: {
          base: 'sorticon',
          up: 'sort-up',
          down: 'sort-down',
          is: 'sort'
        },
        templates: {
          action: function (h, row, index) {
            let num = row.id
            let routerPath = `/admin/member/${num}`
            return <router-link class="rwd_logo" to={routerPath}>detail({num})</router-link> // <span>按我{num}</span>
          }
        }
      },
      // open table
      dataReady: false,
      // loading
      showLoading: true,
      loadingOpacity: 0.8,
      fullNone: false
    }
  },
  computed: {
    // vuex
    ...mapGetters('memberTableStore', ['datatables', 'perPage', 'count', 'totalPages', 'totalCount', 'currentPage', 'paramsObj', 'paramsStatus', 'trashStatus'])
  },
  methods: {
    // vuex
    ...mapActions('memberTableStore', ['getDatatable', 'getRequestParams', 'setParamsStatus', 'setTrashStatus']),
    async init () {
      this.getRequestParams()
      await this.getDatatable()
      this.dataReady = true
      // this.$refs.vueTable2Table.setLimit(this.perPage)
      this.$nextTick().then(() => {
        this.$refs.vueTable2Table.setLimit(this.perPage)
        this.showLoading = false
      })
    },
    sort (val) {
      console.log(val)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
