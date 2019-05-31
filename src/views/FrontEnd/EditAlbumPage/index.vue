<script>
export default {
  name: 'editAlbumPage',
  data () {
    return {
      opened: true,
      width: 842,
      height: 595,
      layer: {
        width: 842,
        height: 595,
        layers: [
          {
            x: 10,
            y: 10,
            w: 406,
            h: 282.5
          },
          {
            x: 426,
            y: 10,
            w: 406,
            h: 282.5
          },
          {
            x: 10,
            y: 302.5,
            w: 822,
            h: 283.5
          }
        ]
      }
    }
  },
  computed: {
    titleHistory () {
      return 'edit album'
    }
  },
  components: {
    titleItem: () => import('@/components/TitleItem'),
    layerBox: () => import('@/components/LayerItem')
  },
  methods: {

  },
  mounted () {
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
