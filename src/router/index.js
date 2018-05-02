import Vue from 'vue'
import Router from 'vue-router'
import Regist from '@/components/Regist'
import FirstRouter from '@/components/FirstRouter'
import UserInfo from '@/components/UserInfo'

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
      path: '/',
      redirect: '/regist'
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo
    }
  ]
})
