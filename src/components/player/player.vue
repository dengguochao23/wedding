<template>
  <div class="player">
    <transition name="normal">
      <div class="player-normal" v-show="fullscreen">
        <div class="background">
          <img width="100%" height="100%" :src="img" alt="">
        </div>
        <!--上标题-->
        <div class="top">
          <div class="back" @click="close">
            <i class="icon-back"></i>
          </div>
          <!--白色的栏杆-->
          <div class="needle-plus">
            <img width="48%" height="48%" :src="require('./img/needle-plus.png')" alt="">
          </div>
        </div>
        <div class="middle">
          <div class="cd-wrapper" :class="cdCls">
            <img width="160px" height="160px" class="cd-img" :src="img" alt="">
            <img width="260px" height="260px" class="cd-bg" :src="cdbgImg" alt="">
          </div>
          <div class="cd-name">
            <p class="cd-title">{{this.song}}</p>
            <p class="cd-singer">{{this.singer}}</p>
          </div>
        </div>
        <div class="bottom">
          <!--滚动条-->
          <div class="progress-wrapper">
            <span class="time">{{format(this.currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onPercentChange"></progress-bar>
            </div>
            <span class="time">{{format(this.duration)}}</span>
          </div>
          <!--控制-->
          <div class="operators">
            <div class="icon icon-left" @click="pre">
              <i class="icon-jiantouzuo"></i>
            </div>
            <div class="icon icon-center" @click="togglePlaying">
              <i :class="iconCls"></i>
            </div>
            <div class="icon icon-right" @click="next">
              <i class="icon-jiantouyou"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="smallBar">
      <div class="player-bar" v-show="!fullscreen" @click.stop="open">
        <i class="icon-erji"></i>
      </div>
    </transition>
    <audio ref="audio" @error="error" :src="src"
           @canplay="ready"
           @timeupdate='updateTime'
           @ended="end"
           preload="auto"
    ></audio>
  </div>
</template>

<script type="text/ecmascript-6">
import ProgressBar from 'common/process-bar/process-bar'
import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
const MAX_SINGER = 1
export default {
  data () {
    return {
      fullscreen: false, // 控制屏幕全屏
      i: 0, // 控制下一首或者上一首歌曲
      songReady: false, // 防止歌曲自己自动播放
      playing: false,
      img: '',
      src: '',
      duration: 0,
      currentTime: 0,
      musicData: {},
      song: '',
      singer: '',
      cdbgImg: require('./img/disc-plus.png') // cd样式图片
    }
  },
  computed: {
    cdCls () {
      return this.playing ? 'play' : 'play pause'
    },
    iconCls () {
      return this.playing ? 'icon-stop' : 'icon-play'
    },
    percent () {
      return this.currentTime / this.duration
    }
  },
  created () {
    this._getMusicList()
  },
  mounted () {
    setTimeout(() => {
      this._normalMusic(0)
    }, 100)
  },
  methods: {
    // 获取歌曲的类别，利用的本地的ajax请求
    _getMusicList () {
      const url = debug ? '/api/data' : 'http://www.dengguochao.top/wedding/api/data'
      axios.get(url).then((res) => {
        this.musicData = res.data.data.musics
      })
    },
    _normalMusic (num) {
      let music = this.musicData[num]
      this.duration = music.duration
      this.img = music.img
      this.singer = music.singer
      this.song = music.song
      this.src = require(`${music.src}`)
    },
    // 播放器缩小放大
    open () {
      this.fullscreen = true
      if (!this.playing) {
        this.play()
      }
    },
    close () {
      this.fullscreen = false
    },
    // 播放控制
    togglePlaying () {
      if (this.playing) {
        this.playing = false
        this.stop()
      } else {
        this.playing = true
        this.play()
      }
    },
    play () {
      this.$refs.audio.play()
      this.playing = true
    },
    stop () {
      this.$refs.audio.pause()
    },
    ready () {
    },
    error (e) {
      // console.log(e)
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    end (e) {
      this.next()
    },
    // 下一首歌，上一首歌
    next () {
      this.i++
      console.log(this.i)
      while (this.i > MAX_SINGER) {
        this.i = 0
      }
      this.readyState = true
      this._normalMusic(this.i)
    },
    pre () {
      this.i--
      while (this.i === -1) {
        this.i = MAX_SINGER
      }
      this._normalMusic(this.i)
    },
    // 歌曲快进
    onPercentChange (percent) {
      const currentTime = this.duration * percent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    // 时间处理
    format (interval) {
      interval = interval | 0
      const min = interval / 60 | 0
      const Sccond = this._pad(interval % 60)
      return `${min}:${Sccond}`
    },
    _pad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    }
  },
  components: {
    ProgressBar
  },
  watch: {
    song (newSong, oldSong) {
      if (newSong === oldSong) {
        return
      }
      if (!this.readyState) {
        return
      }
      this.playing = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$refs.audio.play()
      }, 500)
    },
    played (newPlay) {
      if (newPlay) {
        this.play()
      } else {
        this.stop()
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .player
    .player-normal
      position: fixed
      right: 0
      bottom: 0
      width: 100%
      height: 100%
      background-color: black
      z-index: 200
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.3s
      &.normal-enter
        position: fixed
        bottom: -5%
        transform: scale(0)
      &.normal-leave-to
        top: 10%
        transform: scale(0)
      .background
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-color: black
        opacity: 0.6
        z-index: -1
        filter: blur(10px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position: absolute
          top: 0
          padding-top: 10px
          left: 6px
          z-index: 50
          .icon-back
            font-size: 30px
            color: white
        .needle-plus
          position: absolute
          top: 0
          left: 40%
          z-index: 50
      .middle
        position: fixed
        top: 95px
        bottom: 170px
        width: 100%
        .cd-wrapper
          width: 260px
          height: 260px
          margin: auto
          position: relative
          &.play
            animation: rotate 20s linear infinite
          &.pause
            animation-play-state: paused
          .cd-img
            position: absolute
            left: 0
            top: 0
            right: 0
            bottom: 0
            margin: auto
            border-radius: 50%
          .cd-bg
            position: absolute
            left: 0
            top: 0
            right: 0
            bottom: 0
            margin: auto
        .cd-name
          text-align: center
          padding-top: 10px
          .cd-title
            font-size: 22px
            color: white
          .cd-singer
            font-size: 18px
            color: white
      .bottom
        position: absolute
        bottom: 40px
        width: 100%
        .progress-wrapper
          display: flex
          width: 80%
          align-items: center
          margin: 0 auto
          .progress-bar-wrapper
            flex: 1
            margin: 0 10px
          .time
            color: white
            font-size: 14px
        .operators
          width: 100%
          display: flex
          margin: 0 auto
          margin-top: 20px
          .icon
            text-align: center
            color: white
            flex: 1
            i
              font-size: 50px
          .icon-right
            text-align: left
          .icon-center
            text-align: center
          .icon-left
            text-align: right

  .player-bar
    position: fixed
    bottom: 40%
    left: 50%
    transform: translateX(-50%)
    .icon-erji
      font-size: 40px

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
