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
  },
})

export default store
