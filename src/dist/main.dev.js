"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _vue = _interopRequireDefault(require("vue"));

var _vueQuillEditor = _interopRequireDefault(require("vue-quill-editor"));

require("quill/dist/quill.core.css");

require("quill/dist/quill.snow.css");

require("quill/dist/quill.bubble.css");

var _App = _interopRequireDefault(require("./App.vue"));

var _antDesignVue = _interopRequireDefault(require("ant-design-vue"));

require("ant-design-vue/dist/antd.less");

require("./assets/css/common.less");

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _vuex = _interopRequireDefault(require("vuex"));

var filters = _interopRequireWildcard(require("./utils/filters"));

var _vuePrintNb = _interopRequireDefault(require("vue-print-nb"));

require("./components/common/common.js");

var _api = _interopRequireDefault(require("./api"));

var _lodash = _interopRequireDefault(require("lodash"));

var _index = _interopRequireDefault(require("./components/FormSubmitButton/index.js"));

var _install = _interopRequireDefault(require("@/utils/install.js"));

var directives = _interopRequireWildcard(require("./directive"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Author: your name
 * @Date: 2021-07-14 17:14:05
 * @LastEditTime: 2021-08-10 14:23:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \times-ec-tob-admin\src\main.js
 */
// import VueCookies from 'vue-cookies'
// require styles
_vue["default"].use(_vueQuillEditor["default"]);

// global filters
//注册全局过滤器方法
Object.keys(filters).forEach(function (key) {
  _vue["default"].filter(key, filters[key]);
});

_vue["default"].use(_vuePrintNb["default"]); // 基础组件的自动化全局注册。全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生


_vue["default"].prototype.$api = _api["default"]; // 引入lodash

_vue["default"].prototype._ = _lodash["default"]; //底部的公共返回保存按鈕

_vue["default"].use(_index["default"]); //全局注入方法


_vue["default"].use(_install["default"]);

_vue["default"].use(_vuex["default"]);

_vue["default"].config.productionTip = false;

_vue["default"].use(_antDesignVue["default"]);

//import directive fn
Object.keys(directives).forEach(function (key) {
  _vue["default"].directive(key, directives[key]);
}); //挂载异步函数

function fn() {
  return regeneratorRuntime.async(function fn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_store["default"].dispatch('EXCHANGE_TOKEN'));

        case 3:
          _context.next = 7;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);

        case 7:
          new _vue["default"]({
            router: _router["default"],
            store: _store["default"],
            render: function render(h) {
              return h(_App["default"]);
            }
          }).$mount('#app');

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
}

fn();