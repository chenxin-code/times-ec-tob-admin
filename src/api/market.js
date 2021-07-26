import { fetchApi } from '@/utils/ajax'
let marketOrderListUrl = '/times-ec-tob-mall/admin/saleOrder/queryList/order'
let marketDetailUrl = '/times-ec-tob-mall/admin/saleOrder/query/order/'
let marketCompanyListUrl = '/times-ec-tob-mall/admin/project/city/company/list'
let marketUpdateCityCompanyUrl = '/times-ec-tob-mall/admin/saleOrder/update/cityCompany'
let marketDeliveryOrderListUrl = '/times-ec-tob-mall/admin/delivery/order/list/'
let marketDeliveryOrderConfirmUrl = '/times-ec-tob-mall/admin/delivery/order/confirm'
let marketQueryInfoUrl = '/times-ec-tob-mall/admin/delivery/order/queryInfo/'

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
