const { VUE_APP_BASE_CASE_API } = process.env
export let timesServicemall = VUE_APP_BASE_CASE_API + '/times-ec-anchang' //
export let timesServicemallErp = '/times-ec-erp' //

export let option = {
  login: '/times/auth', // 登录
  logout: '/times/api-demo/logout', //退出
  pub: '/times/pub-center', //数据字典
  user_b: '/times/user-center/b', //B端用户
}

// 请求地址
export default {
  LOGIN: option.login + '/oauth/token', //登录
  LOGOUT: option.logout + '/logout', //退出登录
  SEND_CODE: option.pub + '/verifycode/api/v1/send', //发送验证码
  USER_INFO: option.user_b + '/api/v1/my/info', // 用户个人信息
  PERMISSION: '/times/user-center/permission/api/v2/permissions/get', //获取权限信息
  /** 运营用户管理接口 **/
  ADMINOPERATOR: {
    loginByOriginalToken: '/times-ec-tob-mall/admin/auth/loginByOriginalToken', //与一体化换token
    // GETUSERLIST: timesServicemall + "/admin/operator/getUserList", //分页查询用户列表
    // getUnifyEmployeeInfoByPhone:
    // 	timesServicemall + "/admin/operator/getUnifyEmployeeInfoByPhone", //根据手机号查一体化员工信息
    // GETENABLEUSERLIST:
    // 	timesServicemall + "/admin/operator/getEnableUserList", //查询启用中用户列表
    // getRoleList: timesServicemall + "/admin/role/getRoleList", //账号-分页查询角色列表
    // updateUserInfo: timesServicemall + "/admin/operator/updateUserInfo", //更改用户信息
    // updateUserState: timesServicemall + "/admin/operator/updateUserState", //更改用户状态
    // syncUserInfo: timesServicemall + "/admin/operator/syncUserInfo", //同步一体化用户数据
  },
}
