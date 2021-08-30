"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.fetchSeamApi = exports.fetchApi = exports.ACTION_BASEURL = exports.HTTP = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _modal = _interopRequireDefault(require("ant-design-vue/es/modal"));

var _axios = _interopRequireDefault(require("axios"));

var _nprogress = _interopRequireDefault(require("nprogress"));

var _jsonBigint = _interopRequireDefault(require("json-bigint"));

var _message = _interopRequireDefault(require("ant-design-vue/es/message"));

var api = _interopRequireWildcard(require("@/api/login"));

var _qs = _interopRequireDefault(require("qs"));

var _store = _interopRequireDefault(require("../store"));

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var baseCmsWebsite = process.env.VUE_APP_BASE_CMS_WEBSITE || 'http://m-center-uat-linli.timesgroup.cn';
var BASEURL = '';
var CENTERBASEURL = '';
console.log('VUE_APP_BASE_API--->', process.env.VUE_APP_BASE_API, process.env.VUE_APP_BASE_CMS_WEBSITE);
var VUE_APP_BASE_API = process.env.VUE_APP_BASE_API;
BASEURL = VUE_APP_BASE_API;
CENTERBASEURL = VUE_APP_BASE_API;
console.log('BASEURL:' + BASEURL);
var JSONBigString = (0, _jsonBigint["default"])({
  storeAsString: true
});

var HTTP = _axios["default"].create({
  // baseURL: BASEURL,
  baseURL: CENTERBASEURL,
  withCredentials: true,
  timeout: 50000,
  headers: {// post: {
    //   'Content-Type': 'application/json'
    // }
  },
  transformResponse: [function (data) {
    return JSONBigString.parse(data);
  }]
}); // export const ACTION_BASEURL = BASEURL;


exports.HTTP = HTTP;
var ACTION_BASEURL = CENTERBASEURL; //请求拦截

exports.ACTION_BASEURL = ACTION_BASEURL;
HTTP.interceptors.request.use(function _callee(config) {
  var tokenStr, _tokenStr;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _nprogress["default"].start();

          if (!(config.url.indexOf('/times/auth/oauth/token') >= 0 || config.url.indexOf('/verifycode/api/v1/send') >= 0)) {
            _context.next = 7;
            break;
          }

          tokenStr = '';
          config.headers.Authorization = tokenStr;
          return _context.abrupt("return", config);

        case 7:
          if (config.url.indexOf('/times/pub-center/qr-code/api/v1/qr/insert') >= 0) {
            config.headers.program_code = 'app_notice';
          }

          _tokenStr = 'Bearer ' + localStorage.getItem('SD_ACCESS_TOKEN');
          config.headers.Authorization = _tokenStr;
          return _context.abrupt("return", config);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});

function handleParams(url, rawData, rawMethod, responseType) {
  var method = rawMethod.toUpperCase();
  var data = {};

  if (method === 'GET') {
    data = {
      params: rawData
    };
  }

  switch (method) {
    case 'GET':
      data = {
        params: rawData
      };
      break;

    case 'POST':
    case 'PUT':
    case 'PATCH':
    case 'DELETE':
      data = {
        data: rawData
      };
      break;

    default:
      data = {
        params: rawData
      };
      break;
  }

  return Promise.resolve({
    url: url,
    method: method,
    data: data,
    responseType: responseType
  });
}

function handleFail(option) {
  var error, reject, response, originalRequest;
  return regeneratorRuntime.async(function handleFail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(option);
          error = option.error, reject = option.reject;
          response = error.response;

          if (!response) {
            _context2.next = 19;
            break;
          }

          _context2.t0 = response.status;
          _context2.next = _context2.t0 === 400 ? 7 : _context2.t0 === 401 ? 9 : _context2.t0 === 403 ? 10 : _context2.t0 === 404 ? 11 : _context2.t0 === 500 ? 13 : 15;
          break;

        case 7:
          _message["default"].error('请求失败');

          return _context2.abrupt("break", 17);

        case 9:
          return _context2.abrupt("break", 17);

        case 10:
          return _context2.abrupt("break", 17);

        case 11:
          _message["default"].error('请求失败');

          return _context2.abrupt("break", 17);

        case 13:
          _message["default"].error('请求失败');

          return _context2.abrupt("break", 17);

        case 15:
          _message["default"].error('请求失败');

          return _context2.abrupt("break", 17);

        case 17:
          _context2.next = 21;
          break;

        case 19:
          originalRequest = error.config;

          if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !originalRequest._retry) {
            originalRequest._retry = true;

            _message["default"].error('请求超时');
          }

        case 21:
          reject(error);

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  });
}

var defaultHeader = {
  timezoneoffset: Math.abs(new Date().getTimezoneOffset() / 60),
  locale: 'zh_CN',
  get: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  access_channel: 'mgmt'
};
var refresh = false;

function refreshToken() {
  var para;
  return regeneratorRuntime.async(function refreshToken$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          refresh = true;
          para = _qs["default"].stringify({
            grant_type: 'refresh_token',
            client_id: 'web_b',
            client_secret: 'times',
            username: window.localStorage.getItem('SD_LOGIN_NAME'),
            password: '',
            scope: 'all',
            refresh_token: window.localStorage.getItem('SD_ACCESS_REFRESHTOKEN')
          });
          api.toLogin(para).then(function (res) {
            if (res.code === 200) {
              window.localStorage.setItem('SD_ACCESS_TOKEN', res.data.token);
              window.localStorage.setItem('SD_ACCESS_REFRESHTOKEN', res.data.refreshToken);
              location.reload();
            }
          })["finally"](function () {});

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
} // // 返回一体化
// async function returnBaseCms(res) {
//   message.error('登陆已过期，需要重新登陆')
//   setTimeout(function() {
//     window.location.href = baseCmsWebsite
//   }, 2000)
// }


var fetchApi = function fetchApi(api) {
  var rawData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var responseType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'json';
  var url = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : CENTERBASEURL;
  var ifplaceholder = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var Access_Token = _store["default"].state.Case_Access_Token;
  return handleParams(api, rawData, method, headers, responseType).then(function (options) {
    return new Promise(function (resolve, reject) {
      if (responseType == 'blob') {
        var tokenStr = 'Bearer ' + localStorage.getItem('SD_ACCESS_TOKEN');
        (0, _axios["default"])({
          url: options.url,
          method: options.method,
          headers: _objectSpread({
            Access_Token: Access_Token
          }, defaultHeader, {
            'Content-Type': 'application/json'
          }),
          data: _objectSpread({}, options.data),
          responseType: 'blob' // 设置服务器响应的数据类型（必选）

        }).then(function (resp) {
          var res = resp.data;
          console.log(resp); // 下载正常处理

          var fileName = resp.headers['content-disposition'];
          console.log(fileName); // 获取文件名

          if (fileName && fileName.length >= 2) {
            fileName = fileName.split('=')[1];
          }

          fileName = decodeURI(escape(fileName));
          console.log(fileName); // 兼容ie11

          if (window.navigator.msSaveOrOpenBlob) {
            try {
              window.navigator.msSaveOrOpenBlob(new Blob([res]), fileName);
            } catch (e) {
              console.log(e);
            }

            return;
          } // a标签实现下载


          var url = window.URL.createObjectURL(new Blob([res]));
          var link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
        });
      } else {
        HTTP(_objectSpread({
          baseURL: url,
          withCredentials: true,
          url: options.url,
          method: options.method,
          headers: _objectSpread({
            Access_Token: Access_Token
          }, defaultHeader, {}, headers)
        }, options.data)).then(function (resp) {
          _nprogress["default"].done();

          var res = resp.data;

          if (res.code === 0) {
            resolve(res);
          } else {
            // 未登录或token过期统一响应码是401
            if (res.code === 401) {
              console.log('401');

              if (refresh) {
                (0, _util.returnBaseCms)(res); //返回一体化登陆

                resolve(res);
              } else {
                (0, _util.returnBaseCms)(res); //返回一体化登陆

                resolve(res); // refreshToken();
              }
            } else if (res.code !== 200) {
              _message["default"].error(res.message);

              resolve(res);
            } else {
              resolve(res);
            }
          }
        }, function (error) {
          _nprogress["default"].done();

          handleFail({
            error: error,
            reject: reject,
            options: options
          });
          throw error;
        });
      }
    });
  });
};

exports.fetchApi = fetchApi;

var fetchSeamApi = function fetchSeamApi(api) {
  var rawData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var responseType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'json';
  var url = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : CENTERBASEURL;
  return handleParams(api, rawData, method, headers, responseType).then(function (options) {
    return new Promise(function (resolve, reject) {
      if (responseType == 'blob') {
        var tokenStr = 'Bearer ' + localStorage.getItem('SD_ACCESS_TOKEN');
        (0, _axios["default"])({
          url: options.url,
          method: options.method,
          headers: _objectSpread({
            Access_Token: Access_Token
          }, defaultHeader, {
            'Content-Type': 'application/json'
          }),
          data: _objectSpread({}, options.data),
          responseType: 'blob' // 设置服务器响应的数据类型（必选）

        }).then(function (resp) {
          var res = resp.data;
          console.log(resp); // 下载正常处理

          var fileName = resp.headers['content-disposition'];
          console.log(fileName); // 获取文件名

          if (fileName && fileName.length >= 2) {
            fileName = fileName.split('=')[1];
          }

          fileName = decodeURI(escape(fileName));
          console.log(fileName); // 兼容ie11

          if (window.navigator.msSaveOrOpenBlob) {
            try {
              window.navigator.msSaveOrOpenBlob(new Blob([res]), fileName);
            } catch (e) {
              console.log(e);
            }

            return;
          } // a标签实现下载


          var url = window.URL.createObjectURL(new Blob([res]));
          var link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
        });
      } else {
        HTTP(_objectSpread({
          baseURL: 'http://m-center-uat-linli.timesgroup.cn',
          withCredentials: true,
          url: options.url,
          method: options.method,
          headers: _objectSpread({
            Access_Token: Access_Token
          }, defaultHeader, {}, headers)
        }, options.data)).then(function (resp) {
          _nprogress["default"].done();

          var res = resp.data;

          if (res.code === 0) {
            resolve(res);
          } else {
            // 未登录或token过期统一响应码是401
            if (res.code === 401) {
              console.log('401');

              if (refresh) {
                (0, _util.returnBaseCms)(res); //返回一体化登陆

                resolve(res);
              } else {
                (0, _util.returnBaseCms)(res); //返回一体化登陆

                resolve(res); // refreshToken();
              }
            } else if (res.code !== 200) {
              _message["default"].error(res.message);

              resolve(res);
            } else {
              resolve(res);
            }
          }
        }, function (error) {
          _nprogress["default"].done();

          handleFail({
            error: error,
            reject: reject,
            options: options
          });
          throw error;
        });
      }
    });
  });
};

exports.fetchSeamApi = fetchSeamApi;
var _default = {
  downLoad: function downLoad(url, data) {
    return (0, _axios["default"])({
      method: 'get',
      url: url,
      params: data,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('SD_ACCESS_TOKEN')
      },
      responseType: 'blob'
    });
  },
  downLoadForPost: function downLoadForPost(url, data) {
    return (0, _axios["default"])({
      method: 'post',
      url: url,
      data: data,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('SD_ACCESS_TOKEN')
      },
      responseType: 'blob'
    });
  }
};
exports["default"] = _default;