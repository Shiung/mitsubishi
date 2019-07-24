<template>
  <div class="albumCoverAddPage  d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex justify-content-between align-items-start section">
      <div
        class="form-group w240 select_cus"
        :class="{'was-validated' : !errors.has('coverName') && coverName !== 'none'}"
      >
        <label>Cover Name</label>
        <select
          v-validate="coverNameValidate"
          data-vv-as='Cover Name'
          name="coverName"
          class="custom-select rounded-0"
          v-model="coverName"
          :class="{'is-invalid' : errors.has('coverName')}">
          <option value="none" disabled>selected</option>
          <option value="Hardback">Hardback</option>
          <option value="Paperback">Paperback</option>
          <option value="Mass Market Paperback">Mass Market Paperback</option>
          <option value="Trade Paperback">Trade Paperback</option>
        </select>
        <span class="font_12 text-danger" >{{  errors.first('coverName') }}</span>
      </div>
      <div
        class="form-group w240 select_cus"
        :class="{'was-validated' : !errors.has('coverName') && coverName !== 'none'}"
      >
        <label>Size</label>
        <select
          v-validate="sizeValidate"
          data-vv-as='Size'
          name="size"
          class="custom-select rounded-0"
          v-model="size"
          :class="{'is-invalid' : errors.has('size')}">
          <option value="none" disabled>selected</option>
          <option value="A4">A4</option>
          <option value="B3">B3</option>
          <option value="B4">B4</option>
          <option value="B5">B5</option>
        </select>
        <span class="font_12 text-danger" >{{  errors.first('size') }}</span>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-start section mt-3">
      <inputType
        class='w-100'
        type="text"
        controlType="textarea"
        rows="3"
        placeholder="Desciption"
        v-validate="'required'"
        data-vv-as='說明描述'
        name="coverDiscription"
        autocomplete="off"
        :class="{'was-validated' : !errors.has('coverDiscription') && coverDiscription.length > 0}"
        :inputClass="{'is-invalid' : errors.has('coverDiscription')}"
        v-model.trim="coverDiscription">
        說明描述
        <span class="font_12 text-danger" slot="error">{{ errors.first('coverDiscription') }}</span>
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
  name: 'AlbumCoverAddPage',
  data () {
    return {
      coverName: 'none',
      size: 'none',
      coverDiscription: '',
      isActive: false
    }
  },
  computed: {
    coverNameValidate () {
      return 'included:Hardback,Paperback,Mass Market Paperback,Trade Paperback'
    },
    sizeValidate () {
      return 'included:A4,B3,B4,B5'
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
    cancelHandler () {
      this.coverName = 'none'
      this.coverDiscription = ''
      this.$validator.reset()
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
.option{
  margin-top: 150px;
}
.albumCoverAddPage{
  margin: 50px 0;
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
