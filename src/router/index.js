import Vue from 'vue'
import Router from 'vue-router'

// 引入所有的组件 配置相应路由
import Home from '@/components/home/home'
import Login from '@/components/login/login'
import UserList from '@/components/user-list/user-list'
import RolesList from '@/components/roles-list/roles-list'
import RightsList from '@/components/rights-list/rights-list'

// 引入获取token的文件
import {getUserInfo} from '@/assets/js/auth.js'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'user-list',
          path: '/users',
          component: UserList
        },
        {
          name: 'roles',
          path: '/roles',
          component: RolesList
        },
        {
          name: 'rights',
          path: '/rights',
          component: RightsList
        }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 是login直接放行
  // console.log(to.name)
  if (to.name === 'login') {
    return next()
  }
  if (!getUserInfo()) {
    // 没有用户信息，就去登陆
    return next({
      name: 'login'
    })
  }
  next()
})

export default router
