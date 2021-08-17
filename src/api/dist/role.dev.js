"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssociateRolesByUserId = exports.getNoAssociateRolesByUserId = exports.setRoleSave = exports.setRoleDelete = exports.setRoleUpate = exports.getRoleListData = void 0;

var _ajax = require("@/utils/ajax");

var URL_PREFIX = '/times-ec-tob-mall/admin/role'; //角色管理

/**
 * 【管理端】分页查询账号列表
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.name		姓名	string
 * @param {string} params.phone		手机号码	string
 * @param {string} params.pageNum		    页码	string
 * @param {string} params.pageSize		    每页记录数	string
 */

var getRoleListData = function getRoleListData(params) {
  return (0, _ajax.fetchApi)("".concat(URL_PREFIX, "/getListByPager"), params, 'POST');
};
/**
 * 【管理端】修改角色信息
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.id		    角色ID	string
 * @param {string} params.roleName		角色名称	string
 * @param {string} params.roleCode		角色编码	string
 */


exports.getRoleListData = getRoleListData;

var setRoleUpate = function setRoleUpate(params) {
  return (0, _ajax.fetchApi)("".concat(URL_PREFIX, "/update"), params, 'POST');
};
/**
* 【管理端】删除角色
* @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
* @param {string} params.id		    角色ID	string
*/


exports.setRoleUpate = setRoleUpate;

var setRoleDelete = function setRoleDelete(params) {
  return (0, _ajax.fetchApi)("".concat(URL_PREFIX, "/delete"), params, 'POST');
};
/**
 * 【管理端】保存角色信息
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.id		    角色ID	string
 * @param {string} params.roleCode		角色编码	string
 * @param {string} params.roleCode		角色名称	string
 * @param {string} params.originalId		原始ID	string
 * @param {string} params.originalEmpId		原始员工ID	string
 * 
 */


exports.setRoleDelete = setRoleDelete;

var setRoleSave = function setRoleSave(params) {
  return (0, _ajax.fetchApi)("".concat(URL_PREFIX, "/save"), params, 'POST');
};
/**
 * 【管理端】根据用户ID获取没有关联到的角色列表
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.userId		 用户ID	string
 */


exports.setRoleSave = setRoleSave;

var getNoAssociateRolesByUserId = function getNoAssociateRolesByUserId(params) {
  return (0, _ajax.fetchApi)("".concat(URL_PREFIX, "/selectNoAssociateRolesByUserId"), params, 'GET');
};
/**
 * 【管理端】根据用户ID获取角色列表
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.userId		 用户ID	string
 */


exports.getNoAssociateRolesByUserId = getNoAssociateRolesByUserId;

var getAssociateRolesByUserId = function getAssociateRolesByUserId(params) {
  return (0, _ajax.fetchApi)("".concat(URL_PREFIX, "/selectRolesByUserId"), params, 'GET');
};

exports.getAssociateRolesByUserId = getAssociateRolesByUserId;