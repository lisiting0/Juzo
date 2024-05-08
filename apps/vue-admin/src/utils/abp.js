import store from '@/store'
import router, { resetRouter } from '@/router'

export const httpCode = [
  {
    label: 200,
    value: 200
  },
  {
    label: 401,
    value: 401
  },
  {
    label: 403,
    value: 403
  },
  {
    label: 500,
    value: 500
  }
]

const baseListQuery = {
  page: 1,
  limit: 10,
  sort: ''
}

export function transformAbpListQuery(query) {
  const abpListQuery = {
    maxResultCount: query.limit,
    skipCount: (query.page - 1) * query.limit,
    sorting: query.sort,
    ...query
  }

  delete abpListQuery.page
  delete abpListQuery.limit
  delete abpListQuery.sort

  return abpListQuery
}

export function transformListQuery(query) {
  const listQuery = {
    current: query.page,
    size: query.limit,
    ...query
  }

  delete listQuery.page
  delete listQuery.limit
  delete listQuery.sort

  return listQuery
}

function shouldFetchAppConfig(providerKey, providerName) {
  const currentUser = store.getters.abpConfig.currentUser

  if (providerName === 'R') {
    return currentUser.roles.some(role => role === providerKey)
  }

  if (providerName === 'U') return currentUser.id === providerKey

  return false
}

export function fetchAppConfig(providerKey, providerName) {
  if (shouldFetchAppConfig(providerKey, providerName)) {
    store.dispatch('app/applicationConfiguration').then(abpConfig => {
      resetRouter()

      store.dispatch('user/setRoles', abpConfig.currentUser.roles)

      const grantedPolicies = abpConfig.auth.grantedPolicies

      // generate accessible routes map based on grantedPolicies
      store
        .dispatch('permission/generateRoutes', grantedPolicies)
        .then(accessRoutes => {
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
        })

      // reset visited views and cached views
      // store.dispatch("tagsView/delAllViews", null, { root: true });
    })
  }
}

export function checkPermission(policy) {
  const abpConfig = store.getters.abpConfig
  if (abpConfig.auth.grantedPolicies[policy]) {
    return true
  } else {
    return false
  }
}

export function getFilePathByName(name) {
  const reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/

  if (reg.test(name)) {
    return name
  }

  return process.env.VUE_APP_BASE_API + '/api/file-management/files/' + name
}

export function downloadExcel(data, fileName) {
  // 下载类型 xls
  const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
  // 以动态创建a标签进行下载
  const a = document.createElement('a')
  a.href = url
  a.download = fileName + '.xlsx'
  a.click()
  window.URL.revokeObjectURL(url)
}

export default baseListQuery
