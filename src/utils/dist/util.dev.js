"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFiveYears = getFiveYears;
exports.getObjYears = getObjYears;
exports.getDateAll = getDateAll;
exports.formatDateTime = formatDateTime;
exports.file2DataURL = file2DataURL;
exports.dataURLtoFile = dataURLtoFile;
exports.getBase64Img = getBase64Img;
exports.isTruePhone = isTruePhone;
exports.vaildPassword = vaildPassword;
exports.blob2Base64 = blob2Base64;
exports.downLoadImage = downLoadImage;
exports.currencyFormat = currencyFormat;
exports.formatMicrometer = formatMicrometer;
exports.returnBaseCms = returnBaseCms;
exports.parseDate = parseDate;
exports.importAll = importAll;
exports.filterAuthority = filterAuthority;
exports.getQueryString = exports.openLink = exports.debounce = void 0;

var _message = _interopRequireDefault(require("ant-design-vue/es/message"));

var _store = _interopRequireDefault(require("@/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 获取前后五年的年份
function getFiveYears(all) {
  var yearArr = all ? ['全部'] : [];
  var nowYear = new Date().getFullYear();
  var afterYear = nowYear + 9;

  for (var i = nowYear; i <= afterYear; i++) {
    yearArr.push(i);
  }

  return yearArr;
} // 获取带id的前后五年的年份


function getObjYears() {
  var FiveYears = getFiveYears();
  var newArr = [{
    id: '',
    name: '全部'
  }];
  FiveYears.forEach(function (e) {
    newArr.push({
      id: e,
      name: e
    });
  });
  return newArr;
}

Date.prototype.format = function () {
  var s = '';
  var mouth = this.getMonth() + 1 >= 10 ? this.getMonth() + 1 : '0' + (this.getMonth() + 1);
  var day = this.getDate() >= 10 ? this.getDate() : '0' + this.getDate();
  s += this.getFullYear() + '-'; // 获取年份。

  s += mouth + '-'; // 获取月份。

  s += day; // 获取日。

  return s; // 返回日期。
}; // 获取某天到某天的所有日期


function getDateAll(begin, end) {
  // 开始日期和结束日期
  console.log(begin, end);
  var arr = [];
  var ab = begin.split('-');
  var ae = end.split('-');
  var db = new Date();
  db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
  var de = new Date();
  de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
  var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
  var unixDe = de.getTime() - 24 * 60 * 60 * 1000;

  for (var k = unixDb; k <= unixDe;) {
    k = k + 24 * 60 * 60 * 1000;
    arr.push(new Date(parseInt(k)).format());
  }

  return arr;
}

function formatDateTime() {
  var myDate = new Date();
  var year = addZero(myDate.getFullYear()); //获取当前年

  var mon = addZero(myDate.getMonth() + 1); //获取当前月

  var date = addZero(myDate.getDate()); //获取当前日

  var hours = addZero(myDate.getHours()); //获取当前小时

  var minutes = addZero(myDate.getMinutes()); //获取当前分钟

  var seconds = addZero(myDate.getSeconds()); //获取当前秒

  var now = "".concat(year).concat(mon).concat(date).concat(hours).concat(minutes).concat(seconds);
  return now;
} // 时间格式转换  (2020-04-20T16:00:00.000+0000 转 yyyy-mm-dd)


function addZero(num) {
  return num < 10 ? '0' + num : num;
}
/**
 * 文件或blob转base64
 * @param blob
 * @param callback
 */


function file2DataURL(blob, callback) {
  var reader = new FileReader();

  reader.onload = function (e) {
    callback(e.target.result);
  };

  reader.readAsDataURL(blob);
}
/**
 * base64转file
 * @param dataUrl
 * @param filename
 * @returns {File}
 */


function dataURLtoFile(dataUrl, filename) {
  var arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {
    type: mime
  });
}
/***
 * Image转base64
 * @param imgUrl
 * @param callback
 */


function getBase64Img(imgUrl, callback) {
  console.log(imgUrl);
  window.URL = window.URL || window.webkitURL;
  var xhr = new XMLHttpRequest();
  xhr.open('get', imgUrl, true);
  xhr.responseType = 'blob';

  xhr.onload = function () {
    if (this.status === 200) {
      //得到一个blob对象
      var blob = this.response;
      var oFileReader = new FileReader();

      oFileReader.onloadend = function (e) {
        var base64 = e.target.result;
        callback && callback(base64);
      };

      oFileReader.readAsDataURL(blob);
    }
  };

  xhr.send();
}
/***
 * 防抖
 */
// let timer = null
// export function debounce(fn, delay = 100) {
//   if (typeof fn !== 'function') {
//     throw new Error('必须传入函数')
//   }
//   if (timer !== null) {
//     clearTimeout(timer)
//   }
//   timer = setTimeout(function() {
//     fn()
//     clearTimeout(timer)
//     timer = null
//   }, delay)
// }


var delayBounceContainer;

var debounce = function debounce(action) {
  var idle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  function delayBounces() {
    var ctx = this,
        args = arguments;
    clearTimeout(delayBounceContainer);
    delayBounceContainer = setTimeout(function () {
      action.apply(ctx, args);
    }, idle);
  }

  return delayBounces();
};

exports.debounce = debounce;

function isTruePhone(areaCode, phone) {
  if (areaCode == '86') {
    // /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
    // /^[1][3-8]\d{9}$/
    if (!/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  } else if (areaCode == '886') {
    if (!/^[0][9]\d{8}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  } else if (areaCode == '852') {
    if (!/^([6|9])\d{7}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  } else if (areaCode == '853') {
    if (!/^[6]([8|6])\d{5}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  }
}
/*
 * {6,30}--》输入字符长度在6到30位之间
 */


function vaildPassword(val) {
  //精准校验：必须含有数字、字母、特殊字符，三个缺一不可
  // let exp = new RegExp(
  //  "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,30}"
  // );
  //-->数字+字母；字母+特殊字符，特殊字符+数字
  // let exp = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
  //强密码(必须包含字母和数字的组合，可以使用特殊字符，长度在6-20之间)
  var exp = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
  return exp.test(val);
}

function blob2Base64(blob, callback) {
  var reader = new FileReader();

  reader.onload = function (e) {
    callback(e.target.result);
  };

  reader.readAsDataURL(blob);
}

function downLoadImage(vp_img_base64) {
  // 这里是获取到的图片base64编码,这里只是个例子哈，要自行编码图片替换这里才能测试看到效果
  var imgUrl = vp_img_base64; // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片

  if (window.navigator.msSaveOrOpenBlob) {
    var bstr = atob(imgUrl.split(',')[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    var blob = new Blob([u8arr]);
    window.navigator.msSaveOrOpenBlob(blob, 'chart-download' + '.' + 'png');
  } else {
    // 这里就按照chrome等新版浏览器来处理
    var a = document.createElement('a');
    a.href = imgUrl;
    a.setAttribute('download', 'chart-download');
    a.click();
  }
} //提交代码点击超链接


var openLink = function openLink(src) {
  var a = document.createElement('a');
  a.setAttribute('href', src);
  a.setAttribute('target', '_blank'); // a.setAttribute("download", "");

  a.setAttribute('id', 'startTelMedicine'); // 防止反复添加

  if (document.getElementById('startTelMedicine')) {
    document.body.removeChild(document.getElementById('startTelMedicine'));
  }

  document.body.appendChild(a);
  a.click();
};

exports.openLink = openLink;

var getQueryString = function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
/**
 * 数字金额格式化，常用场景在过滤器中
 * @param {String|Number} 金额数字，字符串或者数字类型
 * @param {String}        货币符号，默认¥
 * @param {Number}        小数点后精确的位数，默认2
 * @return {String}       加上了,逗号分隔符和小数点.后的字符串
 */


exports.getQueryString = getQueryString;

function currencyFormat() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var currencySign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var decimals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  value = parseFloat(value);
  if (!isFinite(value) || !value && value !== 0) return '';
  var stringified = Math.abs(value).toFixed(decimals);

  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;

  var i = _int.length % 3;
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';

  var _float = decimals ? stringified.slice(-1 - decimals) : '';

  var sign = value < 0 ? '-' : '';
  var digitsRE = /(\d{3})(?=\d)/g;
  return sign + currencySign + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
} //千分符


function formatMicrometer(num) {
  return (num + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
} // 返回一体化


function returnBaseCms(res) {
  var NODE_ENV, baseCmsWebsite;
  return regeneratorRuntime.async(function returnBaseCms$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          NODE_ENV = process.env.NODE_ENV; // 一体化线上域名-返回登陆

          baseCmsWebsite = process.env.VUE_APP_BASE_CMS_WEBSITE || 'http://m-center-uat-linli.timesgroup.cn';

          _message["default"].error('登陆已过期，需要重新登陆');

          setTimeout(function () {
            if (NODE_ENV !== 'development') {
              window.location.href = baseCmsWebsite;
            }
          }, 2000);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
} //格式化开始和结束时间


function parseDate(date, isEnd) {
  var str = undefined;

  if (date) {
    var oDate = new Date(date);
    str = oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate();
  }

  if (!isEnd) {
    str = str + ' 00:00:00';
  } else {
    str = str + ' 23:59:59';
  }

  return str;
} //批量挂载文件


function importAll(r) {
  var routerList = [];
  r.keys().forEach(function (key) {
    routerList.push(r(key)["default"]);
  }); //拉平数组维度

  return routerList.flat();
} //批量筛选动态按钮权限


function filterAuthority(path, type) {
  var menus = JSON.parse(sessionStorage.getItem('store')).menus;
  var buttonChildren = [],
      list = [];
  buttonChildren = mapButtonCHhild(menus, path, buttonChildren);
  buttonChildren.map(function (item) {
    if (item.possessOrNot == 1) {
      list.push(item.perms);
    }
  });
  return list.includes(type);
}

function mapButtonCHhild(data, path, list) {
  data.map(function (item, index) {
    if (item.children && item.children.length > 0) {
      mapButtonCHhild(item.children, path, list);
    } else {
      if (item.url == path) {
        list.push(item.buttonChildren);
      }
    }
  });
  return list[0];
}