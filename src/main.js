// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/permission' // 全局导航守卫
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
// import '@mdi/font/css/materialdesignicons.css'
import 'view-design/dist/styles/iview.css'
import * as commonApi from '@/utils/common'
import * as filters from './filters' // global filters
import '@/components' // 导入全局注册组件
import './styles/main.scss'

Vue.config.productionTip = false
Vue.prototype.realUrl = process.env.VUE_APP_BASE_API
// Vue.prototype.realUrl = process.env.VUE_APP_REAL_API
Vue.prototype.commonApi = commonApi

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

window.$Vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
