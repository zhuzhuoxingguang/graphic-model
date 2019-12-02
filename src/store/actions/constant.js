import { START_REQUEST, END_REQUEST, COLLAPSE_NAEMENU, SET_BREADCRUMB, CHANGE_LOADING } from '../types'
import request from '@/utils/request'

// 侧边栏收起事件
export const collapseNavMenu = () => dispatch => {
  dispatch({
    type: COLLAPSE_NAEMENU
  })
}

export const setBreadcrumb = payload => dispatch => {
  dispatch({
    type: SET_BREADCRUMB,
    payload
  })
}

// 如果请求正在进行，则不发生二次请求
let userLoading = false
export const getUserInfo = () => dispatch => {
  const user = JSON.parse(localStorage.getItem('user'))
  const { userId } = user
  if (!userLoading) {
    userLoading = true
    console.log('userId: ', userId)
    dispatch({
      type: START_REQUEST
    })
    request('/web/management/personal/getUserInfo', { userId }).then(res => {
      userLoading = false
      dispatch({
        type: END_REQUEST
      })
    })
  }
}

// 修改loading状态
export const changeLoading = (payload = false) => dispatch => {
  dispatch({
    type: CHANGE_LOADING,
    payload
  })
}
