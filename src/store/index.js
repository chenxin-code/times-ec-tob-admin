import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import getters from './getters'
import actions from './action'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
  },
  getters,
  actions,
  state() {
    return {
      paramMap: {},
      Case_Access_Token: null,
      headers: {
        Authorization: '',
        access_channel: 'mgmt',
        Access_Token: '',
      },
      menus: [],
      menuRouteLoaded: false,
    }
  },
  mutations: {
    REFRESHPARAM(state, paramKV) {
      //mutation，应该能看懂做的操作吧？
      Vue.set(state.paramMap, paramKV.key, paramKV.value)
    },
    SET_CASE_TOKEN(state, token) {
      state.Case_Access_Token = token
    },
    //设置默认的header头部
    SET_CASE_HEADERS(state, token) {
      state.headers = {
        Authorization: token,
        access_channel: 'mgmt',
        Access_Token: token,
      }
    },
    SET_MENUS_LIST(state, menus) {
      menus.unshift({
        menuName: '首页',
        menuType:'HOME',
        orderNum:0,
        parentId:0,
        parentName: null,
        perms:'HOME',
        url:'/home',
        icon: ""
        // @/assets/img/menu/icon_supplier.png
      })
      state.menus = menus
    },
  },
  menuRouteLoaded(state, Loaded) {
    state.menuRouteLoaded = Loaded
  },
})

export default store
