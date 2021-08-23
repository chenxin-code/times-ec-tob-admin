"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// 菜单管理-账号管理-角色管理
var _default = [{
  path: '/system',
  name: 'system',
  menuKey: 'system',
  meta: {
    menu: '/system',
    authKeys: [''],
    bread: [{
      // path: '/system',
      name: '系统管理'
    }],
    keepAlive: false
  }
}, {
  path: '/accountManagement',
  name: 'accountManagement',
  menuKey: 'accountManagement',
  meta: {
    menu: '/accountManagement',
    authKeys: [''],
    bread: [{
      path: '/accountManagement',
      name: '账号管理'
    }],
    keepAlive: false
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/system/accountManagement/index'));
    });
  }
}, {
  path: '/accountManagement/assignUsers',
  name: 'assignUsers',
  menuKey: 'accountManagement',
  meta: {
    menu: '/accountManagement',
    authKeys: [''],
    bread: [{
      path: '/accountManagement',
      name: '账号管理'
    }, {
      path: '/accountManagement/assignUsers',
      name: '关联角色'
    }],
    keepAlive: false
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/system/accountManagement/assignUsers'));
    });
  }
}, {
  path: '/authority',
  name: 'authority',
  menuKey: 'authority',
  meta: {
    menu: '/authority',
    authKeys: [''],
    bread: [{
      path: '/authority',
      name: '权限管理'
    }] // keepAlive: true

  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/system/authority/menuManagement/index'));
    });
  }
}, {
  path: '/menuManagement',
  name: 'menuManagement',
  menuKey: 'menuManagement',
  meta: {
    menu: '/menuManagement',
    authKeys: [''],
    bread: [{
      path: '/authority',
      name: '权限管理'
    }, {
      path: '/menuManagement',
      name: '菜单管理'
    }] // keepAlive: true

  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/system/authority/menuManagement/index'));
    });
  }
}, {
  path: '/menuManagementEdit',
  name: 'menuManagementEdit',
  menuKey: 'menuManagementEdit',
  meta: {
    menu: '/menuManagement',
    authKeys: [''],
    bread: [{
      path: '/authority',
      name: '权限管理'
    }, {
      path: '/menuManagement',
      name: '菜单管理'
    }, {
      path: '/menuManagementEdit',
      name: '菜单管理详情'
    }],
    keepAlive: false
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/system/authority/menuManagement/edit'));
    });
  }
}, {
  path: '/authority/role',
  name: 'role',
  menuKey: 'role',
  meta: {
    menu: '/authority/role',
    authKeys: [''],
    bread: [{
      path: '/authority',
      name: '权限管理'
    }, {
      path: '/authority/role',
      name: '角色管理'
    }],
    keepAlive: false
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/system/authority/role/index'));
    });
  }
}, {
  path: '/authority/assignRole',
  name: 'assignRole',
  menuKey: 'assignRole',
  meta: {
    menu: '/authority/assignRole',
    authKeys: [''],
    bread: [{
      path: '/authority',
      name: '权限管理'
    }, {
      path: '/authority/role',
      name: '角色管理'
    }, {
      path: '/authority/assignRole',
      name: '分配用户'
    }],
    keepAlive: false
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/system/authority/role/assignRole'));
    });
  }
}, {
  path: '/authority/assignAuthority',
  name: 'assignAuthority',
  menuKey: 'assignAuthority',
  meta: {
    menu: '/authority/assignRole',
    authKeys: [''],
    bread: [{
      path: '/authority',
      name: '权限管理'
    }, {
      path: '/authority/role',
      name: '角色管理'
    }, {
      path: '/authority/assignRole',
      name: '分配权限'
    }],
    keepAlive: false
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/system/authority/role/assignAuthority'));
    });
  }
}];
exports["default"] = _default;