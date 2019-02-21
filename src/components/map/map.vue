<template>
  <div class="map">
    <div ref="container" class="map-container"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import {loadScript} from 'common/js/load'
export default {
  mounted () {
    this._localScript()
  },
  methods: {
    init (BMap) {
      let map = new BMap.Map(this.$refs.container)
      let point = new BMap.Point(113.757593, 23.01716)
      map.centerAndZoom(point, 19)
      let marker = new BMap.Marker(point)
      map.addOverlay(marker)
    },
    _localScript () {
      loadScript().then(BMap => {
        this.init(BMap)
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .map
    position: fixed
    bottom: 10px
    left: 0px
    width: 100%
    height: 30%
    .map-container
      width: 95%
      margin: 0 auto
      height: 100%
</style>
