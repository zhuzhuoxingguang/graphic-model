import request from '@/utils/request'
import { USERS_LIST, DO_LOGIN } from './APIPATH'

// 用户登录
export const doLogin = (userName, password, remember) => {
  return request.post(DO_LOGIN, { userName, password, type: "account" })
}

// 用户管理 用户列表
export const getUsers = () => {
  return request.post(USERS_LIST)
}
