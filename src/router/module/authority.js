// 菜单管理-账号管理-角色管理
export default [
    {
        path: '/system',
        name: 'system',
        menuKey: 'system',
        meta: {
            menu: '/system',
            authKeys: [''],
            bread: [
                {
                    // path: '/system',
                    name: '系统管理',
                },
            ],
            keepAlive: false
        },
    },
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
        component: () => import('@/pages/system/accountManagement/index'),
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
                { path: '/accountManagement/assignUsers', name: '关联角色' }],
            keepAlive: false
        },
        component: () => import('@/pages/system/accountManagement/assignUsers'),
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
        component: () => import('@/pages/system/authority/menuManagement/index'),
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
      component: () => import('@/pages/system/authority/menuManagement/index'),
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
        component: () => import('@/pages/system/authority/menuManagement/edit'),
    },
    {
        path: '/authority/role',
        name: 'role',
        menuKey: 'role',
        meta: {
            menu: '/authority/role',
            authKeys: [''],
            bread: [{
                path: '/authority',
                name: '权限管理',
            },{ path: '/authority/role', name: '角色管理' }],
            keepAlive: false
        },
        component: () => import('@/pages/system/authority/role/index'),
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
                { path: '/authority/assignRole', name:'分配用户' }],
            keepAlive: false
        },
        component: () => import('@/pages/system/authority/role/assignRole'),
    },
    {
        path: '/authority/assignAuthority',
        name: 'assignAuthority',
        menuKey: 'assignAuthority',
        meta: {
            menu: '/authority/assignRole',
            authKeys: [''],
            bread: [
                { path: '/authority',name: '权限管理'},
                { path: '/authority/role', name: '角色管理' },
                { path: '/authority/assignRole', name:'分配权限' }],
            keepAlive: false
        },
        component: () => import('@/pages/system/authority/role/assignAuthority'),
    },
  ]