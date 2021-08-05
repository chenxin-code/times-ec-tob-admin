export default [
  //商品品类管理
  {
    path: '/category',
    name: 'category',
    menuKey: 'category',
    meta: {
      menu: '/category',
      authKeys: [''],
      bread: [
        {
          path: '/category',
          name: '商品品类管理',
        },
      ],
      // keepAlive: true
    },
    component: () => import('@/pages/category/list'),
  },
  //商品上下架
  {
    path: '/shelve',
    name: 'shelve',
    menuKey: 'shelve',
    meta: {
      menu: '/shelve',
      authKeys: [''],
      bread: [
        {
          path: '/shelve',
          name: '商品上下架',
        },
      ],
      // keepAlive: true
    },
    component: () => import('@/pages/shelve/list'),
  },
  {
    path: '/commodity',
    name: 'commodity',
    menuKey: 'commodity',
    meta: {
      menu: '/commodity',
      authKeys: [''],
      bread: [
        {
          path: '/commodity',
          name: '商品管理',
        },
      ],
      // keepAlive: true
    },
    component: () => import('@/pages/commodity/index'),
  },
  {
    path: '/commodity/edit',
    name: 'commodityEdit',
    menuKey: 'commodity',
    meta: {
      menu: '/commodity',
      authKeys: [''],
      bread: [
        { path: '/commodity', name: '商品管理' },
        { path: 'commodity/edit', name: '商品管理详情' },
      ],
      isUseCache: false,
      keepAlive: false,
    },
    component: () => import('@/pages/commodity/edit'),
  },
  {
    path: '/shelve/edit',
    name: 'shelveEdit',
    menuKey: 'shelve',
    meta: {
      menu: '/shelve',
      authKeys: [''],
      bread: [
        { path: '/shelve', name: '商品上下架' },
        { path: 'shelve/edit', name: '商品上下架详情' },
      ],
      isUseCache: false,
      keepAlive: false,
    },
    component: () => import('@/pages/shelve/edit'),
  },
]
