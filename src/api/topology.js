import request from "@/utils/request"
import { TOPOLOGY_NO_POWER, TOPOLOGY_DIFF_VOLTAGE, TOPOLOGY_LOOP } from "./APIPATH"

export const getNoPower = () => {
  return request.get(TOPOLOGY_NO_POWER)
}

export const getDiffVoltage = () => {
  return request.get(TOPOLOGY_DIFF_VOLTAGE)
}

export const getLoop = () => {
  return request.get(TOPOLOGY_LOOP)
}
