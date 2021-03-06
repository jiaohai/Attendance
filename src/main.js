// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTouch from 'vue-touch'
import Axios from 'axios'
import 'font-awesome/css/font-awesome.css'
import '../static/jquery-1.11.1/jquery.min.js'
import '../static/styles/basic.css'
// import '../static/mobile-detect/mobile-detect.js'
// import '../static/qywx/jweixin-1.2.0.js'

import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(VueTouch, {name: 'v-touch'})
Vue.prototype.$axios = Axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
