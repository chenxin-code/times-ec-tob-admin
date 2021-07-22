/*
包含n个间接更新状态数据的方法的对象
*/
import router from '../router'
import api from '../api'
export default {
  // 返回
  FALLBACK() {
    router.go(-1)
  },
  EXCHANGE_TOKEN(context) {
    let getQueryString = name => {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }

    const SD_ACCESS_TOKEN = localStorage.getItem('SD_ACCESS_TOKEN')
    const token = getQueryString('token') || SD_ACCESS_TOKEN

    window.localStorage.setItem('SD_ACCESS_TOKEN', token)

    const para = {
      originalToken: token,
    }
    api.loginByOriginalToken(para).then(res => {
      if (res.code === 200) {
        let Access_Token = 'Bearer ' + res.data.newToken
        window.localStorage.setItem('Case_Access_Token', Access_Token)
        context.commit('SET_CASE_TOKEN', Access_Token)
      }
    })
  },
}
