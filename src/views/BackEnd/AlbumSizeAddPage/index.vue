<template>
  <div class="albumSizeAddPage d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex justify-content-between align-items-start section">
      <inputType
        class='w240'
        type="text"
        v-validate="'required'"
        data-vv-as='size name'
        name="sizeName"
        autocomplete="off"
        :class="{'was-validated' : !errors.has('sizeName') && sizeName.length > 0}"
        :inputClass="{'is-invalid' : errors.has('sizeName')}"
        v-model.trim="sizeName">
        Size Name
        <span class="font_12 text-danger" slot="error">{{ errors.first('sizeName') }}</span>
      </inputType>
      <div
        class="form-group w240 select_cus"
        :class="{'was-validated' : !errors.has('sizeType') && sizeType !== 'none'}"
      >
        <label>Size Type</label>
        <select
          v-validate="'included:A4,B3,B4,B5'"
          data-vv-as='Size Type'
          name="sizeType"
          class="custom-select rounded-0"
          v-model="sizeType"
          :class="{'is-invalid' : errors.has('sizeType')}">
          <option value="none" disabled>selected</option>
          <option value="A4">A4</option>
          <option value="B3">B3</option>
          <option value="B4">B4</option>
          <option value="B5">B5</option>
        </select>
        <span class="font_12 text-danger" >{{  errors.first('sizeType') }}</span>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-start section mt-3">
      <inputType
        class='w240'
        type="number"
        autocomplete="off"
        v-validate="'required|numeric|min_value:11'"
        data-vv-as='Ｗidth(mm)'
        name="widthChoose"
        :class="{'was-validated' : !errors.has('widthChoose') && width > 10}"
        :inputClass="{'is-invalid' : errors.has('widthChoose')}"
        v-model.number="width">
        Width(mm)
        <span class="font_12 text-danger" slot="error">{{ errors.first('widthChoose') }}</span>
      </inputType>
      <inputType
        class='w240'
        type="number"
        autocomplete="off"
        v-validate="'required|numeric|min_value:11'"
        data-vv-as='Height(mm)'
        name="heightChoose"
        :inputClass="{'is-invalid' : errors.has('heightChoose')}"
        :class="{'was-validated' : !errors.has('heightChoose') && height > 10}"
        v-model.number="height">
        Height(mm)
        <span class="font_12 text-danger" slot="error">{{ errors.first('heightChoose') }}</span>
      </inputType>
    </div>
    <div class="d-flex justify-content-start align-items-start section my-3">
      <div class="custom-control custom-checkbox checkBox_cus checkBox_cus_input">
        <input type="checkbox" class="custom-control-input" id="isActive" v-model='isActive'>
        <label class="custom-control-label" for="isActive">is Active?</label>
      </div>
    </div>

    <div class="option d-flex justify-content-center align-items-center">
      <btnItem class="cancel text-capitalize mr-3" @click="cancelHandler">cancel</btnItem>
      <btnItem class="default text-capitalize" @click="createHandler">create</btnItem>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumSizeAddPage',
  data () {
    return {
      sizeName: '',
      sizeType: 'none',
      width: '',
      height: '',
      isActive: false
    }
  },
  components: {
    inputType: () => import('@/components/InputItem'),
    btnItem: () => import('@/components/ButtonItem')
  },
  methods: {
    createHandler () {
      this.$validator.validate().then(result => {
        if (!result) {
          this.errorMessage('incomplete')
        } else {
          console.log('送出')
        }
      })
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
    },
    cancelHandler () {
      this.initData()
    },
    initData () {
      this.sizeName = ''
      this.sizeType = 'none'
      this.width = ''
      this.height = ''
      this.$validator.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
.w240{
  width: 240px;
}
.section{
  width: 500px;
}
.albumSizeAddPage{
  margin: 50px 0;
}
.option{
  margin-top: 150px;
}
.select_cus{
  > label {
    font-size: 14px;
    color:$color-cus-darkgray2;
  }
  > select {
    height: 32px;
    line-height: 18px;
    // color:$color-cus-darkgray4;
    border-color:$color-cus-darkgray;
    box-shadow: none !important;
    &.is-invalid {
      border-color: #dc3545;
    }
  }
}
</style>
