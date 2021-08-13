import { fetchApi } from '@/utils/ajax'
const URL_PREFIX = '/times-ec-tob-mall/admin/role'

//角色管理
/**
 * 【管理端】分页查询账号列表
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.name		姓名	string
 * @param {string} params.phone		手机号码	string
 * @param {string} params.pageNum		    页码	string
 * @param {string} params.pageSize		    每页记录数	string
 */
export const getRoleListData = params => fetchApi(`${URL_PREFIX}/getRoleList`, params, 'POST')
/**
 * 【管理端】修改角色信息
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.id		    角色ID	string
 * @param {string} params.roleName		角色名称	string
 * @param {string} params.roleCode		角色编码	string
 */
 export const setRoleUpate = params => fetchApi(`${URL_PREFIX}/update`, params, 'POST')

 /**
 * 【管理端】删除角色
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.id		    角色ID	string
 */
  export const setRoleDelete = params => fetchApi(`${URL_PREFIX}/delete`, params, 'POST')
/**
 * 【管理端】保存角色信息
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.id		    角色ID	string
 * @param {string} params.roleCode		角色编码	string
 * @param {string} params.roleCode		角色名称	string
 */
export const setRoleSave = params => fetchApi(`${URL_PREFIX}/save`, params, 'POST')

/**
 * 【管理端】根据用户ID获取没有关联到的角色列表
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.userId		 用户ID	string
 */
export const selectNoAssociateRolesByUserId = params => fetchApi(`${URL_PREFIX}/selectNoAssociateRolesByUserId`, params, 'GET')
