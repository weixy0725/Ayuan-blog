import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Technology from '@/views/Technology'
import Design from '@/views/Design'
import Other from '@/views/Other'
import AboutMe from '@/views/AboutMe'
import Article from '@/views/Article'
import SearchResult from '@/views/SearchResult'
import File from '@/views/File'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{title:'Ayuan既往随叙-首页'}
    },
    {
      path: '/technology',
      name: 'Technology',
      component: Technology,
      meta:{title:'Ayuan既往随叙-技术栈'}
    },
    {
      path: '/design',
      name: 'Design',
      component: Design,
      meta:{title:'Ayuan既往随叙-插画与设计'}
    },
    {
      path: '/other',
      name: 'Other',
      component: Other,
      meta:{title:'Ayuan既往随叙-杂记'}
    },
    {
      path: '/aboutMe',
      name: 'AboutMe',
      component: AboutMe,
      meta:{title:'Ayuan既往随叙-关于我'}
    },
    {
      path: '/article',
      name: 'Article',
      component: Article,
      meta:{title:'Ayuan既往随叙-文章'}
    },
    {
      path: '/searchResult',
      name: 'SearchResult',
      component: SearchResult,
      meta:{title:'Ayuan既往随叙-检索结果'}
    },
    {
      path: '/file',
      name: 'File',
      component: File,
      meta:{title:'Ayuan既往随叙-归档'}
    }
  ]
})
