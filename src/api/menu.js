import { fetchApi } from '@/utils/ajax'

const { VUE_APP_BASE_ERP_API } = process.env
const URL_PREFIX = '/times-ec-tob-mall/admin/menu'
let getPermListByLoginUrl = '/times-ec-tob-mall/admin/role/getPermListByLogin'

// 获取菜单
/**
 * 【管理端】加载所有菜单列表树(用于菜单列表)
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.menuName		菜单名称	string
 */
export const getMenuTreeData = params =>
  fetchApi(`${URL_PREFIX}/menuTreeData`, params, 'POST')

/**
 * 【管理端】根据用户ID查询权限
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.menuName		菜单名称	string
 */
export const getMenuTreeDataByUserId = params =>
fetchApi(`${URL_PREFIX}/selectPermsByUserId`, params, 'POST')

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
export const getMenuSave = data => fetchApi(`${URL_PREFIX}/save`, data, 'POST')
export const getMenuUpdata = data =>
  fetchApi(`${URL_PREFIX}/update`, data, 'POST')

/**
 * 菜单详情
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {number} params.id		number	 	query
 */
export const getMenuModel = params =>
  fetchApi(`${URL_PREFIX}/getModel`, params, 'GET')

/**
 * 删除菜单
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {number} params.id		number	 	query
 */
export const getMenuDelete = params =>
  fetchApi(`${URL_PREFIX}/delete`, params, 'GET')

/**
 * 菜单启用/停用
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {number} params.id		number	 	query
 */
export const getMenuUpdateState = params =>
  fetchApi(`${URL_PREFIX}/updateState`, params, 'GET')
