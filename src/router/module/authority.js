// 菜单管理-账号管理-角色管理
export default [
    {
        path: '/accountManagement',
        name: 'accountManagement',
        menuKey: 'accountManagement',
        meta: {
            menu: '/accountManagement',
            authKeys: [''],
            bread: [
                {
                    path: '/accountManagement',
                    name: '账号管理',
                },
            ],
            keepAlive: false
        },
        component: () => import('@/pages/accountManagement/index'),
    },
    {
        path: '/accountManagement/assignUsers',
        name: 'assignUsers',
        menuKey: 'accountManagement',
        meta: {
            menu: '/accountManagement',
            authKeys: [''],
            bread: [
                {
                    path: '/accountManagement',
                    name: '账号管理',
                },
                { path: '/accountManagement/assignUsers', name: '分配用户' }],
            keepAlive: false
        },
        component: () => import('@/pages/accountManagement/assignUsers'),
    },
    {
        path: '/authority',
        name: 'authority',
        menuKey: 'authority',
        meta: {
            menu: '/authority',
            authKeys: [''],
            bread: [
                {
                    path: '/authority',
                    name: '权限管理',
                },
            ],
            // keepAlive: true
        },
        component: () => import('@/pages/authority/index'),
      },
    {
      path: '/menuManagement',
      name: 'menuManagement',
      menuKey: 'menuManagement',
      meta: {
          menu: '/menuManagement',
          authKeys: [''],
          bread: [
            {
                path: '/authority',
                name: '权限管理',
            },
              {
                  path: '/menuManagement',
                  name: '菜单管理',
              },
          ],
          // keepAlive: true
      },
      component: () => import('@/pages/authority/menuManagement/index'),
    },
    {
        path: '/menuManagementEdit',
        name: 'menuManagementEdit',
        menuKey: 'menuManagementEdit',
        meta: {
            menu: '/menuManagement',
            authKeys: [''],
            bread: [
                {
                    path: '/authority',
                    name: '权限管理',
                },
                {
                    path: '/menuManagement',
                    name: '菜单管理',
                },
                {
                    path: '/menuManagementEdit',
                    name: '菜单管理详情',
                },
            ],
            keepAlive: false
        },
        component: () => import('@/pages/authority/menuManagement/edit'),
    },

    {
        path: '/authority/role',
        name: 'role',
        menuKey: 'role',
        meta: {
            menu: '/authority/role',
            authKeys: [''],
            bread: [{ path: '/authority/role', name: '角色管理' }],
            keepAlive: false
        },
        component: () => import('@/pages/authority/role/index'),
    },
    {
        path: '/authority/assignRole',
        name: 'assignRole',
        menuKey: 'assignRole',
        meta: {
            menu: '/authority/assignRole',
            authKeys: [''],
            bread: [
                { path: '/authority',name: '权限管理'},
                { path: '/authority/role', name: '角色管理' },
                { path: '/authority/assignRole', name:'角色分配' }],
            keepAlive: false
        },
        component: () => import('@/pages/authority/role/assignRole'),
    },
    {
        path: '/authority/assignAuthority',
        name: 'assignAuthority',
        menuKey: 'assignAuthority',
        meta: {
            menu: '/assignAuthority',
            authKeys: [''],
            bread: [
                {
                    path: '/authority',
                    name: '权限管理',
                },
                { path: '/authority/role', name: '角色管理' },
                { path: '/authority/assignRole', name:'角色分配' },
                { path: '/authority/assignAuthority', name:'分配权限' }],
            keepAlive: false
        },
        component: () => import('@/pages/authority/role/assignAuthority'),
    },
  ]