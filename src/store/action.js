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
    const SD_ACCESS_TOKEN = localStorage.getItem('SD_ACCESS_TOKEN')
    let getQueryString = name => {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }

    window.localStorage.setItem(
      'SD_ACCESS_TOKEN',
      getQueryString('token') || SD_ACCESS_TOKEN
    )

    const para = {
      originalToken: getQueryString('token') || SD_ACCESS_TOKEN,
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
