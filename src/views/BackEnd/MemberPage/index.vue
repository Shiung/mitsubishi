<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'memberPage',
  data () {
    return {
      // vue table 2
      columns: ['id', 'fname', 'lname', 'action'],
      options: {
        headings: {
          edit: '',
          id: '#',
          fname: 'First Name',
          lname: 'Last Name',
          action: 'Action'
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
      this.showLoading = false
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
