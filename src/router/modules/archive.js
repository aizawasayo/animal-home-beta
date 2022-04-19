/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/views/layout/index'
import museumRouter from './museum'

const archiveRouter = {
  path: '/archive',
  component: Layout,
  redirect: '/archive/islander',
  name: 'Archive',
  meta: {
    title: '图鉴',
  },
  children: [
    {
      path: 'islander',
      component: () =>
        import(/* webpackChunkName: "islander" */ '@/views/archive/islander'),
      name: 'Islander',
      meta: {
        title: '岛民',
      },
    },
    museumRouter,
    {
      path: 'furniture',
      component: () =>
        import(/* webpackChunkName: "furniture" */ '@/views/archive/furniture'),
      name: 'Furniture',
      meta: {
        title: '家具',
      },
    },
    {
      path: 'clothing',
      component: () =>
        import(/* webpackChunkName: "clothing" */ '@/views/archive/clothing'),
      name: 'Clothing',
      meta: {
        title: '服饰',
      },
    },
    {
      path: 'plant',
      component: () =>
        import(/* webpackChunkName: "plant" */ '@/views/archive/plant'),
      name: 'Plant',
      meta: {
        title: '植物',
      },
    },
    {
      path: 'material',
      component: () =>
        import(/* webpackChunkName: "material" */ '@/views/archive/material'),
      name: 'Material',
      meta: {
        title: '素材',
      },
    },
    {
      path: 'tool',
      component: () =>
        import(/* webpackChunkName: "tool" */ '@/views/archive/tool'),
      name: 'Tool',
      meta: {
        title: '工具',
      },
    },
    {
      path: 'recipe',
      component: () =>
        import(/* webpackChunkName: "recipe" */ '@/views/archive/recipe'),
      name: 'Recipe',
      meta: {
        title: 'DIY配方',
      },
    },
    {
      path: 'record',
      component: () =>
        import(/* webpackChunkName: "record" */ '@/views/archive/record'),
      name: 'Record',
      meta: {
        title: '唱片',
      },
    },
  ],
}

export default archiveRouter
