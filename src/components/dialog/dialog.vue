<template>
  <transition name="dialogs">
    <div class="dialog-containter" v-if="isShow">
      <div class="dialog-bg"></div>
      <div class="dialog-text" @click="hide">
        <p class="value">{{text}}</p>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {writeMixin} from 'common/js/mixin'
export default {
  mixins: [writeMixin],
  data () {
    return {
      isShow: false,
      text: ''
    }
  },
  methods: {
    show () {
      this.isShow = true
    },
    hide () {
      this.isShow = false
    },
    async write (message) {
      await this.clear()
      await this.writeTo(message, 0, 500, 1)
    },
    clear () {
      if (this.text.length > 0) {
        this.text = ''
        this.i = 0
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .dialog-containter
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    width: 100%
    height 100%
    z-index: 20
    &.dialogs-enter-active, &.dialogs.leave-active
      transition: all 0.5s
    &.dialogs-enter, &.dialogs-leave-to
      opacity: 0
    .dialog-bg
      width: 100%
      height 100%
      background: rgba(0, 0, 0, 0.8);
      filter: blur(5px);
    .dialog-text
      position: absolute
      top: 50%
      left: 50%
      border-radius: 10px
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      width: 40%
      height: 80px
      border: 1px solid black
      background-color: white
      .value
        width: 100%
        text-align: center
        line-height: 40px
</style>
