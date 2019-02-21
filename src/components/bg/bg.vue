<template>
  <div v-if="isShow">
    <div class="bg-container">
      <img :src="img" alt="" width="100%">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      img: require('./bg.gif'),
      isShow: false
    }
  },
  methods: {
    show () {
      this.isShow = true
    }
  }
}
</script>

<style scoped lang="stylus">
  .bg-container
    position: fixed
    top: 0
    left: 0
    bottom: 0
    height: 0
    width: 100%
    z-index: -1
</style>
