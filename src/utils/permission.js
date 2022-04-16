import { getToken, validIslogged } from '@/utils/auth'
import { getPageTitle } from '@/utils/common'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from '@/router'

NProgress.configure({
  showSpinner: false,
})
// 路由导航守卫逻辑梳理：
// 1.先进行是否已登录的判断
// 2.已登录：可以任意访问任何路由，除了login（登录状态访问 login 将跳转到前一个路由）
// 3.未登录：需要权限的路由则跳转去登录页面，不需要的直接放行。
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)

  const isLogged = await validIslogged()
  if (isLogged) {
    if (to.path === '/login') {
      next(from.fullPath)
    } else {
      next()
    }
  } else {
    if (to.matched.some(route => route.meta && route.meta.requiresAuth)) {
      if (
        await $Vue.$confirm('提示', '此功能需要先登录，是否去往登录页面', {
          color: 'warning',
        })
      ) {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath,
          }, // 'to.fullPath'是跳转到登录之前页面的路径
        })
      } else {
        if (from.matched.some(route => route.meta && route.meta.requiresAuth)) {
          next('/')
        } else {
          next(false)
        }
      }
    } else {
      // 不需要登录即可访问
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
