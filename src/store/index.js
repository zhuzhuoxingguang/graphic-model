import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { reducer as reducerConstant } from "./reducers/constant"
import { reducer as reducerUser } from "./reducers/user"
// import { reducer as reducerEnterprise } from '../view/shipper/Enterprise/redux/reducer'
const middleware = [thunk]
export const reducers = {
  constant: reducerConstant,
  user: reducerUser
  // enterprise: reducerEnterprise
}

// console.log(reducers)y
export default createStore(combineReducers(reducers), {}, applyMiddleware(...middleware))
