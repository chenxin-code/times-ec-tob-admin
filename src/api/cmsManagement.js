import {fetchApi, fetchSeamApi, fetchCenterApi} from "@/utils/ajax";
import URL from "./urlConfig";

// 与一体化换token
export const loginByOriginalToken = (data) => fetchApi(URL.ADMINOPERATOR.loginByOriginalToken, data, "POST");

//查询企业类目树
export const getCompanyTree = data => fetchApi('/times-ec-tob-mall/admin/project/tree/list', data, 'GET');

//账号管理
export const addAccount = data => fetchApi('/times-ec-tob-mall/admin/account/addAccount', data, 'POST');
export const delAccount = data => fetchApi('/times-ec-tob-mall/admin/account/delAccount/' + data.loginName, {}, 'POST');
export const queryAccountInfo = data => fetchApi('/times-ec-tob-mall/admin/account/queryInfo/' + data.loginName, {}, 'POST');
export const queryAccountList = data => fetchApi('/times-ec-tob-mall/admin/account/queryList', data, 'POST');
export const updateAccount = data => fetchApi('/times-ec-tob-mall/admin/account/updateAccount', data, 'POST');
export const updatePassword = data => fetchApi('/times-ec-tob-mall/admin/account/updatePassword', data, 'POST');

//企业管理
export const addProject = data => fetchApi('/times-ec-tob-mall/admin/project/add', data, 'POST');
export const getProjectDetail = data => fetchApi('/times-ec-tob-mall/admin/project/detail/' + data.id, {}, 'GET');
export const getProjectList = data => fetchApi('/times-ec-tob-mall/admin/project/list', data, 'POST');
export const updateProject = data => fetchApi('/times-ec-tob-mall/admin/project/update', data, 'POST');

//负数单管理
export const addNegativeBill = data => fetchApi('/times-ec-tob-mall/admin/negative/addNegativeBill', data, 'POST');
export const delNegativeBill = data => fetchApi('/times-ec-tob-mall/admin/negative/delNegativeBill/' + data.negativeNo, {}, 'POST');
export const getNegativeItems = data => fetchApi('/times-ec-tob-mall/admin/negative/getItems/' + data.orderNo, {}, 'POST');
export const queryNegativeDetail = data => fetchApi('/times-ec-tob-mall/admin/negative/queryDetail/' + data.negativeNo, {}, 'GET');
export const queryNegativeList = data => fetchApi('/times-ec-tob-mall/admin/negative/queryList', data, 'POST');
export const updateNegative = data => fetchApi('/times-ec-tob-mall/admin/negative/updateNegative', data, 'POST');

//省 市 区 街道
export const getAreaData = data => fetchApi('/times-ec-tob-mall/general/area/list', data, 'GET');
export const getAreaChildData = data => fetchApi('/times-ec-tob-mall/general/area/list/child/' + data.parentCode, {}, 'GET');

//商品上下架列表
export const getProductListByPager = data => fetchApi('/times-ec-tob-mall/admin/product/getProductListByPager', data, 'POST');
//上下架操作
export const updateSelling = data => fetchApi('/times-ec-tob-mall/admin/product/updateSelling', data, 'POST');
export const updateSellingById = data => fetchApi('/times-ec-tob-mall/admin/product/updateSellingById/' + data.id, {}, 'GET');

//商品品类管理
export const getCategoryTree = data => fetchApi('/times-ec-tob-mall/admin/product/getCategoryTree', data, 'GET');