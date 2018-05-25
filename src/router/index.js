import Vue from 'vue'
import Router from 'vue-router'
/* import Regist from '@/components/Regist'
import login from '@/components/login'
import Write from '@/components/write'
import FirstRouter from '@/components/FirstRouter'
import UserInfo from '@/components/UserInfo'
import MarkDown from '@/components/MarkDown'
import BlogList from '@/components/BlogList'
import Mineclear from '@/components/Mineclear'
import Snake from '@/components/Snake'
import SVG01 from '@/components/SVG01'
import zhihu from '@/components/zhihu' */


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/wdw',
      name: 'FirstRouter',
      component: resolve => require(['@/components/FirstRouter'], resolve)
    },
    {
      path: '/zhihu',
      name: 'zhihu',
      component: resolve => require(['@/components/zhihu'], resolve)
    },
    {
      path: '/svg01',
      name: 'SVG01',
      component: resolve => require(['@/components/SVG01'], resolve)
    },
    {
      path: '/regist',
      name: 'Regist',
      component: resolve => require(['@/components/Regist'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/components/login'], resolve)
    },
    {
      path: '/',
      redirect: '/svg01'
    },
    {
      path: '/restart_snake',
      redirect: '/snake'
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: resolve => require(['@/components/UserInfo'], resolve)
    },
    {
      path: '/blog',
      name: 'Blog',
      component: resolve => require(['@/components/MarkDown'], resolve)
    },
    {
      path: '/bloglist',
      name: 'BlogList',
      component: resolve => require(['@/components/BlogList'], resolve)
    },
    {
      path: '/snake',
      name: 'Snake',
      component: resolve => require(['@/components/Snake'], resolve)
    },
    {
      path: '/mineclear',
      name: 'Mineclear',
      component: resolve => require(['@/components/Mineclear'], resolve)
    },
    {
      path: '/write',
      name: 'Write',
      component: resolve => require(['@/components/write'], resolve)
    },

  ]
})
