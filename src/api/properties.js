import request from "@/utils/request"
import {
  PROPERTIES_SUBSTATION_FEEDERS,
  PROPERTIES_DEVICES_SAME_NAMES,
  PROPERTIES_DEVICES_SAME_SERIES,
  PROPERTIES_VOLTAGE_NULL,
  PROPERTIES_TERMINAL_HANG
} from "./APIPATH"

export const getPropertySubstationFeeders = () => {
  return request.get(PROPERTIES_SUBSTATION_FEEDERS)
}

export const getPropertySameNamesDevices = () => {
  return request.get(PROPERTIES_DEVICES_SAME_NAMES)
}

export const getPropertySameSeriesDevices = () => {
  return request.get(PROPERTIES_DEVICES_SAME_SERIES)
}

export const getPropertyVoltageNull = () => {
  return request.get(PROPERTIES_VOLTAGE_NULL)
}

export const getPropertyTerminalHang = () => {
  return request.get(PROPERTIES_TERMINAL_HANG)
}
