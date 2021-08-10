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
  // EXCHANGE_TOKEN(context) {
  //   let getQueryString = name => {
  //     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  //     var r = window.location.search.substr(1).match(reg)
  //     if (r != null) return unescape(r[2])
  //     return null
  //   }

  //   const SD_ACCESS_TOKEN = localStorage.getItem('SD_ACCESS_TOKEN')
  //   const token = getQueryString('token') || SD_ACCESS_TOKEN

  //   window.localStorage.setItem('SD_ACCESS_TOKEN', token)

  //   const para = {
  //     originalToken: token,
  //   }
  //   api.loginByOriginalToken(para).then(res => {
  //     if (res.code === 200) {
  //       let Access_Token = 'Bearer ' + res.data.newToken
  //       window.localStorage.setItem('Case_Access_Token', Access_Token)
  //       context.commit('SET_CASE_TOKEN', Access_Token)
  //     }
  //     //判断如果没有一体化token就跳转
  //     if (res.code == 500) {
  //       // setTimeout(function() {
  //       //   window.location.href = process.env.VUE_APP_BASE_CMS_WEBSITE
  //       // }, 2000)
  //       returnBaseCms()
  //     }
  //     console.log('loginByOriginalToken--->', res)
  //   })
  // },
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
        window.localStorage.setItem('Case_Access_erp_Token', Access_Token)
        // window.localStorage.setItem('SmAuthorization', Access_Token)
        context.commit('SET_CASE_TOKEN', Access_Token)
        context.commit('SET_CASE_HEADERS', Access_Token)
        context.dispatch('GET_MENU_LIST')
      }
      return Promise.resolve()
    })
  },
  async GET_MENU_LIST(context) {
    try {
      let res = await api.getPermListByLogin()
      // console.log(res, '---------')
      const menus = res.data.permList
      context.commit('SET_MENUS_LIST', menus)
    } catch (error) {}
  },
  //获取菜单的目录
  async GET_MENU_LIST(context) {
    try {
      let res = await api.getPermListByLogin()
      // console.log(res, '---------')
      const menus = res.data.permList
      context.commit('SET_MENUS_LIST', menus)
    } catch (error) {}
  },
}
