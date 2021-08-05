export default [
  {
    path: '/supplier',
    name: 'supplier',
    menuKey: 'supplier',
    meta: {
      menu: '/supplier',
      authKeys: [''],
      bread: [
        {
          path: '/supplier',
          name: '供应商',
        },
      ],
      // keepAlive: true
    },
    component: () => import('@/pages/distribution/supplier/index'),
  },
  {
    path: '/supplier/supplierdetail',
    name: 'supplierdetail',
    menuKey: 'supplier',
    meta: {
      menu: '/supplier',
      authKeys: [''],
      bread: [
        { path: '/supplier', name: '供应商' },
        { path: 'supplier/supplierdetail', name: '供应商详情' },
      ],
      isUseCache: false,
      keepAlive: false,
    },
    component: () => import('@/pages/distribution/supplier/detail'),
  },
]
