// 用户登录
export const DO_LOGIN = "/login/check"

// 通用类型数据接口 获取区域列表
export const DISTRICTS_ALL = "/info/regions"

// 通用类型数据接口 获取区域下所有变电站
export const SUBSTATIONS_ALL = "/info/regions/substations"

// 首页 数据统计
export const HOME_STATISTICS = "/info/system"

// 首页 馈线统计绘制饼图
export const HOME_FEEDERS = "/info/feeders/voltages"

// 线变关系 变电站联络关系
export const SUBSTATIONS_INTERCONNECTIONS = "info/substations/interconnections"

// 线变关系 馈线联络关系
export const FEEDERS_INTERCONNECTIONS = "/info/substations/feeders/interconnections?ignoreSameSubstation=true"

// 用户列表接口名称
export const USERS_LIST = "/users/list"

// 线变关系
export const SUBSTATIONS_LIST = "/relation/substations-list"

// 模型加载
export const MODEL_LOAD = "/verify/verifiesResults"

// 属性校验
// 变电站馈线
export const PROPERTIES_SUBSTATION_FEEDERS = "/verify/verifies/results/FeederCount"

// 同名设备校验
export const PROPERTIES_DEVICES_SAME_NAMES = "/verify/verifies/results/DuplicateName"

// 同编号设备校验
export const PROPERTIES_DEVICES_SAME_SERIES = "/verify/verifies/results/DuplicateSerial"

// 空电压等级校验
export const PROPERTIES_VOLTAGE_NULL = "/verify/verifies/results/VoidVoltageLevel"

// 端子悬空设备校验
export const PROPERTIES_TERMINAL_HANG = "/verify/verifies/results/TerminalHang"

// 简单拓扑校验
// 未与母线相连设备校验
export const TOPO_SIMPLE_NOT_CONNECT_BUS = "/verify/verifies/results/NotConnectToBus"

// 未拼接配电网设备的主网负荷校验
export const TOPO_SIMPLE_NO_FEEDER_BREAKER = "/verify/verifies/results/NoFeederBreaker"

// 一端连接多个设备校验
export const TOPO_SIMPLE_MULTI_CONNECT = "/verifies/results/MultiConnect"

// 两端都连接设备的配变校验
export const TOPO_SIMPLE_BOTH_CONNECT = "/verify/verifies/results/DualConnectTransformer"

// 线路末端开关校验
export const TOPO_SIMPLE_FEEDER_SWITCH = "/verify/verifies/results/FeederEndSwitch"

// 拓扑校验
// 无电源点的配电网设备校验
export const TOPOLOGY_NO_POWER = "/verify/verifies/results/NoPower"

// 同馈线电压等级不同校验
export const TOPOLOGY_DIFF_VOLTAGE = "/verify/verifies/results/DifferentVoltageLevel"

// 环网校验
export const TOPOLOGY_LOOP = "/verify/verifies/results/LoopNetwork"
