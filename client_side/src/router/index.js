// DONE: включить роутинг
import Vue from 'vue'
import Router from 'vue-router'
import getdata from '@/components/getData'
import index from '@/components/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'root', component: index },
    { path: '/check', name: 'check', component: getdata }
  ]
})
