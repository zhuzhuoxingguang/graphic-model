import Mock from "mockjs"
import FeererCount from "./modules/feederCount"
import DulplicateNames from "./modules/duplicateName"
import DuplicateSerial from "./modules/duplicateSerial"
import voltageNull from "./modules/voltageNull"
import terminalHang from "./modules/terminalHang"

import {
  PROPERTIES_SUBSTATION_FEEDERS,
  PROPERTIES_DEVICES_SAME_NAMES,
  PROPERTIES_DEVICES_SAME_SERIES,
  PROPERTIES_VOLTAGE_NULL,
  PROPERTIES_TERMINAL_HANG
} from "@/api/APIPATH"

// 属性校验 变电站馈线
Mock.mock(RegExp("/api" + PROPERTIES_SUBSTATION_FEEDERS + ".*"), "get", res => {
  console.log("mock:", PROPERTIES_SUBSTATION_FEEDERS)
  return Mock.mock(FeererCount)
})

// 属性校验 同名设备校验
Mock.mock(RegExp("/api" + PROPERTIES_DEVICES_SAME_NAMES + ".*"), "get", res => {
  console.log("mock:", PROPERTIES_DEVICES_SAME_NAMES)
  return Mock.mock(DulplicateNames)
})

// 属性校验 同编号设备校验
Mock.mock(RegExp("/api" + PROPERTIES_DEVICES_SAME_SERIES + ".*"), "get", res => {
  console.log("mock:", PROPERTIES_DEVICES_SAME_SERIES)
  return Mock.mock(DuplicateSerial)
})

// 属性校验 空电压等级校验
Mock.mock(RegExp("/api" + PROPERTIES_VOLTAGE_NULL + ".*"), "get", res => {
  return Mock.mock(voltageNull)
})

// 属性校验 端子悬空设备校验
Mock.mock(RegExp("/api" + PROPERTIES_TERMINAL_HANG + ".*"), "get", res => {
  return Mock.mock(terminalHang)
})
