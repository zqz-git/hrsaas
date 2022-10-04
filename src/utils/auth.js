// auth（认证、授权、激活）
import Cookies from 'js-cookie'

const TokenKey = 'hrsaas_ihrm_token' // 设定一个独一无二的key
const timeKey = 'hrsaas_ihrm_timestamp_key' // 设定一个独一无二的key，注册时间戳

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 获取时间戳
export function setTimestamp() {
  return Cookies.get(timeKey)
}
// 设置时间戳
export function getTimestamp() {
  return Cookies.set(timeKey, Date.now())
}
