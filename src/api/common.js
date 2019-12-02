import request from "@/utils/request"
import { DISTRICTS_ALL, SUBSTATIONS_ALL } from "./APIPATH"

export const getRegions = () => {
  return request.get(DISTRICTS_ALL)
}

export const getSubstations = () => {
  return request.get(SUBSTATIONS_ALL)
}
