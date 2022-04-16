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
      component: () => import('@/views/museum/fish'),
      name: 'Fish',
      meta: {
        title: '鱼类',
      },
    },
    {
      path: 'insect',
      component: () => import('@/views/museum/insect'),
      name: 'Insect',
      meta: {
        title: '昆虫',
      },
    },
    {
      path: 'fossil',
      component: () => import('@/views/museum/fossil'),
      name: 'Fossil',
      meta: {
        title: '化石',
      },
    },
    {
      path: 'artwork',
      component: () => import('@/views/museum/artwork'),
      name: 'Artwork',
      meta: {
        title: '艺术品',
      },
    },
    {
      path: 'halobios',
      component: () => import('@/views/museum/halobios'),
      name: 'Halobios',
      meta: {
        title: '海洋生物',
      },
    },
  ],
}
export default museumRouter
