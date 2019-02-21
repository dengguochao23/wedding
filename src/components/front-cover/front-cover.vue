<template>
  <transition name="sliders">
    <div class="slider" ref="slider" v-if="showWel">
      <div class="slider-group"
           ref="sliderGroup"
           @click="sliderAmination"
           @touchstart.stop='sliderTouchStart'
           @touchmove.stop='sliderTouchMove'
           @touchend.stop='sliderTouchEnd'
           @drag.stop="sliderDrag"
           @dragend.stop="slderDragEnd"
      >
        <div class="slider-item" v-for="value in coverSrc" :key="value">
          <img width="100%" height="100%" :src="value"/>
        </div>
      </div>
      <div class="dots">
        <span class="dot" v-for="(value,index) in coverSrc" :key="index" :class="{active:num===index}"></span>
      </div>
      <div class="welcome" v-if="showFlagWelcome" @click.stop="showWelcome">
        <span class="text">welcome</span>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      deltaX: 0,
      deltaY: 0,
      num: 0,
      isShowWelcome: false,
      showWel: true, // 欢迎界面的设置
      coverSrc: [
        require('components/front-cover/IMG1.gif'),
        require('components/front-cover/IMG2.gif'),
        require('components/front-cover/IMG3.gif')
      ]
    }
  },
  computed: {
    showFlagWelcome () {
      return this.num === this.coverSrc.length - 1
    }
  },
  created () {
    this.touch = {}
    this.drag = []
  },
  mounted () {
    this._setSliderGroup()
  },
  methods: {
    // 为了能在PC端增加一个touch效果，特意在这里增加一个drag事件
    sliderDrag (e) {
      this.drag.push(e.offsetX)
    },
    slderDragEnd () {
      let dragStart = this.drag[0]
      let dragEnd = this.drag[this.drag.length - 2]
      if (dragEnd - dragStart > 0) {
        // 图片向右移动
        this.touch.sliderDirection = 0 // 1代表图片向左，0代表图片向右
      } else {
        // 图片向左移动
        this.touch.sliderDirection = 1
      }
      this.sliderAmination(this.computedSliderImg())
      this.drag = []
    },
    // slider的高度和宽度设置
    _setSliderGroup () {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      let sliderHeight = this.$refs.slider.clientHeight
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        child.style.width = sliderWidth + 'px'
        child.style.height = sliderHeight + 'px'
        width += sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // touch事件的处理
    sliderTouchStart (e) {
      this.touch.initiated = true
      if (!this.touch.sliderTarget) this.touch.sliderTarget = 0
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    sliderTouchMove (e) {
      let offsetWidth
      let sliderGroop = this.$refs.sliderGroup
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      this.deltaX = touch.pageX - this.touch.startX // 负数代表图片向左移动，否则相反
      this.deltaY = touch.pageY - this.touch.startY
      this.touch.sliderDirection = this.deltaX < 0 ? 1 : 0 // 1代表图片向左，0代表图片向右
      if (Math.abs(this.deltaY) > Math.abs(this.deltaX)) {
        return
      }
      if (this.touch.sliderDirection === 1) {
        offsetWidth = Math.min(0, Math.max(-2 * window.innerWidth, this.deltaX + -window.innerWidth * this.num))
      } else {
        offsetWidth = Math.min(0, -window.innerWidth * this.num + this.deltaX)
      }
      sliderGroop.style.transform = `translate3d(${offsetWidth}px,0,0)`
    },
    sliderTouchEnd (e) {
      let percent = Math.abs(this.deltaX) / window.innerWidth
      if (percent < 0.5) {
        this.sliderAmination(-window.innerWidth * this.num)
      } else {
        this.sliderAmination(this.computedSliderImg())
      }
      this.touch.initiated = false
    },
    // 动画部分
    sliderAmination (target) {
      let sliderGroop = this.$refs.sliderGroup
      sliderGroop.style.transition = 'all 0.2s'
      sliderGroop.style.transform = `translate3d(${target}px,0,0)`
    },
    // 计算动画走到第几张
    computedSliderImg () {
      let child = this.$refs.sliderGroup.children.length
      let lastImg = child - 1
      let offsetWidth
      if (this.num < lastImg && this.touch.sliderDirection === 1) {
        this.num++
      } else if (this.touch.sliderDirection === 0) {
        if (this.num === 0) {
          return
        } else {
          this.num--
        }
      }
      offsetWidth = -Math.max(0, this.num) * window.innerWidth
      return offsetWidth
    },
    // 设置欢迎界面的展示设置
    showWelcome () {
      this.showWel = false
      this.$emit('quitWelcome', false) // 抛出欢迎的退出，false为退出
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slider
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    opacity: 1
    &.sliders-leave-active
      transition: all 1s
    &.sliders-leave-to
      opacity: 0
    .slider-group
      white-space: nowrap
      .slider-item
        box-sizing: border-box
        text-align: center
        float: left
    .dots
      width: 48px
      height: 15px
      position: fixed
      left: 50%
      bottom: 30px
      display: flex
      transform: translateX(-50%)
      .dot
        flex-direction: row
        width: 10px
        height: 10px
        margin: 0px 2px
        background-color: #e6e6e6
        border-radius: 50%
        &.active
          background-color: red
    .welcome
      position: fixed
      bottom: 60px
      left: 50%
      transform: translateX(-50%)
      width: 100px
      height: 30px
      border: 1px solid red
      text-align: center
      border-radius: 10px
      line-height: 30px
      color: red
</style>
