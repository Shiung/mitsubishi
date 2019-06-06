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
            h: 282.5,
            img: {
              src: 'https://www.tgilive.com/image/frontend/banner/A8BN-01.jpg',
              translate: {
                x: 0.32727272727272655, // 0,
                y: 0.06862745098039225 // -0.26143790849673193
              },
              rotate: 45
              // scale: 2.07025
            }
          },
          {
            x: 426,
            y: 10,
            w: 406,
            h: 282.5
            // img: {
            //   src: 'https://www.tgilive.com/image/frontend/banner/B3BN-05.jpg'
            // }
          },
          {
            x: 10,
            y: 302.5,
            w: 822,
            h: 283.5,
            img: {
              src: 'https://www.tgilive.com/image/frontend/banner/C2BN-02.jpg'
            }
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
