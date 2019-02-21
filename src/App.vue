<template>
  <div id="app">
    <bg-img ref="bgImg"></bg-img>
    <wedding-text ref="weddingText"></wedding-text>
    <dialog-text ref="dialogText"></dialog-text>
    <player ref="player"></player>
    <baidu-map ref="BMap"></baidu-map>
    <front-cover class="frontCover" @quitWelcome="theStartAnimation"></front-cover>
  </div>
</template>

<script>
import BgImg from 'components/bg/bg.vue'
import WeddingText from 'components/text/writeText.vue'
import DialogText from 'components/dialog/dialog.vue'
import Player from 'components/player/player.vue'
import FrontCover from 'components/front-cover/front-cover.vue'
import BaiduMap from 'components/map/map.vue'
import Promise from 'bluebird'

export default {
  name: 'APP',
  data () {
    return {
      coverSrc: [
        require('components/front-cover/IMG1.gif'),
        require('components/front-cover/IMG2.gif'),
        require('components/front-cover/IMG3.gif')
      ]
    }
  },
  mounted () {
  },
  methods: {
    // 动画变动的顺序
    async startAnimation () {
      try {
        await Promise.delay(1000)
        await this.$refs.weddingText.write(0, 57)
        await Promise.delay(3000)
        await this.show()
        await this.$refs.dialogText.write('点击音乐')
        await Promise.delay(2000)
        await this.hide()
        await this.$refs.weddingText.write(58, 119)
        await Promise.delay(3000)
        await this.show()
        await this.$refs.dialogText.write('改变颜色')
        await Promise.delay(3000)
        await this.hide()
        await this.styleChange()
        await this.$refs.weddingText.write(120)
        await this.$refs.bgImg.show()
      } catch (e) {
        console.log(e)
      }
    },
    // 窗口弹出和消失
    show () {
      this.$refs.dialogText.show()
    },
    hide () {
      this.$refs.dialogText.hide()
    },
    // 改变背景的样色
    styleChange () {
      this.$root.$emit('styleAppend')
    },
    // 退出欢迎页面，开始动画效果
    theStartAnimation (flag) {
      if (!flag) {
        this.startAnimation()
      }
    }
  },
  components: {
    BaiduMap,
    BgImg,
    WeddingText,
    DialogText,
    Player,
    FrontCover
  }
}
</script>

<style lang="stylus">
  #app
    position: relative
    width: 100%
    height: 100%
</style>
