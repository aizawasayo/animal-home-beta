// 有子路由的都需要 Layout，来添加一个嵌套路由出口
import Layout from '@/views/layout/index'

import Vue from 'vue'
import VueRouter from 'vue-router'
/* Router Modules */
import archiveRouter from './modules/archive'
import communityRouter from './modules/community'
import detailRouter from './modules/detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/home'), // home.vue 里的 name 也是 'Home'
    name: 'Home', // 此处举例说明：路由 name 命名时候尽量保证唯一性，并且和其对应的组件名称一致，以便于应用keep-alive
    meta: {
      title: '动森之家',
    },
  },
  {
    path: '/guide',
    component: () =>
      import(/* webpackChunkName: "guide-router" */ '@/views/guide'),
    name: 'Guide',
    meta: {
      title: '攻略',
    },
  },
  archiveRouter,
  communityRouter,
  detailRouter,
  {
    path: '/design',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import('@/views/design'),
        name: 'Design',
        meta: {
          title: '设计分享',
        },
      },
      {
        path: 'add',
        component: () => import('@/views/design/add'),
        name: 'DesignAdd',
        meta: {
          title: '发布我的设计',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    name: 'Login',
  },
  {
    path: '/user',
    component: Layout,
    meta: {
      title: '用户中心',
      // requiresAuth: true
    },
    children: [
      {
        path: '/',
        component: () => import('@/views/user'),
        name: 'UserCenter',
        meta: {
          title: '用户中心',
          requiresAuth: true,
        },
      },
      {
        path: 'edit',
        component: () => import('@/views/user/edit'),
        name: 'UserEdit',
        meta: {
          title: '修改个人信息',
          requiresAuth: true,
        },
      },
      {
        path: 'register',
        component: () => import('@/views/user/register'),
        name: 'Register',
        meta: {
          title: '注册新用户',
        },
      },
      {
        path: 'password',
        component: () => import('@/views/user/password'),
        name: 'PswEdit',
        meta: {
          title: '修改密码',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior: (to, from, savedPosition) => {
      return savedPosition || { x: 0, y: 0 }
    },
  })
// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes,
//   scrollBehavior: (to, from, savedPosition) => {
//     if (savedPosition) {
//       return savedPosition
//     } else {
//       return {
//         y: 0
//       }
//     }
//   },
// })
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
