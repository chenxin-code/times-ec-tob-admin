import { fetchApi } from '@/utils/ajax'
let supplierListUrl = '/times-ec-tob-mall/admin/supplier/getSupplierListByPager'
let supplierDetailUrl = '/times-ec-tob-mall/admin/supplier/getSupplierDetail/'

// 列表
export const getSupplierListByPager = (data) => {
  return fetchApi(supplierListUrl, data, 'POST')
}
export const getSupplierListByPager2 = (data) => {
  return fetchApi('/times-ec-tob-mall/admin/baseSupplier/getList', data, 'POST')
}
// 详情
export const getSupplierDetail = (data) => {
  return fetchApi(supplierDetailUrl + data.id, {}, 'GET')
}

// 分页查询商品列表数据集
export const getProductListByPager =(data)=>fetchApi('/times-ec-tob-mall/admin/product/getProductListByPager', data, 'POST')
// 分页查询商品列表数据集
export const updateProduct =(data)=>fetchApi('/times-ec-tob-mall/admin/product/updateProduct', data, 'POST')
// 根据主键id获取商品详情
export const getProductDetail =(data)=>fetchApi(`/times-ec-tob-mall/admin/product/getProductDetail/${data}`, {}, 'GET')
// 根据主键id获取商品详情
// export const getSupplierListByPager =(data)=>fetchApi('/times-ec-tob-mall/admin/supplier/getSupplierListByPager', data, 'POST')
