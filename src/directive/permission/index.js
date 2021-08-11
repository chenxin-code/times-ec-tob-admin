/*
 * @Author: your name
 * @Date: 2021-08-10 14:03:29
 * @LastEditTime: 2021-08-10 14:09:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \times-ec-tob-admin\src\directive\permission\index.js
 */
import permission from './permission'

const install = function(Vue) {
    Vue.directive('permission', permission)
}

if (window.Vue) {
    window['permission'] = permission
    Vue.use(install); // eslint-disable-line
}

permission.install = install
export default permission
