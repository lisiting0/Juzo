import Cookies from 'js-cookie'
import store from '@/store'

const TokenKey = 'Admin-Token'
const RefreshTokenKey = 'Admin-Refresh-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export async function setToken(token) {
  const result = Cookies.set(TokenKey, token)
  await store.dispatch('app/applicationConfiguration')
  return result
}

export async function removeToken() {
  const result = Cookies.remove(TokenKey)
  await store.dispatch('app/applicationConfiguration')
  return result
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export async function setRefreshToken(refreshToken) {
  return Cookies.set(RefreshTokenKey, refreshToken)
}

export async function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey)
}
