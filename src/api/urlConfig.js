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
    upload:  '/times-ec-tob-mall/admin/oss/file/upload',
  },
}
