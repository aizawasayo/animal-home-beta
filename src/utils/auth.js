import Cookies from 'js-cookie'
import store from '@/store'

const TokenKey = 'animal_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get('userId')
}

export function setUserId(userId) {
  return Cookies.set('userId', userId)
}

export function removeUserId() {
  return Cookies.remove('userId')
}

export async function validIslogged() {
  let isLogged = false
  if (getToken()) {
    // 本地是否有 token
    try {
      // 验证 token 是否还在有效期
      await store.dispatch('user/getInfo')
      isLogged = true
    } catch (err) {
      isLogged = false
      store.dispatch('user/resetToken')
    }
  }
  return isLogged
}
