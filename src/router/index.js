import Vue from "vue";
import Router from "vue-router";
import paramsStorage from "./ParamsStorage.js";
import store from "@/store";

Vue.use(Router);
//登录
const Login = () => import("../pages/login/login");
//获取token
const Token = () => import("../pages/login/index");

const Home = () => import("../components/home");

let router = new Router({
  base: "/",
  routes: [
    {
      path: "/",
      redirect: {
        name: "shelve",
      },
      name: "home",
      menuKey: "home",
      component: Home,
      children: [
        //商品上下架
        {
          path: "/shelve",
          name: "shelve",
          menuKey: "shelve",
          meta: {
            menu: "/shelve",
            authKeys: [""],
            bread: [
              {
                path: "/shelve",
                name: "商品上下架",
              },
            ],
            // keepAlive: true
          },
          component: () => import("../pages/shelve/list"),
        },
        //负数单管理
        {
          path: "/negative",
          name: "negative",
          menuKey: "negative",
          meta: {
            menu: "/negative",
            authKeys: [""],
            bread: [
              {
                path: "/negative",
                name: "负数单管理",
              },
            ],
            // keepAlive: true
          },
          component: () => import("../pages/negative/list"),
        },
        {
          path: "/negative/add",
          name: "negativeAdd",
          menuKey: "negative",
          meta: {
            menu: "/negative",
            authKeys: [""],
            bread: [
              { path: "/negative", name: "负数单管理" },
              { path: "/negative/add", name: "新建负数单" },
            ],
          },
          component: () => import("@/pages/negative/add-show"),
        },
        {
          path: "/negative/show",
          name: "negativeShow",
          menuKey: "negative",
          meta: {
            menu: "/negative",
            authKeys: [""],
            bread: [
              { path: "/negative", name: "负数单管理" },
              { path: "/negative/show", name: "查看负数单" },
            ],
          },
          component: () => import("@/pages/negative/add-show"),
        },
        //企业管理
        {
          path: "/company",
          name: "company",
          menuKey: "company",
          meta: {
            menu: "/company",
            authKeys: [""],
            bread: [
              {
                path: "/company",
                name: "企业管理",
              },
            ],
            // keepAlive: true
          },
          component: () => import("../pages/company/list"),
        },
        {
          path: "/company/add",
          name: "companyAdd",
          menuKey: "company",
          meta: {
            menu: "/company",
            authKeys: [""],
            bread: [
              { path: "/company", name: "企业管理" },
              { path: "/company/add", name: "新建企业" },
            ],
          },
          component: () => import("@/pages/company/add-edit"),
        },
        {
          path: "/company/edit",
          name: "companyEdit",
          menuKey: "company",
          meta: {
            menu: "/company",
            authKeys: [""],
            bread: [
              { path: "/company", name: "企业管理" },
              { path: "/company/edit", name: "编辑企业" },
            ],
          },
          component: () => import("@/pages/company/add-edit"),
        },
        //账号管理
        {
          path: "/account",
          name: "account",
          menuKey: "account",
          meta: {
            menu: "/account",
            authKeys: [""],
            bread: [
              {
                path: "/account",
                name: "账号管理",
              },
            ],
            // keepAlive: true
          },
          component: () => import("../pages/account/list"),
        },
        {
          path: "/account/add",
          name: "accountAdd",
          menuKey: "account",
          meta: {
            menu: "/account",
            authKeys: [""],
            bread: [
              { path: "/account", name: "账号管理" },
              { path: "/account/add", name: "新建账号" },
            ],
          },
          component: () => import("@/pages/account/add-edit"),
        },
        {
          path: "/account/edit",
          name: "accountEdit",
          menuKey: "account",
          meta: {
            menu: "/account",
            authKeys: [""],
            bread: [
              { path: "/account", name: "账号管理" },
              { path: "/account/edit", name: "编辑账号" },
            ],
          },
          component: () => import("@/pages/account/add-edit"),
        },
        {
          path: "/market",
          name: "market",
          menuKey: "market",
          meta: {
            menu: "/market",
            authKeys: [""],
            bread: [
              {
                path: "/market",
                name: "销售单管理",
              },
            ],
            // keepAlive: true
          },
          component: () => import("../pages/distribution/market/index"),
        },
        {
          path: "/market/marketdetail",
          name: "marketdetail",
          menuKey: "marketdetail",
          meta: {
            menu: "/marketdetail",
            authKeys: [""],
            bread: [{ path: "/market/marketdetail", name: "销售单详情" }],
            // keepAlive: true
          },
          component: () => import("../pages/distribution/market/detail"),
        },
        {
          path: "/supplier",
          name: "supplier",
          menuKey: "supplier",
          meta: {
            menu: "/supplier",
            authKeys: [""],
            bread: [
              {
                path: "/supplier",
                name: "供应商",
              },
            ],
            // keepAlive: true
          },
          component: () => import("../pages/distribution/supplier/index"),
        },
        {
          path: "/supplier/supplierdetail",
          name: "supplierdetail",
          menuKey: "supplier",
          meta: {
            menu: "/supplier",
            authKeys: [""],
            bread: [
              { path: "/supplier", name: "供应商" },
              { path: "supplier/supplierdetail", name: "供应商详情" },
            ],
            isUseCache: false,
            keepAlive: false,
          },
          component: () => import("../pages/distribution/supplier/detail"),
        },
        {
          path: "/commodity",
          name: "commodity",
          menuKey: "commodity",
          meta: {
            menu: "/commodity",
            authKeys: [""],
            bread: [
              {
                path: "/commodity",
                name: "商品管理",
              },
            ],
            // keepAlive: true
          },
          component: () => import("../pages/commodity/index"),
        },
        {
          path: "/commodity/edit",
          name: "commodityEdit",
          menuKey: "commodity",
          meta: {
            menu: "/commodity",
            authKeys: [""],
            bread: [
              { path: "/commodity", name: "供应商" },
              { path: "commodity/edit", name: "供应商详情" },
            ],
            isUseCache: false,
            keepAlive: false,
          },
          component: () => import("../pages/commodity/edit"),
        },
      ]
    },
    {
      path: "/404",
      component: () => import("../pages/exception/404"),
    },
    {
      path: "/403",
      component: () => import("../pages/exception/403"),
    },
    {
      path: "/500",
      component: () => import("../pages/exception/500"),
    },
    // {
    // 	path: '*',
    // 	redirect: '/404',
    // }
  ],
  mode: "history",
  // mode: "hash",
});

router.beforeEach((to, from, next) => {
  if (!(to.meta.menu == from.meta.menu) && to.fullPath != "/login") {
    sessionStorage.removeItem("listPageParams");
  }
  paramsStorage.clearPropsStorage(to, from);

  if (to.matched.length === 0) {
    from.name
      ? next({
        ...from,
          name: from.name,
          query:from.query
        })
      : next("/404");
  } else {
    if (
      sessionStorage.getItem("refreshflag") == "1" &&
      sessionStorage.getItem("store")
    ) {
      store.replaceState(
        Object.assign(
          {},
          store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
      sessionStorage.setItem("refreshflag", "0");
    }
    if (Object.keys(to.params).length === 0) {
      // 从store中取出付给params，此处注意路径未必完全吻合，以你的为准
      Object.assign(to.params, store.state.paramMap[to.name] || {});
    }
    // 存储一下params备用
    store.commit("REFRESHPARAM", {
      key: to.name,
      value: to.params,
    });
    next();
  }
});

router.onError((error) => {
  const pattern = /Loading chunk +/g;
  const pattern1 = /Unexpected token /g;
  // const isChunkLoadFailed = error.message.match(pattern) ||  error.message.match(pattern1) ;
  if (error.message.match(pattern) || error.message.match(pattern1)) {
    window.location.reload();
    // router.replace(router.history.pending.fullPath);
  } else {
    console.log(error);
  }
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
