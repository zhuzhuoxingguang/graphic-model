import { START_REQUEST, END_REQUEST } from '../types'
export const initialState = {
  user: null
}
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...state,
        loading: true
      }
    case END_REQUEST:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
