"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _router = _interopRequireDefault(require("../router"));

var _api = _interopRequireDefault(require("../api"));

var _util = require("../utils/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
包含n个间接更新状态数据的方法的对象
*/
var _default = {
  // 返回
  FALLBACK: function FALLBACK() {
    _router["default"].go(-1);
  },
  EXCHANGE_TOKEN: function EXCHANGE_TOKEN(context) {
    var getQueryString, token, para;
    return regeneratorRuntime.async(function EXCHANGE_TOKEN$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // 获取token
            getQueryString = function getQueryString(name) {
              var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
              var r = window.location.search.substr(1).match(reg);
              if (r != null) return unescape(r[2]);
              return null;
            };

            if (getQueryString('token')) {
              window.localStorage.setItem('SD_ACCESS_TOKEN', getQueryString('token'));
            }

            token = getQueryString('token') || window.localStorage.getItem('SD_ACCESS_TOKEN');
            para = {
              originalToken: token
            };

            _api["default"].loginByOriginalToken(para).then(function _callee(res) {
              var Access_Token;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!(res.code === 200)) {
                        _context.next = 9;
                        break;
                      }

                      Access_Token = 'Bearer ' + res.data.newToken;
                      window.localStorage.setItem('Case_Access_Token', Access_Token); // window.localStorage.setItem('SmAuthorization', Access_Token)

                      context.commit('SET_CASE_TOKEN', Access_Token);
                      context.commit('SET_CASE_HEADERS', Access_Token);
                      _context.next = 7;
                      return regeneratorRuntime.awrap(context.dispatch('GET_MENU_LIST'));

                    case 7:
                      _context.next = 10;
                      break;

                    case 9:
                      (0, _util.returnBaseCms)();

                    case 10:
                      return _context.abrupt("return", Promise.resolve());

                    case 11:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  //获取菜单的目录
  GET_MENU_LIST: function GET_MENU_LIST(context) {
    var res, menus;
    return regeneratorRuntime.async(function GET_MENU_LIST$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(_api["default"].getMenuTreeData());

          case 3:
            res = _context3.sent;
            console.log(res, '---------'); //   const menus = res.data.permList

            menus = res.data;
            context.commit('SET_MENUS_LIST', menus);
            _context3.next = 11;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);

          case 11:
            return _context3.abrupt("return", Promise.resolve());

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 9]]);
  }
};
exports["default"] = _default;