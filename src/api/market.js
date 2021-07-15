import { fetchApi } from "@/utils/ajax";
let marketOrderListUrl = "/times-ec-tob-mall/admin/saleOrder/queryList/order";
let marketDetailUrl = "/times-ec-tob-mall/admin/saleOrder/query/order/";
let marketCompanyListUrl = "/times-ec-tob-mall/admin/project/city/company/list";
let marketUpdateCityCompanyUrl = '/admin/saleOrder/update/cityCompany'

// 列表
export const getMarketOrderList = (data) => {
  return fetchApi(marketOrderListUrl, data, "POST");
};
// 详情
export const getMarketDetail = (data) => {
  return fetchApi(marketDetailUrl + data.saleOrderNo, {}, "GET");
};
// 城市公司
export const getMarketCompanyList = () => {
  return fetchApi(marketCompanyListUrl, {}, "GET");
  
};
// 修改城市公司
export const marketUpdateCityCompany = (data) => {
  return fetchApi(marketUpdateCityCompanyUrl, data, "POST");
};
