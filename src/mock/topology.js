import Mock from "mockjs"
import { TOPOLOGY_NO_POWER, TOPOLOGY_DIFF_VOLTAGE, TOPOLOGY_LOOP } from "@/api/APIPATH"
import NoPower from "./modules/noPower"
import DiffVoltage from "./modules/diffVoltageLevel"
import Loop from "./modules/loop"

// 拓扑校验 无电源点的配电网设备校验
Mock.mock(RegExp("/api" + TOPOLOGY_NO_POWER + ".*"), "get", res => {
  return Mock.mock(NoPower)
})

// 拓扑校验 同馈线电压等级不同校验
Mock.mock(RegExp("/api" + TOPOLOGY_DIFF_VOLTAGE + ".*"), "get", res => {
  return Mock.mock(DiffVoltage)
})

// 拓扑校验 环网校验
Mock.mock(RegExp("/api" + TOPOLOGY_LOOP + ".*"), "get", res => {
  return Mock.mock(Loop)
})
