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
  //负数单管理
  {
    path: '/negative',
    name: 'negative',
    menuKey: 'negative',
    meta: {
      menu: '/negative',
      authKeys: [''],
      bread: [
        {
          path: '/negative',
          name: '负数单管理',
        },
      ],
      // keepAlive: true
    },
    component: () => import('@/pages/negative/list'),
  },
  {
    path: '/negative/add',
    name: 'negativeAdd',
    menuKey: 'negative',
    meta: {
      menu: '/negative',
      authKeys: [''],
      bread: [
        { path: '/negative', name: '负数单管理' },
        { path: '/negative/add', name: '新建负数单' },
      ],
    },
    component: () => import('@/pages/negative/add-show'),
  },
  {
    path: '/negative/show',
    name: 'negativeShow',
    menuKey: 'negative',
    meta: {
      menu: '/negative',
      authKeys: [''],
      bread: [
        { path: '/negative', name: '负数单管理' },
        { path: '/negative/show', name: '查看负数单' },
      ],
    },
    component: () => import('@/pages/negative/add-show'),
  },
  //企业管理
  {
    path: '/company',
    name: 'company',
    menuKey: 'company',
    meta: {
      menu: '/company',
      authKeys: [''],
      bread: [
        {
          path: '/company',
          name: '企业管理',
        },
      ],
      // keepAlive: true
    },
    component: () => import('@/pages/company/list'),
  },
  {
    path: '/company/add',
    name: 'companyAdd',
    menuKey: 'company',
    meta: {
      menu: '/company',
      authKeys: [''],
      bread: [
        { path: '/company', name: '企业管理' },
        { path: '/company/add', name: '新建企业' },
      ],
    },
    component: () => import('@/pages/company/add-edit'),
  },
  {
    path: '/company/edit',
    name: 'companyEdit',
    menuKey: 'company',
    meta: {
      menu: '/company',
      authKeys: [''],
      bread: [
        { path: '/company', name: '企业管理' },
        { path: '/company/edit', name: '编辑企业' },
      ],
    },
    component: () => import('@/pages/company/add-edit'),
  },
  //账号管理
  {
    path: '/account',
    name: 'account',
    menuKey: 'account',
    meta: {
      menu: '/account',
      authKeys: [''],
      bread: [
        {
          path: '/account',
          name: '账号管理',
        },
      ],
      // keepAlive: true
    },
    component: () => import('@/pages/account/list'),
  },
  {
    path: '/account/add',
    name: 'accountAdd',
    menuKey: 'account',
    meta: {
      menu: '/account',
      authKeys: [''],
      bread: [
        { path: '/account', name: '账号管理' },
        { path: '/account/add', name: '新建账号' },
      ],
    },
    component: () => import('@/pages/account/add-edit'),
  },
  {
    path: '/account/edit',
    name: 'accountEdit',
    menuKey: 'account',
    meta: {
      menu: '/account',
      authKeys: [''],
      bread: [
        { path: '/account', name: '账号管理' },
        { path: '/account/edit', name: '编辑账号' },
      ],
    },
    component: () => import('@/pages/account/add-edit'),
  },
  {
    path: '/market',
    name: 'market',
    menuKey: 'market',
    meta: {
      menu: '/market',
      authKeys: [''],
      bread: [
        {
          path: '/market',
          name: '销售单管理',
        },
      ],
      // keepAlive: true
    },
    component: () => import('@/pages/distribution/market/index'),
  },
  {
    path: '/market/marketdetail',
    name: 'marketdetail',
    menuKey: 'marketdetail',
    meta: {
      menu: '/market',
      authKeys: [''],
      bread: [
        { path: '/market', name: '销售单管理' },
        { path: '/market/marketdetail', name: '销售单详情' },
      ],
      // keepAlive: true
    },
    component: () => import('@/pages/distribution/market/detail'),
  },
  {
    path: '/market/deliveryOrder',
    name: 'deliveryOrder',
    menuKey: 'deliveryOrder',
    meta: {
      menu: '/market',
      authKeys: [''],
      bread: [
        { path: '/market', name: '销售单管理' },
        { path: '/market/deliveryOrder', name: '配送单查询' },
      ],
      // keepAlive: true
    },
    component: () => import('@/pages/distribution/market/deliveryOrder'),
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
]
