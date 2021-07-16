import { fetchApi } from '@/utils/ajax'
let supplierListUrl = '/times-ec-tob-mall/admin/supplier/getSupplierListByPager'
let supplierDetailUrl = '/times-ec-tob-mall/admin/supplier/getSupplierDetail/'

// 列表
export const getSupplierListByPager = (data) => {
  return fetchApi(supplierListUrl, data, 'POST')
}
// 详情
export const getSupplierDetail = (data) => {
  return fetchApi(supplierDetailUrl + data.id, {}, 'GET')
}
