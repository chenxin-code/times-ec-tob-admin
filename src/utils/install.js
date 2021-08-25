export default {
  install (Vue, options) {
    Vue.prototype.$power = function (type) {
      return this.$route.meta.buttons.includes(type)
    }
  }
}