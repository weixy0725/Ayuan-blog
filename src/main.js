// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store'
import Vuex from 'vuex'
import './assets/icon/ali/iconfont.css'
// import './assets/css/all.css'
// import './common/fonts/font.css'
Vue.use(ElementUI);
Vue.use(Vuex)

Vue.prototype.$axios = axios;
Vue.prototype.host = '/api';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
