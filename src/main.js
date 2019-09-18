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
import vueToTop from 'vue-totop'
import './assets/icon/ali/iconfont.css'
import VueWechatTitle from 'vue-wechat-title'

// import './assets/css/all.css'
// import './common/fonts/font.css'
Vue.use(ElementUI);
Vue.use(Vuex)
Vue.use(vueToTop)
Vue.use(VueWechatTitle)

Vue.prototype.$axios = axios;
Vue.prototype.host = '';

Vue.config.productionTip = false


// 根据路由设置标题
router.beforeEach((to,from,next)=>{
  /*路由发生改变修改页面的title */
  if(to.meta.title){
      document.title=to.meta.title
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
