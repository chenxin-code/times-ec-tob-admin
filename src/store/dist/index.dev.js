"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _user = _interopRequireDefault(require("./module/user"));

var _getters = _interopRequireDefault(require("./getters"));

var _action = _interopRequireDefault(require("./action"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var store = new _vuex["default"].Store({
  modules: {
    user: _user["default"]
  },
  getters: _getters["default"],
  actions: _action["default"],
  state: function state() {
    return {
      paramMap: {},
      Case_Access_Token: null,
      headers: {
        Authorization: '',
        access_channel: 'mgmt',
        Access_Token: ''
      },
      menus: [],
      menuRouteLoaded: false
    };
  },
  mutations: {
    REFRESHPARAM: function REFRESHPARAM(state, paramKV) {
      //mutation，应该能看懂做的操作吧？
      _vue["default"].set(state.paramMap, paramKV.key, paramKV.value);
    },
    SET_CASE_TOKEN: function SET_CASE_TOKEN(state, token) {
      state.Case_Access_Token = token;
    },
    //设置默认的header头部
    SET_CASE_HEADERS: function SET_CASE_HEADERS(state, token) {
      state.headers = {
        Authorization: token,
        access_channel: 'mgmt',
        Access_Token: token
      };
    },
    SET_MENUS_LIST: function SET_MENUS_LIST(state, menus) {
      menus.unshift({
        menuName: '首页',
        menuType: 'HOME',
        orderNum: 0,
        parentId: 0,
        parentName: null,
        perms: 'HOME',
        url: '/home',
        icon: "" // @/assets/img/menu/icon_supplier.png

      });
      state.menus = menus;
    }
  },
  menuRouteLoaded: function menuRouteLoaded(state, Loaded) {
    state.menuRouteLoaded = Loaded;
  }
});
var _default = store;
exports["default"] = _default;