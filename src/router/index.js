import Vue from 'vue'
import Router from 'vue-router'
import paramsStorage from './ParamsStorage.js'
import store from '@/store'
import { importAll } from '../utils/util'
Vue.use(Router)
//登录
const Login = () => import('../pages/login/login')
//获取token
const Token = () => import('../pages/login/index')

const Home = () => import('../components/home')

let children = importAll(
  require.context(
    './module',
    true,
    // 匹配基础文件名的正则表达式
    /\.js$/
  )
)

let router = new Router({
  base: '/',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home',
      },
      name: 'home',
      menuKey: 'home',
      component: Home,
      children: [...children],
    },
    {
      path: '/404',
      component: () => import('../pages/exception/404'),
    },
    {
      path: '/403',
      component: () => import('../pages/exception/403'),
    },
    {
      path: '/500',
      component: () => import('../pages/exception/500'),
    },
    // {
    // 	path: '*',
    // 	redirect: '/404',
    // }
  ],
  mode: 'history',
  // mode: "hash",
})

router.beforeEach((to, from, next) => {
  if (!(to.meta.menu == from.meta.menu) && to.fullPath != '/login') {
    sessionStorage.removeItem('listPageParams')
  }
  paramsStorage.clearPropsStorage(to, from)

  if (to.matched.length === 0) {
    from.name
      ? next({
          ...from,
          name: from.name,
          query: from.query,
        })
      : next('/404')
  } else {
    if (
      sessionStorage.getItem('refreshflag') == '1' &&
      sessionStorage.getItem('store')
    ) {
      store.replaceState(
        Object.assign(
          {},
          store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
      sessionStorage.setItem('refreshflag', '0')
    }
    if (Object.keys(to.params).length === 0) {
      // 从store中取出付给params，此处注意路径未必完全吻合，以你的为准
      Object.assign(to.params, store.state.paramMap[to.name] || {})
    }
    // 存储一下params备用
    store.commit('REFRESHPARAM', {
      key: to.name,
      value: to.params,
    })
    next()
  }
})

router.onError(error => {
  const pattern = /Loading chunk +/g
  const pattern1 = /Unexpected token /g
  // const isChunkLoadFailed = error.message.match(pattern) ||  error.message.match(pattern1) ;
  if (error.message.match(pattern) || error.message.match(pattern1)) {
    window.location.reload()
    // router.replace(router.history.pending.fullPath);
  } else {
    console.log(error)
  }
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
