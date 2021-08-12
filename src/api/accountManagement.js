import { fetchApi } from '@/utils/ajax'
const URL_PREFIX = '/times-ec-tob-mall/admin/account'

// 获取账号列表
/**
 * 【管理端】加载所有菜单列表树(用于菜单列表)
 * @param {Object} params 入参 参数名称 参数说明 请求类型 是否必须
 * @param {string} params.accountName		账号	string
 * @param {string} params.enterpriseId		企业id	string
 * @param {string} params.enterpriseName	所属企业	string
 * @param {string} params.pageNum		    页码	string
 * @param {string} params.pageSize		    每页记录数	string
 */
export const getMenuTreeData = params =>
  fetchApi(`${URL_PREFIX}/queryList`, params, 'POST')