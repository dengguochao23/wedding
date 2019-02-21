<template>
  <pre class="intro">
    <div v-html="text" class="text-wrapper"></div>
  </pre>
</template>

<script type="text/ecmascript-6">
import weddingText from './writeText.txt'
import {writeMixin} from 'common/js/mixin'
export default {
  name: 'writeText',
  mixins: [writeMixin],
  data () {
    return {
      text: '',
      i: 0
    }
  },
  methods: {
    async write (index, target) {
      await this.writeTo(weddingText, index, 100, 1, target)
    }
  }
}
</script>

<style scoped lang="stylus">
  .intro
    white-space: pre-wrap
    max-height: 44.6%
    z-index: 10
    width: 70%
    position: fixed
    left: 15%
    .text-wrapper
      margin-top: 28%
      font-size: 1.1em
      line-height: 1.2em
</style>
