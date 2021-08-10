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
      menus: [
        //   {
        //     "id":"222",
        //     "permCode":null,
        //     "permIcon":null,
        //     "permName":"菜单管理",
        //     "permType":null,
        //     "permUrl":"/menuManagement"
        // },
        // {
        //     "id":"111",
        //     "permCode":"ACCOUNT_MANAGE",
        //     "permIcon":null,
        //     "permName":"账号列表",
        //     "permType":"MANAGEMENT",
        //     "permUrl":"/accountList"
        // },
      ],
      menuRouteLoaded:false
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
        id: '',
        permCode: '',
        permIcon: null,
        permName: '首页',
        permType: 'HOME',
        permUrl: '/home',
      })
      state.menus = menus
    },
  },
})

export default store
