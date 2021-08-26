/*
包含n个间接更新状态数据的方法的对象
*/
import router, { asyncRouter } from '../router'
import api from '../api'
import { returnBaseCms } from '../utils/util'

const flatten = function (arr, keys){ //扁平化数组对象
  if(!keys) return []
  return arr.reduce((result, item)=> {
    return result.concat(item,(Array.isArray(item[keys]) ? flatten(item[keys], keys) : []));
  }, []);
}

const getFilterRouter = (menu) =>{
  const flattenRouter = flatten(menu, 'children')
  flattenRouter.map(i => { // 过滤菜单按钮权限的格式，数组直接返回按钮类型[perms]
    i.buttonChildren = i.buttonChildren?.filter(a => a.possessOrNot = 1).map(b => b.perms)
    return i
  })
  asyncRouter.map(a =>{ // 匹配对应路由插进按钮权限属性{buttons}
    a.meta.buttons = flattenRouter.filter(b => b.url === a.path)[0]?.buttonChildren ?? []
    return a
  })
  return Promise.resolve(asyncRouter)
}

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
    await api.loginByOriginalToken(para).then(async res => {
      if (res.code === 200) {
        let Access_Token = 'Bearer ' + res.data.newToken
        window.localStorage.setItem('Case_Access_Token', Access_Token)
        // window.localStorage.setItem('SmAuthorization', Access_Token)
        context.commit('SET_CASE_TOKEN', Access_Token)
        context.commit('SET_CASE_HEADERS', Access_Token)
        await context.dispatch('GET_MENU_LIST')
      } else {
        returnBaseCms()
      }
    })
    return Promise.resolve()
  },
  //获取菜单的目录
  async GET_MENU_LIST(context) {
    try {
      let res = await api.getMenuTreeData() // 调用菜单接口获取菜单
      const filterRouter = await getFilterRouter(res.data) // 过滤菜单数组
      const currentRoutes = router.options.routes; // 获取需要添加的路由
      currentRoutes[0].children = [...currentRoutes[0].children,...filterRouter] // 给路由动态插入子路由
      router.addRoutes(currentRoutes) // 添加上路由
      const menus = res.data || []
      context.commit('SET_MENUS_LIST', menus)
    } catch (error) {}
    return Promise.resolve()
  },
}
