/*
 * @Author: your name
 * @Date: 2021-07-14 17:14:05
 * @LastEditTime: 2021-08-10 14:23:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \times-ec-tob-admin\src\main.js
 */
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
// 基础组件的自动化全局注册。全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生
import './components/common/common.js'

// 引入api
import api from './api'
Vue.prototype.$api = api

// 引入lodash
import lodash from 'lodash'
Vue.prototype._ = lodash

//底部的公共返回保存按鈕
import FormSubmitButton from './components/FormSubmitButton/index.js'
Vue.use(FormSubmitButton)

Vue.use(Vuex)
console.log(window.location)
// Vue.use(VueCookies);

Vue.config.productionTip = false
Vue.use(Antd)

import * as directives from './directive'//import directive fn

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
