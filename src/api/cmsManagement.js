import { fetchApi, fetchSeamApi, fetchCenterApi } from '@/utils/ajax'
import URL from './urlConfig'

// 与一体化换token
export const loginByOriginalToken = data => fetchApi(URL.ADMINOPERATOR.loginByOriginalToken, data, 'POST');

//分页查询用户列表
export const getUserList = data => fetchApi(URL.ADMINOPERATOR.GETUSERLIST, data, 'POST');

export const getUnifyEmployeeInfoByPhone = data => fetchApi(URL.ADMINOPERATOR.getUnifyEmployeeInfoByPhone, data, 'POST');

/** 账号管理模块 **/
//账号-分页查询角色列表
export const getRoleList = data => fetchApi(URL.ADMINOPERATOR.getRoleList, data, 'POST');

//更改用户信息
export const updateUserInfo = (data) => fetchApi(URL.ADMINOPERATOR.updateUserInfo, data, 'POST');

//查询启用中用户列表
export const getEnableUserList = data => fetchApi(URL.ADMINOPERATOR.GETENABLEUSERLIST, data, 'POST');
// 更改用户状态
export const updateUserState = (data) => fetchApi(URL.ADMINOPERATOR.updateUserState, data, 'POST');

// 同步一体化用户数据-添加
export const syncUserInfo = (data) => fetchApi(URL.ADMINOPERATOR.syncUserInfo, data, 'POST');

// 分页查询权限列表
export const getPermissionList = (data) => fetchApi(URL.ADMINOPERATOR.getPermissionList, data, 'POST');
// 根据角色查询其权限
export const getPermListByRole = (data) => fetchApi(URL.ADMINOPERATOR.getPermListByRole, data, 'POST');
// 保存角色权限关系
export const saveRolePermRel = (data) => fetchApi(URL.ADMINOPERATOR.saveRolePermRel, data, 'POST');
/** 应收应付 **/
export const selectCollectingBill = data => fetchApi(URL.ADMINOPERATOR.selectCollectingBill, data, 'POST');
export const confirmCollectingBill = data => fetchApi(URL.ADMINOPERATOR.confirmCollectingBill+data, '', 'POST');
export const collectingBillAdd = data => fetchApi(URL.ADMINOPERATOR.collectingBillAdd, data, 'POST');
export const selectCollectingBillInfo = data => fetchApi(URL.ADMINOPERATOR.selectCollectingBillInfo, data, 'POST');
export const getBillSummary = data => fetchApi(URL.ADMINOPERATOR.getBillSummary, data, 'POST');
export const exportCollectingBillList = data => fetchApi(URL.ADMINOPERATOR.exportCollectingBillList, data, 'POST');
export const exportCollectingBillInfoList = data => fetchApi(URL.ADMINOPERATOR.exportCollectingBillInfoList, data, 'POST');
export const queryRelateCollectingBillList = data => fetchApi(URL.ADMINOPERATOR.queryRelateCollectingBillList, data, 'POST');
export const queryAddCollectingBillStartDate = data => fetchApi(URL.ADMINOPERATOR.queryAddCollectingBillStartDate, data, 'POST');

export const payBillGetAll = data => fetchApi(URL.ADMINOPERATOR.payBillGetAll, data, 'POST');
export const payBillExportList = data => fetchApi(URL.ADMINOPERATOR.payBillExportList, data, 'POST');
export const payBillInfoExportList = data => fetchApi(URL.ADMINOPERATOR.payBillInfoExportList, data, 'POST');
export const payBillConfirmPayBill = data => fetchApi(URL.ADMINOPERATOR.payBillConfirmPayBill+data, '', 'POST');
export const payBillGetInfoByInfo = data => fetchApi(URL.ADMINOPERATOR.payBillGetInfoByInfo, data, 'POST');
export const payBillGetInfoByPayBillNo = data => fetchApi(URL.ADMINOPERATOR.payBillGetInfoByPayBillNo+data, '', 'POST');
export const addPayBill = data => fetchApi(URL.ADMINOPERATOR.addPayBill, data, 'POST');
export const payBillGetBillSummary = data => fetchApi(URL.ADMINOPERATOR.payBillGetBillSummary, data, 'POST');
export const queryRelatePayBillList = data => fetchApi(URL.ADMINOPERATOR.queryRelatePayBillList, data, 'POST');
export const getPayBillStartDate = data => fetchApi(URL.ADMINOPERATOR.getPayBillStartDate, data, 'POST');

/** 交易中心 **/
export const supplierList = data => fetchApi(URL.ADMINOPERATOR.supplierList, data, 'POST');
export const orderTradelLst = data => fetchApi(URL.ADMINOPERATOR.orderTradelLst, data, 'POST');
export const getOrderTradeInfo = data => fetchApi(URL.ADMINOPERATOR.getOrderTradeInfo, data, 'POST');
export const singletonCancelOrder = data => fetchApi(URL.ADMINOPERATOR.singletonCancelOrder, data, 'GET');

// 采购单管理
export const purchaseList = data => fetchApi(URL.ADMINOPERATOR.purchaseList, data, 'POST');
export const purchaseNo = data => fetchApi(URL.ADMINOPERATOR.purchaseNo+'/'+data.purchaseNo, data, 'POST');//采购单明细查询
export const purchaseSplit = data => fetchApi(URL.ADMINOPERATOR.purchaseSplit+'/'+data.purchaseNo, data, 'POST');// 下单


// 请款单
export const CashList = data => fetchApi(URL.ADMINOPERATOR.CashList, data, 'POST');//请款列表查询接口
export const CashExport = data => fetchApi(URL.ADMINOPERATOR.CashExport, data, 'POST');//导出
export const CashOccupancy = data => fetchApi(URL.ADMINOPERATOR.CashOccupancy + '/' + data.cashRequirementNo, data, 'POST');//占用
export const changeVerifySign = data => fetchApi(URL.ADMINOPERATOR.changeVerifySign, data, 'POST');//更改采购单商品校验状态

//账号管理
export const addAccount = data => fetchApi('/times-ec-tob-mall/admin/account/addAccount', data, 'POST');
export const delAccount = data => fetchApi('/times-ec-tob-mall/admin/account/delAccount', data, 'POST');
export const queryAccountInfo = data => fetchApi('/times-ec-tob-mall/admin/account/queryInfo', data, 'POST');
export const queryAccountList = data => fetchApi('/times-ec-tob-mall/admin/account/queryList', data, 'POST');
export const updateAccount = data => fetchApi('/times-ec-tob-mall/admin/account/updateAccount', data, 'POST');
export const updatePassword = data => fetchApi('/times-ec-tob-mall/admin/account/updatePassword', data, 'POST');

// 发票
export const InvoiceList = data => fetchApi(URL.ADMINOPERATOR.InvoiceList, data, 'POST');//发票列表查询接口
export const InvoiceDetail = data => fetchApi(URL.ADMINOPERATOR.InvoiceDetail, data, 'POST');//发票详情查询接口
export const downInvoice = data => fetchApi(URL.ADMINOPERATOR.downInvoice, data, 'POST');//下载电子发票
export const selectNewInvoiceCommodityList = data => fetchApi(URL.ADMINOPERATOR.selectNewInvoiceCommodityList, data, 'POST');//开票清单
export const insertInvoice = data => fetchApi(URL.ADMINOPERATOR.insertInvoice, data, 'POST');//



// 售后
export const aftersaleList = data => fetchApi(URL.ADMINOPERATOR.aftersaleList, data, 'POST');//
export const aftersaleAudit = data => fetchApi(URL.ADMINOPERATOR.aftersaleAudit, data, 'POST');//


// 订单列表
export const getOrderList = data => fetchApi(URL.ORDER_LIST.GET_ORDER_LIST, data, 'POST');
export const getOrderInfo = data => fetchApi(URL.ORDER_LIST.GET_ORDER_INFO, data, 'POST');
export const cancelOrder = (id, data) => fetchApi(URL.ORDER_LIST.CANCEL_ORDER + `/${id}`, data, 'GET');
export const deliveryApprove = data => fetchApi(URL.ORDER_LIST.DELIVERY_APPROVE, data, 'POST');


//售后列表
export const getOrderAfterList = data => fetchApi(URL.ORDER_AFTERSALE_LIST.GET_ORDER_AFTERSALE_LIST, data, 'POST');
export const cancelApprove = data => fetchApi(URL.ORDER_AFTERSALE_LIST.CANCEL_APPROVE, data, 'POST');
export const getOrderItems = (No, data) => fetchApi(URL.ORDER_AFTERSALE_LIST.GET_ORDER_ITEMS_LIST + `/${No}`, data, 'POST');
export const afterSaleApprove = data => fetchApi(URL.ORDER_AFTERSALE_LIST.AFTER_SALE_APPROVE, data, 'POST');



