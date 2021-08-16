"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuUpdateState = exports.getMenuDelete = exports.getMenuModel = exports.getMenuUpdata = exports.getMenuSave = exports.getMenuTreeDataByUserId = exports.getMenuTreeList = exports.getMenuTreeData = void 0;

var _ajax = require("@/utils/ajax");

var VUE_APP_BASE_ERP_API = process.env.VUE_APP_BASE_ERP_API;
var URL_PREFIX = '/times-ec-tob-mall/admin/menu';
var getPermListByLoginUrl = '/times-ec-tob-mall/admin/role/getPermListByLogin'; // 获取菜单

/**
 * 【管理端】加载所有菜单列表树(用于菜单列表)
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 */

var getMenuTreeData = function getMenuTreeData(params) {
  return (0, _ajax.fetchApi)("".concat(URL_PREFIX, "/getMenuTreeData"), params, 'GET');
};
/**
 * 【管理端】加载所有菜单列表树(用于菜单列表)
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.menuName		菜单名称	string
 */


exports.getMenuTreeData = getMenuTreeData;

var getMenuTreeList = function getMenuTreeList(params) {
  return (0, _ajax.fetchApi)("".concat(URL_PREFIX, "/menuTreeData"), params, 'POST');
};
/**
 * 【管理端】根据用户ID查询权限
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.menuName		菜单名称	string
 */


exports.getMenuTreeList = getMenuTreeList;

var getMenuTreeDataByUserId = function getMenuTreeDataByUserId(params) {
  return (0, _ajax.fetchApi)("".concat(URL_PREFIX, "/selectPermsByUserId"), params, 'POST');
};
/**
 * 菜单新增/编辑
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {boolean} params.checked		boolean
 * @param {array} params.children[]		array	菜单信息
 * @param {string} params.createTime		string(date-time)	string(date-time)
 * @param {number} params.createUser		integer(int64)	integer(int64)
 * @param {string} params.icon	菜单图标	string
 * @param {number} params.id		integer(int64)	integer(int64)
 * @param {number} params.isDeleted		integer(int32)	integer(int32)
 * @param {string} params.menuName	菜单名称	string
 * @param {number} params.menuType	菜单类型（1菜单 2按钮）	integer(int32)	integer(int32)
 * @param {number} params.orderNum	显示顺序	integer(int32)	integer(int32)
 * @param {number} params.parentId	父菜单ID	integer(int64)	integer(int64)
 * @param {string} params.parentName	父菜单名称	string
 * @param {string} params.perms	权限标识	string
 * @param {string} params.target	打开方式（menuItem页签 menuBlank新窗口）	string
 * @param {string} params.updateTime		string(date-time)	string(date-time)
 * @param {number} params.updateUser		integer(int64)	integer(int64)
 * @param {string} params.url	请求地址	string
 * @param {number} params.visible	菜单状态（0显示 1隐藏）	integer(int32)	integer(int32)
 */


exports.getMenuTreeDataByUserId = getMenuTreeDataByUserId;

var getMenuSave = function getMenuSave(data) {
  return (0, _ajax.fetchApi)("".concat(URL_PREFIX, "/save"), data, 'POST');
};

exports.getMenuSave = getMenuSave;

var getMenuUpdata = function getMenuUpdata(data) {
  return (0, _ajax.fetchApi)("".concat(URL_PREFIX, "/update"), data, 'POST');
};
/**
 * 菜单详情
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {number} params.id		number	 	query
 */


exports.getMenuUpdata = getMenuUpdata;

var getMenuModel = function getMenuModel(params) {
  return (0, _ajax.fetchApi)("".concat(URL_PREFIX, "/getModel/").concat(params.id), {}, 'POST');
};
/**
 * 删除菜单
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {number} params.id		number	 	query
 */


exports.getMenuModel = getMenuModel;

var getMenuDelete = function getMenuDelete(params) {
  return (0, _ajax.fetchApi)("".concat(URL_PREFIX, "/delete/").concat(params.id), {}, 'POST');
};
/**
 * 菜单启用/停用
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {number} params.id		number	 	query
 */


exports.getMenuDelete = getMenuDelete;

var getMenuUpdateState = function getMenuUpdateState(params) {
  return (0, _ajax.fetchApi)("".concat(URL_PREFIX, "/updateState/").concat(params.id), {}, 'POST');
};

exports.getMenuUpdateState = getMenuUpdateState;