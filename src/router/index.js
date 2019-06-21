import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Technology from '@/views/Technology'
import Design from '@/views/Design'
import Other from '@/views/Other'
import AboutMe from '@/views/AboutMe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/technology',
      name: 'Technology',
      component: Technology
    },
    {
      path: '/design',
      name: 'Design',
      component: Design
    },
    {
      path: '/other',
      name: 'Other',
      component: Other
    },
    {
      path: '/aboutMe',
      name: 'AboutMe',
      component: AboutMe
    }
  ]
})
