import { fetchApi, fetchSeamApi, fetchCenterApi } from "@/utils/ajax";
import URL from "./urlConfig";

// 与一体化换token
export const loginByOriginalToken = (data) =>
  fetchApi(URL.ADMINOPERATOR.loginByOriginalToken, data, "POST");

//分页查询用户列表
export const getUserList = (data) =>
  fetchApi(URL.ADMINOPERATOR.GETUSERLIST, data, "POST");

export const getUnifyEmployeeInfoByPhone = (data) =>
  fetchApi(URL.ADMINOPERATOR.getUnifyEmployeeInfoByPhone, data, "POST");

/** 账号管理模块 **/
//账号-分页查询角色列表
export const getRoleList = (data) =>
  fetchApi(URL.ADMINOPERATOR.getRoleList, data, "POST");

//更改用户信息
export const updateUserInfo = (data) =>
  fetchApi(URL.ADMINOPERATOR.updateUserInfo, data, "POST");

//查询启用中用户列表
export const getEnableUserList = (data) =>
  fetchApi(URL.ADMINOPERATOR.GETENABLEUSERLIST, data, "POST");
// 更改用户状态
export const updateUserState = (data) =>
  fetchApi(URL.ADMINOPERATOR.updateUserState, data, "POST");

// 同步一体化用户数据-添加
export const syncUserInfo = (data) =>
  fetchApi(URL.ADMINOPERATOR.syncUserInfo, data, "POST");
