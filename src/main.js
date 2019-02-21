import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
Vue.config.productionTip = false

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

const styleElBody = document.getElementsByTagName('html')[0]
app.$on('styleAppend', () => {
  styleElBody.style.backgroundColor = '#FFFEE9'
})
