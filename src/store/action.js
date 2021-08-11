/*
包含n个间接更新状态数据的方法的对象
*/
import router from '../router'
import api from '../api'
import { returnBaseCms } from '../utils/util'

export default {
  // 返回
  FALLBACK() {
    router.go(-1)
  },
  async EXCHANGE_TOKEN(context) {
    // 获取token
    let getQueryString = name => {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
    if (getQueryString('token')) {
      window.localStorage.setItem('SD_ACCESS_TOKEN', getQueryString('token'))
    }
    const token =
      getQueryString('token') || window.localStorage.getItem('SD_ACCESS_TOKEN')
    const para = {
      originalToken: token,
    }
    api.loginByOriginalToken(para).then(res => {
      if (res.code === 200) {
        let Access_Token = 'Bearer ' + res.data.newToken
        window.localStorage.setItem('Case_Access_Token', Access_Token)
        // window.localStorage.setItem('SmAuthorization', Access_Token)
        context.commit('SET_CASE_TOKEN', Access_Token)
        context.commit('SET_CASE_HEADERS', Access_Token)
        context.dispatch('GET_MENU_LIST')
      }
      return Promise.resolve()
    })
  },
  //获取菜单的目录
  async GET_MENU_LIST(context) {
    try {
      let res = await api.getMenuTreeData()
      console.log(res, '---------')
      const menus = res.data.permList
      context.commit('SET_MENUS_LIST', menus)
    } catch (error) {}
  },
}
