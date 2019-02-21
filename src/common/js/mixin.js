import Promise from 'bluebird'

const endOfSentence = /[？ ！ 。 ]$/
const common = /[， ； 、]$/

export const writeMixin = {
  data () {
    return {
      i: 0
    }
  },
  methods: {
    async writeTo (message, index, interval, charsPerInterval, target) {
      this.i++
      let chars = message.slice(index, index + charsPerInterval)
      let targetValue
      if (target) {
        targetValue = target
      } else {
        targetValue = message.length
      }
      index += charsPerInterval
      this.writeSimpleChar(chars)
      if (this.i < targetValue) {
        let thisInterval = interval
        let thisSlice = message.slice(index, index + 4)
        if (common.test(thisSlice)) {
          thisInterval = interval * 2
        }
        if (endOfSentence.test(thisSlice)) {
          thisInterval = interval * 5
        }
        do {
          await Promise.delay(thisInterval)
        } while (this.i === target)
        return this.writeTo(message, index, interval, charsPerInterval, target)
      }
    },
    writeSimpleChar (char) {
      this.text += char
    }
  }
}
