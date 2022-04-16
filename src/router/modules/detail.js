import Layout from '@/views/layout/index'

const detailRouter = {
  path: '/detail',
  component: Layout,
  name: 'Detail',
  redirect: '/detail/fish',
  meta: {
    title: '详情',
  },
  children: [
    {
      path: 'islander/:id',
      component: () => import('@/views/archive/islander/detail'),
      name: 'IslanderDetail',
      meta: {
        title: '岛民详情',
      },
    },
    {
      path: 'furniture/:id',
      component: () => import('@/views/archive/furniture/detail'),
      name: 'FurnitureDetail',
      meta: {
        title: '家具详情',
      },
    },
    {
      path: 'clothing/:id',
      component: () => import('@/views/archive/clothing/detail'),
      name: 'ClothingDetail',
      meta: {
        title: '服饰详情',
      },
    },
    {
      path: 'plant/:id',
      component: () => import('@/views/archive/plant/detail'),
      name: 'PlantDetail',
      meta: {
        title: '植物详情',
      },
    },
    {
      path: 'material/:id',
      component: () => import('@/views/archive/material/detail'),
      name: 'MaterialDetail',
      meta: {
        title: '素材详情',
      },
    },
    {
      path: 'tool/:id',
      component: () => import('@/views/archive/tool/detail'),
      name: 'ToolDetail',
      meta: {
        title: '工具详情',
      },
    },
    {
      path: 'recipe/:id',
      component: () => import('@/views/archive/recipe/detail'),
      name: 'RecipeDetail',
      meta: {
        title: '配方详情',
      },
    },
    // {
    //   path: 'record/:id',
    //   component: () => import('@/views/archive/record/detail'),
    //   name: 'recordDetail',
    //   meta: {
    //     title: '唱片详情'
    //   }
    // },
    {
      path: 'fish/:id',
      component: () => import('@/views/museum/fish/detail'),
      name: 'FishDetail',
      meta: {
        title: '鱼类详情',
      },
    },
    {
      path: 'insect/:id',
      component: () => import('@/views/museum/insect/detail'),
      name: 'InsectDetail',
      meta: {
        title: '昆虫详情',
      },
    },
    {
      path: 'fossil/:id',
      component: () => import('@/views/museum/fossil/detail'),
      name: 'FossilDetail',
      meta: {
        title: '化石详情',
      },
    },
    {
      path: 'artwork/:id',
      component: () => import('@/views/museum/artwork/detail'),
      name: 'ArtworkDetail',
      meta: {
        title: '艺术品详情',
      },
    },
    {
      path: 'halobios/:id',
      component: () => import('@/views/museum/halobios/detail'),
      name: 'HalobiosDetail',
      meta: {
        title: '海洋生物详情',
      },
      props: true,
    },
    {
      path: 'design/:id',
      component: () => import('@/views/design/detail'),
      name: 'DesignDetail',
      meta: {
        title: 'DIY设计分享详情',
      },
    },
    {
      path: 'guide/:id',
      component: () => import('@/views/guide/detail'),
      name: 'GuideDetail',
      meta: {
        title: '攻略详情',
      },
    },
    {
      path: 'board/:id',
      component: () => import('@/views/community/board/detail'),
      name: 'BoardDetail',
      meta: {
        title: '森友墙详情',
      },
    },
    {
      path: 'turnip/:id',
      component: () => import('@/views/community/turnip/detail'),
      name: 'TunrnipDetail',
      meta: {
        title: '菜市场详情',
      },
    },
    {
      path: 'trade/:id',
      component: () => import('@/views/community/trade/detail'),
      name: 'TradeDetail',
      meta: {
        title: '交易详情',
      },
    },
  ],
}
export default detailRouter
