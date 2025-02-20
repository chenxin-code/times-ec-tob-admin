import { fetchApi } from '@/utils/ajax'
const URL_PREFIX = '/times-ec-tob-mall/admin/operator'

//角色管理
/**
 * 【管理端】分页查询账号列表
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.name		姓名	string
 * @param {string} params.phone		手机号码	string
 * @param {string} params.pageNum		    页码	string
 * @param {string} params.pageSize		    每页记录数	string
 */
export const getAccountListData = params => fetchApi(`${URL_PREFIX}/getListByPager`, params, 'POST')
/**
 * 【管理端】新增账号-查询手机号获取与员工信息
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.phone		手机号码	string
 */
 export const setAddAccountByPhone = params => fetchApi(`${URL_PREFIX}/getUnifyEmployeeInfoByPhone`, params, 'POST')
/**
 * 【管理端】新增用户
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.accountName		姓名	string
 * @param {string} params.accountPhone		手机号码	string
 */
 export const setAddAccountSave = params => fetchApi(`${URL_PREFIX}/save`, params, 'POST')

 /**
 * 【管理端】删除账号
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.roleId		角色ID	string
 * @param {string} params.userId		用户ID	string
 */
  export const setdelAccount = params => fetchApi(`${URL_PREFIX}/delete`, params, 'POST')
 /**
 * 【管理端】用户关联角色
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.roleId		角色ID	string
 * @param {string} params.userId		用户ID	string
 */
  export const setAssociateRole = params => fetchApi(`${URL_PREFIX}/associateRole`, params, 'POST')
 /**
 * 【管理端】变更用户停用启用状态
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.id		用户ID	string
 */
  export const setAccountUpdateStatus = params => fetchApi(`${URL_PREFIX}/updateStatus`, params, 'GET')

/**
 * 【管理端】批量保存用户和公司角色信息
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.roleIds		用户ID	string
 * @param {string} params.userId		用户ID	string
 */
 export const batchAssociateRole = params => fetchApi(`${URL_PREFIX}/batchAssociateRole`, params, 'POST')

 /**
 * 【管理端】分配用戶批量保存用户信息
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.companyName		公司id	string
 * @param {string} params.departId		    部门id	string
 * @param {string} params.departName		部门名称	string
 * @param {string} params.id		        用户ID	string
 * @param {string} params.name		    用户姓名	string
 * @param {string} params.phone		    部手机号	string
 * @param {string} params.roleId		角色ID	string
 * @param {string} params.userName		用户名（昵称）	string
 */
  export const batchSaveList = params => fetchApi(`${URL_PREFIX}/batchInsertUser`, params, 'POST')