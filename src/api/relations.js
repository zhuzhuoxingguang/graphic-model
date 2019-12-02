import request from "@/utils/request"
import { SUBSTATIONS_INTERCONNECTIONS } from './APIPATH'

export const getSubstationsConnections = (data) => {
  return request.post(SUBSTATIONS_INTERCONNECTIONS, data)
}