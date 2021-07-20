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

// // 应收单管理
// const CollectionList = () =>
//   import("../pages/distribution/collectionList/index");
// const CollectionInfo = () =>
//   import("../pages/distribution/collectionInfo/index");

// const PaymentList = () => import("../pages/distribution/paymentList/index");
// const PaymentInfo = () => import("../pages/distribution/paymentInfo/index");

// // 账号管理、账号角色
// const AccountList = () => import("../pages/distribution/accountList/index");
// const AccountRole = () => import("../pages/distribution/accountRole/index");

// // 请款单
// const cashRequirement = () =>
//   import("../pages/distribution/cashRequirement/index");
// // 发票管理
// const invoice = () => import("../pages/distribution/invoice/index");
// // 新增发票
// const addInvoice = () => import("../pages/distribution/invoice/addInvoice");
// const MarketList = () => import("../pages/distribution/marketList/index");
// const MarketInfo = () => import("../pages/distribution/marketInfo/index");

// const OrderManagement = () => import("../pages/orderList/index");
// const OrderDetails = () => import("../pages/orderList/orderDetails");
// const OrderAfterSaleList = () => import("../pages/orderAfterSaleList/index");

// // 案场采购-售后申请
// const afterSale = () => import("../pages/distribution/afterSale");

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
        // {
        //   path: "/accountList",
        //   name: "accountList",
        //   menuKey: "accountList",
        //   meta: {
        //     menu: "/accountList",
        //     authKeys: [""],
        //     bread: [
        //       {
        //         path: "/accountList",
        //         name: "账号列表",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: AccountList,
        // },

        // {
        //   path: "/accountRole",
        //   name: "accountRole",
        //   menuKey: "accountRole",
        //   meta: {
        //     menu: "/accountRole",
        //     authKeys: [""],
        //     bread: [{ path: "/accountRole", name: "账号角色" }],
        //     // keepAlive: true
        //   },
        //   component: AccountRole,
        // },
        // // 应收单管理
        // {
        //   path: "/collectionList",
        //   name: "collectionList",
        //   menuKey: "collectionList",
        //   meta: {
        //     menu: "/collectionList",
        //     authKeys: [""],
        //     bread: [
        //       {
        //         path: "/collectionList",
        //         name: "应收单管理",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: CollectionList,
        // },
        // // 应收单详情
        // {
        //   path: "/collectionList/collectionInfo",
        //   name: "collectionInfo",
        //   menuKey: "collectionList",
        //   meta: {
        //     menu: "/collectionList",
        //     authKeys: [""],
        //     bread: [
        //       {
        //         path: "/collectionList/collectionInfo",
        //         name: "应收单详情",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: CollectionInfo,
        // },
        // // 应付单管理
        // {
        //   path: "/paymentList",
        //   name: "paymentList",
        //   menuKey: "paymentList",
        //   meta: {
        //     menu: "/paymentList",
        //     authKeys: [""],
        //     bread: [
        //       {
        //         path: "/paymentList",
        //         name: "应付单管理",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: PaymentList,
        // },
        // // 应付单详情
        // {
        //   path: "/paymentList/paymentInfo",
        //   name: "paymentInfo",
        //   menuKey: "paymentList",
        //   meta: {
        //     menu: "/paymentList",
        //     authKeys: [""],
        //     bread: [
        //       {
        //         path: "/paymentList/paymentInfo",
        //         name: "应付单详情",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: PaymentInfo,
        // },
        // // 采购单管理
        // {
        //   path: "/marketList",
        //   name: "marketList",
        //   menuKey: "marketList",
        //   meta: {
        //     menu: "/marketList",
        //     authKeys: [""],
        //     bread: [
        //       {
        //         path: "/marketList",
        //         name: "采购单管理",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: MarketList,
        // },

        // // 采购单详情
        // {
        //   path: "/marketList/marketInfo",
        //   name: "marketInfo",
        //   menuKey: "marketList",
        //   meta: {
        //     menu: "/marketList",
        //     authKeys: [""],
        //     bread: [
        //       {
        //         path: "/marketList/marketInfo",
        //         name: "采购单详情",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: MarketInfo,
        // },
        // {
        //   path: "/orderManagement",
        //   name: "orderManagement",
        //   menuKey: "orderManagement",
        //   meta: {
        //     menu: "/orderManagement",
        //     authKeys: [""],
        //     bread: [
        //       {
        //         path: "/orderManagement",
        //         name: "订单管理",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: OrderManagement,
        // },
        // {
        //   path: "/orderManagement/orderDetails",
        //   name: "OrderDetails",
        //   menuKey: "orderManagement",
        //   meta: {
        //     menu: "/orderManagement",
        //     authKeys: [""],
        //     bread: [
        //       {
        //         path: "/orderManagement/orderDetails",
        //         name: "订单详情",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: OrderDetails,
        // },
        // {
        //   path: "/orderAfterSaleList",
        //   name: "orderAfterSaleList",
        //   menuKey: "orderAfterSaleList",
        //   meta: {
        //     menu: "/orderAfterSaleList",
        //     authKeys: [""],
        //     bread: [
        //       {
        //         path: "/orderAfterSaleList",
        //         name: "售后列表",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: OrderAfterSaleList,
        // },
        // {
        //   path: "/supplier",
        //   name: "supplier",
        //   menuKey: "supplier",
        //   meta: {
        //     menu: "/supplier",
        //     authKeys: [""],
        //     bread: [
        //       {
        //         path: "/supplier",
        //         name: "供应商",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: () => import("../pages/distribution/supplier/index"),
        // },
        // {
        //   path: "/supplier/supplierdetail",
        //   name: "detail",
        //   menuKey: "supplier",
        //   meta: {
        //     menu: "/supplier",
        //     authKeys: [""],
        //     bread: [
        //       { path: "/supplier", name: "供应商" },
        //       { path: "supplier/supplierdetail", name: "供应商详情" },
        //     ],
        //     isUseCache: false,
        //     keepAlive: false,
        //   },
        //   component: () => import("../pages/distribution/supplier/detail"),
        // },
        // {
        //   path: "/market/marketdetail",
        //   name: "marketdetail",
        //   menuKey: "marketdetail",
        //   meta: {
        //     menu: "/marketdetail",
        //     authKeys: [""],
        //     bread: [{ path: "/market/marketdetail", name: "销售单详情" }],
        //     // keepAlive: true
        //   },
        //   component: () => import("../pages/distribution/market/detail"),
        // },
        // {
        //   path: "/market",
        //   name: "market",
        //   menuKey: "market",
        //   meta: {
        //     menu: "/market",
        //     authKeys: [""],
        //     bread: [
        //       {
        //         path: "/market",
        //         name: "销售单管理",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: () => import("../pages/distribution/market/index"),
        // },
        // {
        //   path: "/market/marketDetail",
        //   name: "marketDetail",
        //   menuKey: "market",
        //   meta: {
        //     menu: "/market",
        //     authKeys: [""],
        //     bread: [
        //       { path: "/market", name: "供应商" },
        //       { path: "market/marketDetail", name: "供应商详情" },
        //     ],
        //     isUseCache: false,
        //     keepAlive: false,
        //   },
        //   component: () => import("../pages/distribution/market/detail"),
        // },
        // {
        //   // 请款单
        //   path: "/cashRequirement",
        //   name: "cashRequirement",
        //   menuKey: "cashRequirement",
        //   meta: {
        //     menu: "/cashRequirement",
        //     // authKeys: [""],
        //     bread: [
        //       {
        //         path: "/cashRequirement",
        //         name: "请款单列表",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: cashRequirement,
        // },
        // {
        //   // 发票管理
        //   path: "/invoice",
        //   name: "invoice",
        //   menuKey: "invoice",
        //   meta: {
        //     menu: "/invoice",
        //     // authKeys: [""],
        //     bread: [
        //       {
        //         path: "/invoice",
        //         name: "发票管理列表",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: invoice,
        // },
        // {
        //   // 新增发票
        //   path: "/invoice/addInvoice",
        //   name: "addInvoice",
        //   menuKey: "invoice",
        //   meta: {
        //     menu: "/invoice",
        //     // authKeys: [""],
        //     bread: [
        //       {
        //         path: "/invoice/addInvoice",
        //         name: "新增发票",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: addInvoice,
        // },
        // {
        //   // 案场采购-售后申请
        //   path: "/afterSale",
        //   name: "afterSale",
        //   menuKey: "afterSale",
        //   meta: {
        //     menu: "/afterSale",
        //     // authKeys: [""],
        //     bread: [
        //       {
        //         path: "/afterSale",
        //         name: "案场采购-售后申请",
        //       },
        //     ],
        //     // keepAlive: true
        //   },
        //   component: afterSale,
        // },

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
        }
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
