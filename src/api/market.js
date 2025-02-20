import { fetchApi } from '@/utils/ajax'
let marketOrderListUrl = '/times-ec-tob-mall/admin/saleOrder/queryList/order'
let marketDetailUrl = '/times-ec-tob-mall/admin/saleOrder/query/order/'
let marketCompanyListUrl = '/times-ec-tob-mall/admin/project/city/company/list'
let marketUpdateCityCompanyUrl = '/times-ec-tob-mall/admin/saleOrder/update/cityCompany'
let marketDeliveryOrderListUrl = '/times-ec-tob-mall/admin/delivery/order/list/'
let marketDeliveryOrderConfirmUrl = '/times-ec-tob-mall/admin/delivery/order/confirm'
let marketQueryInfoUrl = '/times-ec-tob-mall/admin/delivery/order/queryInfo/'

const URL_PREFIX = '/times-ec-tob-mall/admin/purchase'

// 列表
export const getMarketOrderList = (data) => {
  return fetchApi(marketOrderListUrl, data, 'POST')
}
// 详情
export const getMarketDetail = (data) => {
  return fetchApi(marketDetailUrl + data.saleOrderNo, {}, 'GET')
}
// 城市公司
export const getMarketCompanyList = () => {
  return fetchApi(marketCompanyListUrl, {}, 'GET')
}
// 修改城市公司
export const marketUpdateCityCompany = (data) => {
  return fetchApi(marketUpdateCityCompanyUrl, data, 'POST')
}
// 配送单列表
export const marketDeliveryOrderList = (data) => {
  return fetchApi(marketDeliveryOrderListUrl + data.saleOrderNo, {}, 'GET')
}
// 签收
export const marketDeliveryOrderConfirm = (data) => {
  return fetchApi(marketDeliveryOrderConfirmUrl, data, 'POST')
}
// 查看
export const marketQueryInfo = (data) => {
  return fetchApi(marketQueryInfoUrl + data.deliveryNo, {}, 'GET')
}
//确认订单
/**
 *采购单：确认或者取消采购单申请
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.confirmFlag		    确认订单标志，1确认，2取消 	
 * @param {string} params.thirdPurchaseId		第三方采购单唯一标志	
 */
export const marketOrderConfirmApply = params => fetchApi(`${URL_PREFIX}/confirm/apply`, params, 'POST')
