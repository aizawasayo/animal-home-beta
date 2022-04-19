import Layout from '@/views/layout/index'

const communityRouter = {
  path: '/community',
  component: Layout,
  name: 'Community',
  redirect: '/community/board',
  children: [
    {
      path: 'board',
      component: () =>
        import(/* webpackChunkName: "board" */ '@/views/community/board'),
      name: 'Board',
      meta: {
        title: '森友墙',
      },
    },
    {
      path: 'board/add',
      component: () =>
        import(
          /* webpackChunkName: "board-add" */ '@/views/community/board/add'
        ),
      name: 'BoardAdd',
      meta: {
        title: '发布我的信息',
        requiresAuth: true,
      },
    },
    {
      path: 'turnip',
      component: () =>
        import(/* webpackChunkName: "turnip" */ '@/views/community/turnip'),
      name: 'Turnip',
      meta: {
        title: '菜市场',
      },
    },
    {
      path: 'turnip/add',
      component: () =>
        import(
          /* webpackChunkName: "turnip-add" */ '@/views/community/turnip/add'
        ),
      name: 'TurnipAdd',
      meta: {
        title: '发布我的大头菜信息',
        requiresAuth: true,
      },
    },
    {
      path: 'trade',
      component: () =>
        import(/* webpackChunkName: "trade" */ '@/views/community/trade'),
      name: 'Trade',
      meta: {
        title: '交易区',
      },
    },
    {
      path: 'trade/add',
      component: () =>
        import(
          /* webpackChunkName: "trade-add" */ '@/views/community/trade/add'
        ),
      name: 'TradeAdd',
      meta: {
        title: '发布我的交易信息',
        requiresAuth: true,
      },
    },
  ],
}

export default communityRouter
