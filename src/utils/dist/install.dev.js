"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  install: function install(Vue, options) {
    Vue.prototype.$power = function (type) {
      return this.$route.meta.buttons.includes(type);
    };
  }
};
exports["default"] = _default;