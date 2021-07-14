import Vue from 'vue'
// import VueCookies from 'vue-cookies'

import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import './assets/css/common.less'
import router from './router'
import store from './store'
import Vuex from "vuex"

import * as filters from "./utils/filters"; // global filters
//注册全局过滤器方法
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
import Print from 'vue-print-nb'
Vue.use(Print);

Vue.use(Vuex);
console.log(window.location)
// Vue.use(VueCookies);

Vue.config.productionTip = false;
Vue.use(Antd);



new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
