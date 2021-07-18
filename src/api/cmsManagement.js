import {fetchApi, fetchSeamApi, fetchCenterApi} from "@/utils/ajax";
import URL from "./urlConfig";

// 与一体化换token
export const loginByOriginalToken = (data) => fetchApi(URL.ADMINOPERATOR.loginByOriginalToken, data, "POST");

//分页查询用户列表
export const getUserList = (data) => fetchApi(URL.ADMINOPERATOR.GETUSERLIST, data, "POST");

export const getUnifyEmployeeInfoByPhone = (data) => fetchApi(URL.ADMINOPERATOR.getUnifyEmployeeInfoByPhone, data, "POST");

/** 账号管理模块 **/
//账号-分页查询角色列表
export const getRoleList = (data) => fetchApi(URL.ADMINOPERATOR.getRoleList, data, "POST");

//更改用户信息
export const updateUserInfo = (data) => fetchApi(URL.ADMINOPERATOR.updateUserInfo, data, "POST");

//查询启用中用户列表
export const getEnableUserList = (data) => fetchApi(URL.ADMINOPERATOR.GETENABLEUSERLIST, data, "POST");
// 更改用户状态
export const updateUserState = (data) => fetchApi(URL.ADMINOPERATOR.updateUserState, data, "POST");

// 同步一体化用户数据-添加
export const syncUserInfo = (data) => fetchApi(URL.ADMINOPERATOR.syncUserInfo, data, "POST");

//查询企业类目树
export const getCompanyTree = data => fetchApi('/times-ec-tob-mall/admin/project/tree', data, 'GET');

//账号管理
export const addAccount = data => fetchApi('/times-ec-tob-mall/admin/account/addAccount', data, 'POST');
export const delAccount = data => fetchApi('/times-ec-tob-mall/admin/account/delAccount', data, 'POST');
export const queryAccountInfo = data => fetchApi('/times-ec-tob-mall/admin/account/queryInfo', data, 'POST');
export const queryAccountList = data => fetchApi('/times-ec-tob-mall/admin/account/queryList', data, 'POST');
export const updateAccount = data => fetchApi('/times-ec-tob-mall/admin/account/updateAccount', data, 'POST');
export const updatePassword = data => fetchApi('/times-ec-tob-mall/admin/account/updatePassword', data, 'POST');

//企业管理
export const addProject = data => fetchApi('/times-ec-tob-mall/admin/project/add', data, 'POST');
export const getProjectDetail = data => fetchApi('/times-ec-tob-mall/admin/project/detail', data, 'GET');
export const getProjectList = data => fetchApi('/times-ec-tob-mall/admin/project/list', data, 'POST');
export const updateProject = data => fetchApi('/times-ec-tob-mall/admin/project/update', data, 'POST');