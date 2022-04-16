const state = {
  menu: [
    {
      text: '首页',
      href: '/'
    },
    {
      text: '攻略',
      href: '/guide'
    },
    {
      text: '图鉴',
      href: '/archive',
      children: [
        {
          text: '小动物',
          href: '/archive/islander'
        },
        {
          text: '博物馆',
          href: '/archive/museum'
        },
        {
          text: '家具',
          href: '/archive/furniture'
        },
        {
          text: '服饰',
          href: '/archive/clothing'
        },
        {
          text: '植物',
          href: '/archive/plant'
        },
        {
          text: '素材',
          href: '/archive/material'
        },
        {
          text: '工具',
          href: '/archive/tool'
        },
        {
          text: '配方',
          href: '/archive/recipe'
        },
        {
          text: '唱片',
          href: '/archive/record'
        }
      ]
    },
    {
      text: '社区',
      href: '/community',
      children: [
        {
          text: '森友墙',
          href: '/community/board'
        },
        {
          text: '菜市场',
          href: '/community/turnip'
        },
        {
          text: '交易区',
          href: '/community/trade'
        }
      ]
    },
    {
      text: '设计分享',
      href: '/design'
      // children: [{
      //     text: '衣服',
      //     href: '/design/clothing'
      //   },
      //   {
      //     text: '帽子',
      //     href: '/design/hat'
      //   },
      //   {
      //     text: '图案',
      //     href: '/design/pattern'
      //   },
      // ],
    }
  ]
}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
