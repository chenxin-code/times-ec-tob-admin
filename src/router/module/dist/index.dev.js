"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = [//商品品类管理
{
  path: '/category',
  name: 'category',
  menuKey: 'category',
  meta: {
    menu: '/category',
    authKeys: [''],
    bread: [{
      path: '/category',
      name: '商品品类管理'
    }] // keepAlive: true

  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/category/list'));
    });
  }
}, //商品上下架
{
  path: '/shelve',
  name: 'shelve',
  menuKey: 'shelve',
  meta: {
    menu: '/shelve',
    authKeys: [''],
    bread: [{
      path: '/shelve',
      name: '商品上下架'
    }] // keepAlive: true

  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/shelve/list'));
    });
  }
}, {
  path: '/shelve/edit',
  name: 'shelveEdit',
  menuKey: 'shelve',
  meta: {
    menu: '/shelve',
    authKeys: [''],
    bread: [{
      path: '/shelve',
      name: '商品上下架'
    }, {
      path: 'shelve/edit',
      name: '商品上下架详情'
    }],
    isUseCache: false,
    keepAlive: false
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/shelve/edit'));
    });
  }
}, //负数单管理
{
  path: '/negative',
  name: 'negative',
  menuKey: 'negative',
  meta: {
    menu: '/negative',
    authKeys: [''],
    bread: [{
      path: '/negative',
      name: '负数单管理'
    }] // keepAlive: true

  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/negative/list'));
    });
  }
}, {
  path: '/negative/add',
  name: 'negativeAdd',
  menuKey: 'negative',
  meta: {
    menu: '/negative',
    authKeys: [''],
    bread: [{
      path: '/negative',
      name: '负数单管理'
    }, {
      path: '/negative/add',
      name: '新建负数单'
    }]
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/negative/add-show'));
    });
  }
}, {
  path: '/negative/show',
  name: 'negativeShow',
  menuKey: 'negative',
  meta: {
    menu: '/negative',
    authKeys: [''],
    bread: [{
      path: '/negative',
      name: '负数单管理'
    }, {
      path: '/negative/show',
      name: '查看负数单'
    }]
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/negative/add-show'));
    });
  }
}, //企业管理
{
  path: '/company',
  name: 'company',
  menuKey: 'company',
  meta: {
    menu: '/company',
    authKeys: [''],
    bread: [{
      path: '/company',
      name: '企业管理'
    }] // keepAlive: true

  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/company/list'));
    });
  }
}, {
  path: '/company/add',
  name: 'companyAdd',
  menuKey: 'company',
  meta: {
    menu: '/company',
    authKeys: [''],
    bread: [{
      path: '/company',
      name: '企业管理'
    }, {
      path: '/company/add',
      name: '新建企业'
    }]
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/company/add-edit'));
    });
  }
}, {
  path: '/company/edit',
  name: 'companyEdit',
  menuKey: 'company',
  meta: {
    menu: '/company',
    authKeys: [''],
    bread: [{
      path: '/company',
      name: '企业管理'
    }, {
      path: '/company/edit',
      name: '编辑企业'
    }]
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/company/add-edit'));
    });
  }
}, //账号管理
{
  path: '/account',
  name: 'account',
  menuKey: 'account',
  meta: {
    menu: '/account',
    authKeys: [''],
    bread: [{
      path: '/account',
      name: '企业账号管理'
    }] // keepAlive: true

  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/account/list'));
    });
  }
}, {
  path: '/account/add',
  name: 'accountAdd',
  menuKey: 'account',
  meta: {
    menu: '/account',
    authKeys: [''],
    bread: [{
      path: '/account',
      name: '企业账号管理'
    }, {
      path: '/account/add',
      name: '新建账号'
    }]
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/account/add-edit'));
    });
  }
}, {
  path: '/account/edit',
  name: 'accountEdit',
  menuKey: 'account',
  meta: {
    menu: '/account',
    authKeys: [''],
    bread: [{
      path: '/account',
      name: '企业账号管理'
    }, {
      path: '/account/edit',
      name: '编辑账号'
    }]
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/account/add-edit'));
    });
  }
}, {
  path: '/market',
  name: 'market',
  menuKey: 'market',
  meta: {
    menu: '/market',
    authKeys: [''],
    bread: [{
      path: '/market',
      name: '销售单管理'
    }] // keepAlive: true

  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/distribution/market/index'));
    });
  }
}, {
  path: '/market/marketdetail',
  name: 'marketdetail',
  menuKey: 'marketdetail',
  meta: {
    menu: '/market',
    authKeys: [''],
    bread: [{
      path: '/market',
      name: '销售单管理'
    }, {
      path: '/market/marketdetail',
      name: '销售单详情'
    }] // keepAlive: true

  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/distribution/market/detail'));
    });
  }
}, {
  path: '/market/deliveryOrder',
  name: 'deliveryOrder',
  menuKey: 'deliveryOrder',
  meta: {
    menu: '/market',
    authKeys: [''],
    bread: [{
      path: '/market',
      name: '销售单管理'
    }, {
      path: '/market/deliveryOrder',
      name: '配送单查询'
    }] // keepAlive: true

  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/distribution/market/deliveryOrder'));
    });
  }
}, {
  path: '/commodity',
  name: 'commodity',
  menuKey: 'commodity',
  meta: {
    menu: '/commodity',
    authKeys: [''],
    bread: [{
      path: '/commodity',
      name: '商品管理'
    }] // keepAlive: true

  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/commodity/index'));
    });
  }
}, {
  path: '/commodity/edit',
  name: 'commodityEdit',
  menuKey: 'commodity',
  meta: {
    menu: '/commodity',
    authKeys: [''],
    bread: [{
      path: '/commodity',
      name: '商品管理'
    }, {
      path: 'commodity/edit',
      name: '商品管理详情'
    }],
    isUseCache: false,
    keepAlive: false
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/pages/commodity/edit'));
    });
  }
}];
exports["default"] = _default;