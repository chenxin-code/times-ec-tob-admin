// 用户管理
export default [
  {
    path: '/home',
    name: 'home',
    menuKey: 'home',
    meta: {
        menu: '/home',
        authKeys: [''],
        bread: [
            {
                path: '/home',
                name: '首页',
            },
        ],
        // keepAlive: true
    },
    component: () => import('@/pages/home/index'),
  }
]