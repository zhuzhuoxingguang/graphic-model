import request from "@/utils/request"
import {
  TOPO_SIMPLE_NOT_CONNECT_BUS,
  TOPO_SIMPLE_NO_FEEDER_BREAKER,
  TOPO_SIMPLE_MULTI_CONNECT,
  TOPO_SIMPLE_BOTH_CONNECT,
  TOPO_SIMPLE_FEEDER_SWITCH
} from "./APIPATH"

export const getNotConnectBus = () => {
  return request.get(TOPO_SIMPLE_NOT_CONNECT_BUS)
}

export const getNoFeederBreaker = () => {
  return request.get(TOPO_SIMPLE_NO_FEEDER_BREAKER)
}

export const getMultiConnect = () => {
  return request.get(TOPO_SIMPLE_MULTI_CONNECT)
}

export const getBothConnect = () => {
  return request.get(TOPO_SIMPLE_BOTH_CONNECT)
}

export const getFeederEndSwitch = () => {
  return request.get(TOPO_SIMPLE_FEEDER_SWITCH)
}
