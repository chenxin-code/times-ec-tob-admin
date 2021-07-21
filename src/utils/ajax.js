import Vue from 'vue'
import modal from 'ant-design-vue/es/modal'
import axios from 'axios'
import NProgress from 'nprogress'
import JSONbig from 'json-bigint'
import message from 'ant-design-vue/es/message'
import * as api from '@/api/login'
import QS from 'qs'
import store from '../store'

// 一体化线上域名-返回登陆
const baseCmsWebsite =
  process.env.VUE_APP_BASE_CMS_WEBSITE ||
  'http://m-center-uat-linli.timesgroup.cn'
let BASEURL = ''
let CENTERBASEURL = ''

console.log(
  'VUE_APP_BASE_API--->',
  process.env.VUE_APP_BASE_API,
  process.env.VUE_APP_BASE_CMS_WEBSITE
)

const VUE_APP_BASE_API = process.env.VUE_APP_BASE_API
BASEURL = VUE_APP_BASE_API
CENTERBASEURL = VUE_APP_BASE_API
console.log('BASEURL:' + BASEURL)

const JSONBigString = JSONbig({ storeAsString: true })
export const HTTP = axios.create({
  // baseURL: BASEURL,
  baseURL: CENTERBASEURL,
  withCredentials: true,
  timeout: 50000,
  headers: {
    // post: {
    //   'Content-Type': 'application/json'
    // }
  },
  transformResponse: [
    function(data) {
      return JSONBigString.parse(data)
    },
  ],
})

// export const ACTION_BASEURL = BASEURL;
export const ACTION_BASEURL = CENTERBASEURL
//请求拦截
HTTP.interceptors.request.use(async config => {
  NProgress.start()
  if (
    config.url.indexOf('/times/auth/oauth/token') >= 0 ||
    config.url.indexOf('/verifycode/api/v1/send') >= 0
  ) {
    let tokenStr = ''
    config.headers.Authorization = tokenStr
    return config
  } else {
    if (config.url.indexOf('/times/pub-center/qr-code/api/v1/qr/insert') >= 0) {
      config.headers.program_code = 'app_notice'
    }
    let tokenStr = 'Bearer ' + localStorage.getItem('SD_ACCESS_TOKEN')
    config.headers.Authorization = tokenStr
    return config
  }
})

function handleParams(url, rawData, rawMethod, responseType) {
  const method = rawMethod.toUpperCase()
  let data = {}
  if (method === 'GET') {
    data = { params: rawData }
  }
  switch (method) {
    case 'GET':
      data = { params: rawData }
      break
    case 'POST':
    case 'PUT':
    case 'PATCH':
    case 'DELETE':
      data = { data: rawData }
      break
    default:
      data = { params: rawData }
      break
  }

  return Promise.resolve({
    url,
    method,
    data,
    responseType,
  })
}

async function handleFail(option) {
  console.log(option)
  const { error, reject } = option
  const { response } = error
  if (response) {
    switch (response.status) {
      case 400:
        message.error('请求失败')
        break
      case 401:
        break
      case 403:
        break
      case 404:
        message.error('请求失败')
        break
      case 500:
        message.error('请求失败')
        break
      default:
        message.error('请求失败')
        break
    }
  } else {
    var originalRequest = error.config
    if (
      error.code == 'ECONNABORTED' &&
      error.message.indexOf('timeout') != -1 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      message.error('请求超时')
    }
  }
  reject(error)
}

let defaultHeader = {
  timezoneoffset: Math.abs(new Date().getTimezoneOffset() / 60),
  locale: 'zh_CN',
  get: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  access_channel: 'mgmt',
}

let refresh = false
async function refreshToken() {
  refresh = true
  const para = QS.stringify({
    grant_type: 'refresh_token',
    client_id: 'web_b',
    client_secret: 'times',
    username: window.localStorage.getItem('SD_LOGIN_NAME'),
    password: '',
    scope: 'all',
    refresh_token: window.localStorage.getItem('SD_ACCESS_REFRESHTOKEN'),
  })
  api
    .toLogin(para)
    .then(res => {
      if (res.code === 200) {
        window.localStorage.setItem('SD_ACCESS_TOKEN', res.data.token)
        window.localStorage.setItem(
          'SD_ACCESS_REFRESHTOKEN',
          res.data.refreshToken
        )
        location.reload()
      }
    })
    .finally(() => {})
}

// 返回一体化
async function returnBaseCms(res) {
  message.error('登陆已过期，需要重新登陆')
  setTimeout(function() {
    window.location.href = baseCmsWebsite
  }, 2000)
}

export const fetchApi = (
  api,
  rawData = {},
  method = 'GET',
  headers = {},
  responseType = 'json',
  url = CENTERBASEURL,
  ifplaceholder = false
) => {
  let Access_Token = store.state.Case_Access_Token
  return handleParams(api, rawData, method, headers, responseType).then(
    options => {
      return new Promise((resolve, reject) => {
        if (responseType == 'blob') {
          let tokenStr = 'Bearer ' + localStorage.getItem('SD_ACCESS_TOKEN')
          axios({
            url: options.url,
            method: options.method,
            headers: {
              Access_Token: Access_Token,
              ...defaultHeader,
              'Content-Type': 'application/json',
            },
            data: { ...options.data },
            responseType: 'blob', // 设置服务器响应的数据类型（必选）
          }).then(resp => {
            const res = resp.data
            console.log(resp)
            // 下载正常处理
            let fileName = resp.headers['content-disposition']
            console.log(fileName)
            // 获取文件名
            if (fileName && fileName.length >= 2) {
              fileName = fileName.split('=')[1]
            }
            fileName = decodeURI(escape(fileName))
            console.log(fileName)
            // 兼容ie11
            if (window.navigator.msSaveOrOpenBlob) {
              try {
                window.navigator.msSaveOrOpenBlob(new Blob([res]), fileName)
              } catch (e) {
                console.log(e)
              }
              return
            }
            // a标签实现下载
            let url = window.URL.createObjectURL(new Blob([res]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.download = fileName
            document.body.appendChild(link)
            link.click()
          })
        } else {
          HTTP({
            baseURL: url,
            withCredentials: true,
            url: options.url,
            method: options.method,
            headers: {
              Access_Token: Access_Token,
              ...defaultHeader,
              ...headers,
            },
            ...options.data,
          }).then(
            resp => {
              NProgress.done()
              const res = resp.data
              if (res.code === 0) {
                resolve(res)
              } else {
                // 未登录或token过期统一响应码是401
                if (res.code === 401) {
                  console.log('401')
                  if (refresh) {
                    returnBaseCms(res) //返回一体化登陆
                    resolve(res)
                  } else {
                    returnBaseCms(res) //返回一体化登陆
                    resolve(res)
                    // refreshToken();
                  }
                } else if (res.code !== 200) {
                  message.error(res.message)
                  resolve(res)
                } else {
                  resolve(res)
                }
              }
            },
            error => {
              NProgress.done()
              handleFail({
                error,
                reject,
                options,
              })

              throw error
            }
          )
        }
      })
    }
  )
}

export const fetchSeamApi = (
  api,
  rawData = {},
  method = 'GET',
  headers = {},
  responseType = 'json',
  // url = BASEURL
  url = CENTERBASEURL
) => {
  return handleParams(api, rawData, method, headers, responseType).then(
    options => {
      return new Promise((resolve, reject) => {
        if (responseType == 'blob') {
          let tokenStr = 'Bearer ' + localStorage.getItem('SD_ACCESS_TOKEN')
          axios({
            url: options.url,
            method: options.method,
            headers: {
              Access_Token: Access_Token,
              // Authorization:tokenStr,	//
              ...defaultHeader,
              'Content-Type': 'application/json',
            },
            data: { ...options.data },
            responseType: 'blob', // 设置服务器响应的数据类型（必选）
          }).then(resp => {
            const res = resp.data
            console.log(resp)
            // 下载正常处理
            let fileName = resp.headers['content-disposition']
            console.log(fileName)
            // 获取文件名
            if (fileName && fileName.length >= 2) {
              fileName = fileName.split('=')[1]
            }
            fileName = decodeURI(escape(fileName))
            console.log(fileName)
            // 兼容ie11
            if (window.navigator.msSaveOrOpenBlob) {
              try {
                window.navigator.msSaveOrOpenBlob(new Blob([res]), fileName)
              } catch (e) {
                console.log(e)
              }
              return
            }
            // a标签实现下载
            let url = window.URL.createObjectURL(new Blob([res]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.download = fileName
            document.body.appendChild(link)
            link.click()
          })
        } else {
          HTTP({
            baseURL: 'http://m-center-uat-linli.timesgroup.cn',
            withCredentials: true,
            url: options.url,
            method: options.method,
            headers: {
              Access_Token: Access_Token,
              ...defaultHeader,
              ...headers,
            },
            ...options.data,
          }).then(
            resp => {
              NProgress.done()
              const res = resp.data
              if (res.code === 0) {
                resolve(res)
              } else {
                // 未登录或token过期统一响应码是401
                if (res.code === 401) {
                  console.log('401')
                  if (refresh) {
                    returnBaseCms(res) //返回一体化登陆
                    resolve(res)
                  } else {
                    returnBaseCms(res) //返回一体化登陆
                    resolve(res)
                    // refreshToken();
                  }
                } else if (res.code !== 200) {
                  message.error(res.message)
                  resolve(res)
                } else {
                  resolve(res)
                }
              }
            },
            error => {
              NProgress.done()
              handleFail({
                error,
                reject,
                options,
              })

              throw error
            }
          )
        }
      })
    }
  )
}

export default {
  downLoad(url, data) {
    return axios({
      method: 'get',
      url,
      params: data,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('SD_ACCESS_TOKEN'),
      },
      responseType: 'blob',
    })
  },
  downLoadForPost(url, data) {
    return axios({
      method: 'post',
      url,
      data: data,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('SD_ACCESS_TOKEN'),
      },
      responseType: 'blob',
    })
  },
}
