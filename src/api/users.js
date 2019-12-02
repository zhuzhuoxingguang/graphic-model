import request from '@/utils/request'
import { USERS_LIST } from './APIPATH'

// 用户登录
export const doLogin = (account, password, remember) => {
  return request('/user/login', { account, password, remember })
}

// 用户管理 用户列表
export const getUsers = () => {
  return request(USERS_LIST)
}
