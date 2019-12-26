import request from "@/utils/request"
import { SUBSTATIONS_INTERCONNECTIONS, FEEDERS_INTERCONNECTIONS } from './APIPATH'
// 电站联络关系
export const getSubstationsConnections = (data) => {
  return request.post(SUBSTATIONS_INTERCONNECTIONS, data)
}
// 馈线联络关系
export const getFeedersConnections = (data) => {
  return request.post(FEEDERS_INTERCONNECTIONS, data)
}