import Mock from "mockjs"
import {
  TOPO_SIMPLE_NOT_CONNECT_BUS,
  TOPO_SIMPLE_NO_FEEDER_BREAKER,
  TOPO_SIMPLE_MULTI_CONNECT,
  TOPO_SIMPLE_BOTH_CONNECT,
  TOPO_SIMPLE_FEEDER_SWITCH
} from "@/api/APIPATH"
import NotConnectBus from "./modules/notConnectToBus"
import NoFeederBreaker from "./modules/noFeederBreaker"
import MultiConnect from "./modules/multiConnect"
import DualConnectTransformer from "./modules/dualConnectTransformer"
import FeederEndSwitch from "./modules/feederEndSwitch"

// 属性校验 变电站馈线
Mock.mock(RegExp("/api" + TOPO_SIMPLE_NOT_CONNECT_BUS + ".*"), "get", res => {
  return Mock.mock(NotConnectBus)
})

// 属性校验 变电站馈线
Mock.mock(RegExp("/api" + TOPO_SIMPLE_NO_FEEDER_BREAKER + ".*"), "get", res => {
  return Mock.mock(NoFeederBreaker)
})

// 属性校验 一端连接多个设备
Mock.mock(RegExp("/api" + TOPO_SIMPLE_MULTI_CONNECT + ".*"), "get", res => {
  return Mock.mock(MultiConnect)
})

// 属性校验 两端都连接设备的配变校验
Mock.mock(RegExp("/api" + TOPO_SIMPLE_BOTH_CONNECT + ".*"), "get", res => {
  return Mock.mock(DualConnectTransformer)
})

// 属性校验 线路末端开关校验
Mock.mock(RegExp("/api" + TOPO_SIMPLE_FEEDER_SWITCH + ".*"), "get", res => {
  return Mock.mock(FeederEndSwitch)
})
