// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入vue插件  用来解决发送请求
import httpPlugin from '@/assets/js/http.js'

import App from './App'
import router from './router'

// 引入公共的css
import './assets/css/style.css'

// 使用vue插件
Vue.use(httpPlugin)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
