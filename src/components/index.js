import Vue from 'vue'

// Vue.component('Comment', Comment)

// 异步组件，动态导入会返回一个 `Promise` 对象。
// 评论组件
Vue.component('Comment', () => import('@/components/comment'))

// 文章操作组件，如点赞 收藏 转发
Vue.component('Operation', () => import('@/components/operation'))

// 面包屑导航
Vue.component('bread-crumbs', () => import('@/components/core/BreadCrumbs'))

// 页面主标题
Vue.component('list-header', () => import('@/components/core/ListHeader'))
