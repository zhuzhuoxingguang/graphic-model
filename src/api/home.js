import request from "@/utils/request"
import { HOME_STATISTICS, HOME_FEEDERS } from "./APIPATH"

export const getHomeStatistics = () => {
  return request.get(HOME_STATISTICS)
}

export const getHomeFeeders = () => {
  return request.get(HOME_FEEDERS)
}
