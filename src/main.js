import Vue from 'vue'
// import VueCookies from 'vue-cookies'

import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import './assets/css/common.less'
import router from './router'
import store from './store'
import Vuex from 'vuex'

Vue.use(VueQuillEditor)

import * as filters from './utils/filters' // global filters
//注册全局过滤器方法
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
import Print from 'vue-print-nb'
Vue.use(Print)

//底部的公共返回保存按鈕
import FormSubmitButton from './components/FormSubmitButton/index.js'
Vue.use(FormSubmitButton)

Vue.use(Vuex)
console.log(window.location)
// Vue.use(VueCookies);

Vue.config.productionTip = false
Vue.use(Antd)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
