const museumRouter = {
  path: 'museum',
  component: () => import('@/views/archive/museum'),
  name: 'Museum',
  redirect: '/archive/museum/fish',
  meta: {
    title: '博物馆',
  },
  children: [
    {
      path: 'fish',
      component: () =>
        import(/* webpackChunkName: "fish" */ '@/views/museum/fish'),
      name: 'Fish',
      meta: {
        title: '鱼类',
      },
    },
    {
      path: 'insect',
      component: () =>
        import(/* webpackChunkName: "insect" */ '@/views/museum/insect'),
      name: 'Insect',
      meta: {
        title: '昆虫',
      },
    },
    {
      path: 'fossil',
      component: () =>
        import(/* webpackChunkName: "fossil" */ '@/views/museum/fossil'),
      name: 'Fossil',
      meta: {
        title: '化石',
      },
    },
    {
      path: 'artwork',
      component: () =>
        import(/* webpackChunkName: "artwork" */ '@/views/museum/artwork'),
      name: 'Artwork',
      meta: {
        title: '艺术品',
      },
    },
    {
      path: 'halobios',
      component: () =>
        import(/* webpackChunkName: "halobios" */ '@/views/museum/halobios'),
      name: 'Halobios',
      meta: {
        title: '海洋生物',
      },
    },
  ],
}
export default museumRouter
