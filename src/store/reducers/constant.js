import { START_REQUEST, END_REQUEST, COLLAPSE_NAEMENU, SET_BREADCRUMB, CHANGE_LOADING } from '../types'
export const initialState = {
  isCollapse: false,
  breads: [],
  loading: false
}
export const reducer = (state = initialState, action) => {
  const { type, payload = null } = action
  switch (type) {
    case START_REQUEST:
      return {
        ...state,
        loading: true
      }
    case COLLAPSE_NAEMENU: {
      return {
        ...state,
        isCollapse: !state.isCollapse
      }
    }
    case SET_BREADCRUMB: {
      return {
        ...state,
        breads: payload
      }
    }
    case END_REQUEST: {
      return {
        ...state,
        loading: false
      }
    }
    case CHANGE_LOADING: {
      return {
        ...state,
        loading: !!payload
      }
    }
    default:
      return state
  }
}
