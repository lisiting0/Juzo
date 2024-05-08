import { login, logout, getInfo, setUserInfo, refreshToken } from '@/api/user'
import { getToken, setToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const clientSetting = {
  grant_type: 'password',
  redirectUri: process.env.VUE_APP_BASE_API,
  responseType: 'code',
  scope: 'offline_access admin ibeplus business_log group_booking flight_pricing notification product eterm openapi juzo_booking juzo_finance juzo_flight_change juzo_foundation juzo_open_api juzo_order juzo_payment',
  // scope: 'offline_access admin ibeplus business_log booking flight_pricing notification product eterm openapi juzo_booking juzo_finance juzo_flight_change juzo_foundation juzo_open_api juzo_order juzo_payment',
  username: 'admin',
  password: '1q2w3E*',
  client_id: 'App',
  client_secret: ''
}

const ExpiresTimeKey = 'Admin-Expires-Time'
const LoginTimeKey = 'Admin-Login-Time'

const state = {
  token: getToken(),
  refreshToken: getRefreshToken(),
  name: '',
  userName: '',
  avatar: '',
  email: '',
  introduction: '',
  phoneNumber: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_REFRESH_TOKEN: (state, refreshToken) => {
    state.refreshToken = refreshToken
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
  },
  SET_TEL: (state, phoneNumber) => {
    state.phoneNumber = phoneNumber
  },
  SET_AVATAR: (state, avatar) => {
    if (!avatar) avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  CLEAN: state => {
    state.token = ''
    state.refreshToken = ''
    state.name = ''
    state.userName = ''
    state.avatar = ''
    state.email = ''
    state.introduction = ''
    state.phoneNumber = ''
    state.roles = []
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      clientSetting.username = username.trim()
      clientSetting.password = password
      login(clientSetting)
        .then(response => {
          setToken(response.access_token).then(() => {
            setRefreshToken(response.refresh_token)
            commit('SET_TOKEN', response.access_token)
            commit('SET_REFRESH_TOKEN', response.refresh_token)
            localStorage.setItem(ExpiresTimeKey, parseInt(response.expires_in))
            localStorage.setItem(LoginTimeKey, new Date())
            resolve()
          })
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          if (!response) {
            reject('Verification failed, please Login again.')
          }
          const { userName, name, phoneNumber, email, extraProperties } = response

          commit('SET_NAME', name)
          commit('SET_USERNAME', userName)
          commit('SET_TEL', phoneNumber)
          commit('SET_AVATAR', extraProperties.Avatar)
          commit('SET_EMAIL', email)
          commit('SET_INTRODUCTION', extraProperties.Introduction)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  setRoles({ commit }, roles) {
    commit('SET_ROLES', roles)
  },

  setUserInfo({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      setUserInfo(userInfo)
        .then(response => {
          const { userName, name, phoneNumber, email, extraProperties } = userInfo
          commit('SET_NAME', name)
          commit('SET_USERNAME', userName)
          commit('SET_TEL', phoneNumber)
          commit('SET_AVATAR', extraProperties.Avatar)
          commit('SET_EMAIL', email)
          commit('SET_INTRODUCTION', extraProperties.Introduction)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('CLEAN')
          removeRefreshToken()
          removeToken().then(() => {
            localStorage.removeItem(ExpiresTimeKey)
            localStorage.removeItem(LoginTimeKey)
            resetRouter()
            // reset visited views and cached views
            // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
            dispatch('tagsView/delAllViews', null, { root: true })

            resolve()
          })
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('CLEAN')
      removeToken().then(() => {
        removeRefreshToken()
        localStorage.removeItem(ExpiresTimeKey)
        localStorage.removeItem(LoginTimeKey)
        resolve()
      })
    })
  },

  refreshToken({ commit }, data) {
    return new Promise((resolve, reject) => {
      refreshToken(data)
        .then(response => {
          setToken(response.access_token).then(() => {
            commit('SET_TOKEN', response.access_token)
            commit('SET_REFRESH_TOKEN', response.refresh_token)
            setRefreshToken(response.refresh_token)
            localStorage.setItem(ExpiresTimeKey, parseInt(response.expires_in))
            localStorage.setItem(LoginTimeKey, new Date())
            resolve()
          })
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
