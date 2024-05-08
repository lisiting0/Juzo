import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { param as encodeParam } from '@/utils'
import { setToken, removeToken, setRefreshToken, removeRefreshToken } from '@/utils/auth'

const ExpiresTimeKey = 'Admin-Expires-Time'
const LoginTimeKey = 'Admin-Login-Time'
// 是否正在刷新的标记
let isRefreshing = false
/* 被挂起的请求数组 */
let refreshSubscribers = []

/* push所有请求到数组中 */
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}

/* 刷新请求（refreshSubscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据） */
function onRrefreshed(token) {
  refreshSubscribers.map(cb => cb(token))
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (config.api) {
      switch (config.api) {
        case 'auth':
          config.baseURL = process.env.VUE_APP_AUTH_API
          break
        case 'default':
          config.baseURL = process.env.VUE_APP_DEFAULT_API
          break
        case 'foundation':
          config.baseURL = process.env.VUE_APP_FOUNDATION_API
          break
        case 'order':
          config.baseURL = process.env.VUE_APP_ORDER_API
          break
        case 'finance':
          config.baseURL = process.env.VUE_APP_FINANCE_API
          break
        case 'payment':
          config.baseURL = process.env.VUE_APP_PAYMENT_API
          break
        case 'ibeplus':
          config.baseURL = process.env.VUE_APP_IBEPLUS_API
          break
        case 'group':
          config.baseURL = process.env.VUE_APP_GROUPBOOKING_API
          break
      }
    }
    // do something before request is sent
    config.headers['accept-language'] = store.getters.language

    if (store.getters.token) {
      config.headers['authorization'] = 'Bearer ' + store.getters.token

      // 在过期时间前的10分钟，单位为毫秒
      const timeBeforeExpiration = 10 * 60 * 1000
      // 登录时间1704866862000，单位为毫秒
      const loginTime = localStorage.getItem(LoginTimeKey)
      // 过期时间戳1704866865600，单位为秒
      const expireTimestamp = localStorage.getItem(ExpiresTimeKey)
      // 登录时间戳
      const loginTimestamp = new Date(loginTime).getTime()
      // console.log(`登录时间戳${loginTimestamp}，token过期时间戳${expireTimestamp}`)
      // 登录过期时间戳
      const expirationTimestamp = parseInt(loginTimestamp) + parseInt(expireTimestamp * 1000)
      // console.log('过期时间戳' + expirationTimestamp)
      // 登录时间失效前10分钟的时间戳
      const timestampTenMinutesBeforeExpiration = expirationTimestamp - timeBeforeExpiration
      // console.log('登录时间失效前10分钟的时间戳' + timestampTenMinutesBeforeExpiration)
      // console.log(Math.floor(Date.now()))
      if (loginTime !== null && loginTime !== 0 && timestampTenMinutesBeforeExpiration <= Math.floor(Date.now()) && store.state.user.refreshToken) {
        // 是否在刷新
        if (!isRefreshing) {
          isRefreshing = true
          // 刷新token
          const params = {
            grant_type: 'refresh_token',
            refresh_token: store.state.user.refreshToken,
            client_id: 'App'
          }
          const refreshTokenPromise = store.dispatch('user/refreshToken', params).then(res => {
            isRefreshing = false
            if (res) {
              store.commit('user/SET_TOKEN', res.access_token)
              store.commit('user/SET_REFRESH_TOKEN', res.refresh_token)
              setRefreshToken(res.refresh_token)
              setToken(res.access_token).then(() => {
                localStorage.setItem(ExpiresTimeKey, parseInt(res.expires_in))
                localStorage.setItem(LoginTimeKey, new Date())
              })
              onRrefreshed(store.getters.token)
              refreshSubscribers.forEach(cb => cb(store.getters.token))
              refreshSubscribers = []
            }
          }).catch((error) => {
            console.error(error) // 打印错误信息
            isRefreshing = false
            refreshSubscribers.forEach(cb => cb(null))
            refreshSubscribers = []
            removeRefreshToken()
            removeToken().then(() => {
              localStorage.removeItem(ExpiresTimeKey)
              localStorage.removeItem(LoginTimeKey)
            })
            // throw error // 抛出错误
          })
          const retry = new Promise((resolve, reject) => {
            /* (token) => {...}定义回调函数，用于更新token并将请求挂起 */
            subscribeTokenRefresh((token) => {
              config.headers['authorization'] = 'Bearer ' + token
              /* 将请求挂起*/
              resolve(config)
            })
          })
          return Promise.race([refreshTokenPromise, retry])
        }
      }
    }

    if (store.getters.users) {
      config.headers['organization-id'] = store.getters.users.organizationId
    }
    config.paramsSerializer = function(params) {
      return encodeParam(params)
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (parseInt(res.status) > 400) {
      Message({
        message: res.message ? res.message : response.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return res
  },
  error => {
    console.log(error) // for debug

    if (error.response.status === 401) {
      // to re-login
      MessageBox.confirm(
        '登录已过期，您可以取消登录以留在本页面，或重新登录',
        '退出登录',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }

    let message = ''
    if (error.response && error.response.data && error.response.data.error) {
      if (error.response.data.error.message) {
        message = error.response.data.error.message
      } else if (error.response.data.error_description) {
        message = error.response.data.error_description
      } else if (error.response.data.error.details) {
        message += error.response.data.error.details
      }
    } else {
      message = error.message
    }

    if (message !== 'The specified refresh token is no longer valid.') {
      Message({
        message: message,
        type: 'error',
        duration: 5 * 1000
      })
    }

    return Promise.reject(error)
  }
)

export default service
