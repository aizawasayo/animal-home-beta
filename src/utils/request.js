import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  async response => {
    const res = response.data
    const statusCode = res.code || response.status
    // 未报错，但响应状态码不是 200, 解析返回的问题
    // 我的后端服务遇到问题一般都抛出了错误，故放在下方 error 回调中处理
    if (statusCode !== 200) {
      // $Vue.$dialogLoader.showSnackbar(res.message, {
      //   color: 'error'
      // })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围
      console.log(error.response.data)
      // console.log(error.response.status)
      // console.log(error.response.headers)
      if ([401, 403].includes(error.response.status)) {
        // token 已过期，删除本地 token
        // 因为我们的部分路由是允许游客访问的，所以只需要刷新页面，其余交给路由去处理
        // 这样一些需要获取登录状态的页面也可以直接根据 token 是否存在来判断路由访问或功能的权限
        this.$store.dispatch('user/resetToken')
      }
    } else if (error.request) {
      // 请求已发出但未收到响应. `error.request` 是浏览器中 XMLHttpRequest 的一个实例
      console.log(error.request)
    } else {
      // 在设置触发错误的请求时发生了一些事情
      console.log('Error', error.message)
    }
    // console.log(error.config)
    return Promise.reject(error)
  }
)

export default service
