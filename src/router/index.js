import Vue from 'vue'
import Router from 'vue-router'
import Regist from '@/components/Regist'
import login from '@/components/login'
import Write from '@/components/write'
import FirstRouter from '@/components/FirstRouter'
import UserInfo from '@/components/UserInfo'
import MarkDown from '@/components/MarkDown'
import BlogList from '@/components/BlogList'
import Mineclear from '@/components/Mineclear'
import Snake from '@/components/Snake'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/wdw',
      name: 'FirstRouter',
      component: FirstRouter
    },
    {
      path: '/regist',
      name: 'Regist',
      component: Regist
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/',
      redirect: '/regist'
    },
    {
      path: '/restart_snake',
      redirect: '/snake'
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/blog',
      name: 'Blog',
      component: MarkDown
    },
    {
      path: '/bloglist',
      name: 'BlogList',
      component: BlogList
    },
    {
      path: '/snake',
      name: 'Snake',
      component: Snake
    },
    {
      path: '/mineclear',
      name: 'Mineclear',
      component: Mineclear
    },
    {
      path: '/write',
      name: 'Write',
      component: Write
    },

  ]
})
