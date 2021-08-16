"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertRoleMenu = exports.getCategoryTree = exports.updateSellingById = exports.updateSelling = exports.getProductListByPager = exports.getAreaChildData = exports.getAreaData = exports.getOrderListByOrderNo = exports.updateNegative = exports.queryNegativeList = exports.queryNegativeDetail = exports.getNegativeItems = exports.delNegativeBill = exports.addNegativeBill = exports.updateProject = exports.getProjectList = exports.getProjectDetail = exports.addProject = exports.updatePassword = exports.updateAccount = exports.queryAccountList = exports.queryAccountInfo = exports.delAccount = exports.addAccount = exports.getCompanyTree = exports.loginByOriginalToken = void 0;

var _ajax = require("@/utils/ajax");

var _urlConfig = _interopRequireDefault(require("./urlConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 与一体化换token
var loginByOriginalToken = function loginByOriginalToken(data) {
  return (0, _ajax.fetchApi)(_urlConfig["default"].ADMINOPERATOR.loginByOriginalToken, data, "POST");
}; //查询企业类目树


exports.loginByOriginalToken = loginByOriginalToken;

var getCompanyTree = function getCompanyTree(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/project/tree/list', data, 'GET');
}; //账号管理


exports.getCompanyTree = getCompanyTree;

var addAccount = function addAccount(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/account/addAccount', data, 'POST');
};

exports.addAccount = addAccount;

var delAccount = function delAccount(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/account/delAccount/' + data.loginName, {}, 'POST');
};

exports.delAccount = delAccount;

var queryAccountInfo = function queryAccountInfo(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/account/queryInfo/' + data.loginName, {}, 'POST');
};

exports.queryAccountInfo = queryAccountInfo;

var queryAccountList = function queryAccountList(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/account/queryList', data, 'POST');
};

exports.queryAccountList = queryAccountList;

var updateAccount = function updateAccount(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/account/updateAccount', data, 'POST');
};

exports.updateAccount = updateAccount;

var updatePassword = function updatePassword(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/account/updatePassword', data, 'POST');
}; //企业管理


exports.updatePassword = updatePassword;

var addProject = function addProject(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/project/add', data, 'POST');
};

exports.addProject = addProject;

var getProjectDetail = function getProjectDetail(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/project/detail/' + data.id, {}, 'GET');
};

exports.getProjectDetail = getProjectDetail;

var getProjectList = function getProjectList(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/project/list', data, 'POST');
};

exports.getProjectList = getProjectList;

var updateProject = function updateProject(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/project/update', data, 'POST');
}; //负数单管理


exports.updateProject = updateProject;

var addNegativeBill = function addNegativeBill(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/negative/addNegativeBill', data, 'POST');
};

exports.addNegativeBill = addNegativeBill;

var delNegativeBill = function delNegativeBill(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/negative/delNegativeBill/' + data.negativeNo, {}, 'POST');
};

exports.delNegativeBill = delNegativeBill;

var getNegativeItems = function getNegativeItems(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/negative/getItems/' + data.orderNo, {}, 'POST');
};

exports.getNegativeItems = getNegativeItems;

var queryNegativeDetail = function queryNegativeDetail(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/negative/queryDetail/' + data.negativeNo, {}, 'GET');
};

exports.queryNegativeDetail = queryNegativeDetail;

var queryNegativeList = function queryNegativeList(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/negative/queryList', data, 'POST');
};

exports.queryNegativeList = queryNegativeList;

var updateNegative = function updateNegative(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/negative/updateNegative', data, 'POST');
};

exports.updateNegative = updateNegative;

var getOrderListByOrderNo = function getOrderListByOrderNo(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/negative/getOrderListByOrderNo/' + data.orderNo, {}, 'POST');
}; //省 市 区 街道


exports.getOrderListByOrderNo = getOrderListByOrderNo;

var getAreaData = function getAreaData(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/general/area/list', data, 'GET');
};

exports.getAreaData = getAreaData;

var getAreaChildData = function getAreaChildData(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/general/area/list/child/' + data.parentCode, {}, 'GET');
}; //商品上下架列表


exports.getAreaChildData = getAreaChildData;

var getProductListByPager = function getProductListByPager(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/product/getProductListByPager', data, 'POST');
}; //上下架操作


exports.getProductListByPager = getProductListByPager;

var updateSelling = function updateSelling(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/product/updateSelling', data, 'POST');
};

exports.updateSelling = updateSelling;

var updateSellingById = function updateSellingById(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/product/updateSellingById/' + data, {}, 'GET');
}; //商品品类管理


exports.updateSellingById = updateSellingById;

var getCategoryTree = function getCategoryTree(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/product/getCategoryTree', data, 'GET');
}; //新增角色菜单信息


exports.getCategoryTree = getCategoryTree;

var insertRoleMenu = function insertRoleMenu(data) {
  return (0, _ajax.fetchApi)('/times-ec-tob-mall/admin/role/insertRoleMenu', data, 'POST');
};

exports.insertRoleMenu = insertRoleMenu;