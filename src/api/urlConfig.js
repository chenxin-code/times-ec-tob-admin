// export let timesServicemall = '/times/servicemall';	//时代服务商城接口
const {
  VUE_APP_BASE_CASE_API
} = process.env
export let timesServicemall = VUE_APP_BASE_CASE_API + "/times-ec-anchang"; //
export let timesServicemallErp = "/times-ec-erp"; //

export let option = {
  login: "/times/auth", // 登录
  logout: "/times/api-demo/logout", //退出
  pub: "/times/pub-center", //数据字典
  user_b: "/times/user-center/b", //B端用户
};

// 请求地址
export default {
  LOGIN: option.login + "/oauth/token", //登录
  LOGOUT: option.logout + "/logout", //退出登录
  SEND_CODE: option.pub + "/verifycode/api/v1/send", //发送验证码
  USER_INFO: option.user_b + "/api/v1/my/info", // 用户个人信息
  PERMISSION: "/times/user-center/permission/api/v2/permissions/get", //获取权限信息
  /** 运营用户管理接口 **/
  ADMINOPERATOR: {
    loginByOriginalToken: timesServicemall + "/admin/auth/loginByOriginalToken", //与一体化换token

    // GETUSERLIST: timesServicemall + "/admin/operator/getUserList", //分页查询用户列表
    // getUnifyEmployeeInfoByPhone:
    // 	timesServicemall + "/admin/operator/getUnifyEmployeeInfoByPhone", //根据手机号查一体化员工信息
    // GETENABLEUSERLIST:
    // 	timesServicemall + "/admin/operator/getEnableUserList", //查询启用中用户列表
    // getRoleList: timesServicemall + "/admin/role/getRoleList", //账号-分页查询角色列表
    // updateUserInfo: timesServicemall + "/admin/operator/updateUserInfo", //更改用户信息
    // updateUserState: timesServicemall + "/admin/operator/updateUserState", //更改用户状态
    // syncUserInfo: timesServicemall + "/admin/operator/syncUserInfo", //同步一体化用户数据
    // // 角色管理
    // getPermissionList: timesServicemall + "/admin/role/getPermissionList", //分页查询权限列表
    // saveRolePermRel: timesServicemall + "/admin/role/saveRolePermRel", //保存角色权限关系
    // getPermListByRole: timesServicemall + "/admin/role/getPermListByRole", //根据角色查询其权限

    // /** 应收应付 **/
    // selectCollectingBill: timesServicemall + "/admin/collectingBill/selectCollectingBill",
    // confirmCollectingBill: timesServicemall + "/admin/collectingBill/confirmCollectingBill/",	//确认
    // collectingBillAdd: timesServicemall + "/admin/collectingBill/add",	//生成应收单
    // selectCollectingBillInfo: timesServicemall + "/admin/collectingBill/selectCollectingBillInfo",	//点击搜索应收详情列表
    // getBillSummary: timesServicemall + "/admin/collectingBill/getBillSummary",	//NC数据拉取
    // exportCollectingBillList: timesServicemall + "/admin/collectingBill/exportCollectingBillList",	//列表导出
    // exportCollectingBillInfoList: timesServicemall + "/admin/collectingBill/exportCollectingBillInfoList",
    // queryRelateCollectingBillList: timesServicemall + "/admin/collectingBill/queryRelateCollectingBillList",
    // queryAddCollectingBillStartDate: timesServicemall + "/admin/collectingBill/queryAddCollectingBillStartDate",

    // //应付
    // payBillGetAll: timesServicemall + "/admin/payBill/getAll",	//列表
    // payBillExportList: timesServicemall + "/admin/payBill/exportList",	//列表
    // payBillInfoExportList: timesServicemall + "/admin/payBill/infoExportList",
    // payBillConfirmPayBill: timesServicemall + "/admin/payBill/confirmPayBill/",	//确认
    // payBillGetInfoByInfo: timesServicemall + "/admin/payBill/getInfoByInfo",	//点击搜索详情列表
    // payBillGetInfoByPayBillNo: timesServicemall + "/admin/payBill/getInfoByPayBillNo/",	//链接跳转搜索
    // addPayBill: timesServicemall + "/admin/payBill/addPayBill",	//生成应付单
    // payBillGetBillSummary: timesServicemall + "/admin/payBill/getBillSummary",	//应付-NC数据拉取
    // queryRelatePayBillList: timesServicemall + "/admin/payBill/queryRelatePayBillList",	//关联
    // getPayBillStartDate: timesServicemall + "/admin/payBill/getPayBillStartDate",

    // /** 交易中心 **/
    // supplierList: timesServicemall + "/admin/supplier/list",
    // orderTradelLst: timesServicemall + "/admin/order/v1/trade/list", //
    // getOrderTradeInfo: timesServicemall + "/admin/order/v1/trade/info", //交易列表详情
    // singletonCancelOrder:
    // 	timesServicemall + "/admin/order/v2/singletonCancel/order", //取消订单

    // //采购单管理
    // purchaseSplit: timesServicemall + '/admin/order/split', // 下单，案场采购单拆分供应商订单接口
    // purchaseList: timesServicemall + "/admin/purchase/page", //采购单查询
    // purchaseNo: timesServicemall + "/admin/purchase/getByPurchaseNo", //采购单明细查询
    // changeVerifySign: timesServicemall + "/admin/purchase/changeVerifySign", //更改采购单商品校验状态

    // //请款单
    // CashList: timesServicemall + "/admin/CashRequirement/queryList", // 请款列表查询接口
    // CashExport: timesServicemall + "/admin/CashRequirement/exportList", // 请款列表Excel导出
    // CashOccupancy:
    // 	timesServicemall + "/admin/CashRequirement/budgetOccupancy", // EBS预算占用
    // // 发票
    // InvoiceList: timesServicemall + '/admin/invoice/queryInvoiceList',		// 发票列表查询接口
    // InvoiceDetail: timesServicemall + '/admin/invoice/queryInvoiceDetail',		// 发票详情查询接口
    // downInvoice: timesServicemall + '/admin/invoice/downInvoice',		// 下载电子发票接口
    // selectNewInvoiceCommodityList: timesServicemall + '/admin/collectingBill/selectNewInvoiceCommodityList',		// 新增发票商品列表查询
    // insertInvoice: timesServicemall + '/admin/invoice/insertInvoice',		// 新增发票接口

    // // 售后
    // aftersaleList: timesServicemall + '/admin/aftersale/queryList',		// 案场：售后申请列表查询接口
    // aftersaleAudit: timesServicemall + '/admin/aftersale/audit',		// 案场：售后申请审核接口
  },
  // ORDER_LIST: {
  // 	GET_ORDER_LIST: timesServicemall + "/admin/order/queryList",
  // 	GET_ORDER_INFO: timesServicemall + "/admin/order/queryInfo",
  // 	CANCEL_ORDER: timesServicemall + "/admin/order/cancel",
  // 	DELIVERY_APPROVE: timesServicemall + "/admin/delivery/approve",
  // },
  // ORDER_AFTERSALE_LIST: {
  // 	GET_ORDER_AFTERSALE_LIST: timesServicemall + "/admin/aftersale/queryList",
  // 	CANCEL_APPROVE: timesServicemall + "/admin/aftersale/cancelApprove",
  // 	GET_ORDER_ITEMS_LIST: timesServicemall + "/admin/aftersale/getOrderItems",
  // 	AFTER_SALE_APPROVE:timesServicemall + "/admin/aftersale/approve",
  // },
};
