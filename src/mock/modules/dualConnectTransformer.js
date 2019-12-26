export default {
  result: 0,
  time: null,
  results: [],
  hierarchyResults: [
    {
      rdfID: "pdf_10001",
      clazz: null,
      name: "本部",
      serial: null,
      modelFile: null,
      svgFile: null,
      clazzName: null,
      substationName: null,
      switchStationName: null,
      feederName: null,
      substationID: null,
      switchStationID: null,
      feederID: null,
      graphID: null,
      extra: null,
      substations: [
        {
          rdfID: "PD_30000000_3146591",
          clazz: "Substation",
          name: "双湖变",
          serial: null,
          modelFile: "/Users/zhangyun/Downloads/njgc/凤山变/10kV凤山线193单线图(新)-20180702142908.xml",
          svgFile: "/Users/zhangyun/Downloads/njgc/凤山变/10kV凤山线193单线图(新)-20180702142908.svg",
          clazzName: "变电站",
          substationName: null,
          switchStationName: null,
          feederName: null,
          substationID: null,
          switchStationID: null,
          feederID: null,
          graphID: "PD_30000000_3146591",
          extra: null,
          psrType: null,
          connectivityNodes: [],
          equipments: [],
          voltageLevels: [],
          normalEnergizingFeeders: [],
          refNormalEnergizingFeeders: [],
          feeders: [
            {
              rdfID: "PD_10000100_86817",
              clazz: "Feeder",
              name: "10kV碧桂园#1线146",
              serial: null,
              modelFile: "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.xml",
              svgFile: "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.svg",
              clazzName: "馈线",
              substationName: "双湖变",
              switchStationName: null,
              feederName: "10kV碧桂园#1线146",
              substationID: "PD_30000000_3146591",
              switchStationID: null,
              feederID: "PD_10000100_86817",
              graphID: "PD_10000100_86817",
              extra: [
                {
                  level: "WARNING",
                  clazz: "简单拓扑校核",
                  type: "两端都连接设备的配变",
                  typeName: "DualConnectTransformer",
                  count: null,
                  powerTransformer: {
                    rdfID: "PD_30200002_665133",
                    clazz: "PowerTransformer",
                    name: "碧桂园#3变电所#2变",
                    serial: null,
                    svg: "10kVBGY212.svg",
                    modelFile:
                      "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.xml",
                    svgFile:
                      "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.svg",
                    clazzName: "变压器",
                    substationName: "双湖变",
                    switchStationName: "碧桂园#3变电所",
                    feederName: "10kV碧桂园#1线146",
                    substationID: "PD_30000000_3146591",
                    switchStationID: "PD_30000005_3213761",
                    feederID: "PD_10000100_86817",
                    graphID: "PD_30200002_665133",
                    extra: null,
                    psrType: null,
                    equipmentContainer: null,
                    terminals: [],
                    baseVoltage: null,
                    powerTransformerEnds: [],
                    connectedEquipments: [],
                    mrid: "30200002_665133"
                  },
                  connectedEquipments: [
                    {
                      rdfID: "PD_30200002_671211",
                      clazz: "PowerTransformer",
                      name: "碧桂园#2变电所#1变",
                      serial: null,
                      modelFile:
                        "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.xml",
                      svgFile:
                        "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.svg",
                      clazzName: "变压器",
                      substationName: "双湖变",
                      switchStationName: "碧桂园#2变电所",
                      feederName: "10kV碧桂园#1线146",
                      substationID: "PD_30000000_3146591",
                      switchStationID: "PD_30000005_3213315",
                      feederID: "PD_10000100_86817",
                      graphID: "PD_30200002_671211",
                      extra: null,
                      psrType: null,
                      equipmentContainer: null,
                      terminals: [],
                      baseVoltage: null,
                      powerTransformerEnds: [],
                      connectedEquipments: [],
                      mrid: "30200002_671211"
                    }
                  ],
                  connectedEquipments2: [
                    {
                      rdfID: "PD_30700000_30700002@2538429@1",
                      clazz: "LoadBreakSwitch",
                      name: "211碧桂园3#变电所2#主变进线负荷开关_1",
                      serial: null,
                      modelFile:
                        "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.xml",
                      svgFile:
                        "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.svg",
                      clazzName: "负荷开关",
                      substationName: "双湖变",
                      switchStationName: "碧桂园#3变电所",
                      feederName: "10kV碧桂园#1线146",
                      substationID: "PD_30000000_3146591",
                      switchStationID: "PD_30000005_3213761",
                      feederID: "PD_10000100_86817",
                      graphID: "PD_30700002_2538429",
                      extra: null,
                      psrType: null,
                      equipmentContainer: null,
                      terminals: [],
                      baseVoltage: null,
                      normalOpen: null,
                      open: null,
                      compositeSwitch: null,
                      connectedEquipments: [],
                      mrid: "PD_30700000_30700002@2538429@1"
                    },
                    {
                      rdfID: "PD_30600001_30700002@2538429@2",
                      clazz: "GroundDisconnector",
                      name: "211碧桂园3#变电所2#主变进线负荷开关_2",
                      serial: null,
                      modelFile:
                        "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.xml",
                      svgFile:
                        "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.svg",
                      clazzName: "接地刀闸",
                      substationName: "双湖变",
                      switchStationName: "碧桂园#3变电所",
                      feederName: "10kV碧桂园#1线146",
                      substationID: "PD_30000000_3146591",
                      switchStationID: "PD_30000005_3213761",
                      feederID: "PD_10000100_86817",
                      graphID: "PD_30700002_2538429",
                      extra: null,
                      psrType: null,
                      equipmentContainer: null,
                      terminals: [],
                      baseVoltage: null,
                      normalOpen: null,
                      open: null,
                      compositeSwitch: null,
                      connectedEquipments: [],
                      mrid: "PD_30600001_30700002@2538429@2"
                    }
                  ]
                },
                {
                  level: "WARNING",
                  clazz: "简单拓扑校核",
                  type: "两端都连接设备的配变",
                  typeName: "DualConnectTransformer",
                  count: null,
                  powerTransformer: {
                    rdfID: "PD_30200002_671211",
                    clazz: "PowerTransformer",
                    name: "碧桂园#2变电所#1变",
                    serial: null,
                    modelFile:
                      "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.xml",
                    svgFile:
                      "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.svg",
                    clazzName: "变压器",
                    substationName: "双湖变",
                    switchStationName: "碧桂园#2变电所",
                    feederName: "10kV碧桂园#1线146",
                    substationID: "PD_30000000_3146591",
                    switchStationID: "PD_30000005_3213315",
                    feederID: "PD_10000100_86817",
                    graphID: "PD_30200002_671211",
                    extra: null,
                    psrType: null,
                    equipmentContainer: null,
                    terminals: [],
                    baseVoltage: null,
                    powerTransformerEnds: [],
                    connectedEquipments: [],
                    mrid: "30200002_671211"
                  },
                  connectedEquipments: [
                    {
                      rdfID: "PD_30600001_30700002@2532914@2",
                      clazz: "GroundDisconnector",
                      name: "111碧桂园2#变电所1#主变进线负荷开关_2",
                      serial: null,
                      modelFile:
                        "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.xml",
                      svgFile:
                        "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.svg",
                      clazzName: "接地刀闸",
                      substationName: "双湖变",
                      switchStationName: "碧桂园#2变电所",
                      feederName: "10kV碧桂园#1线146",
                      substationID: "PD_30000000_3146591",
                      switchStationID: "PD_30000005_3213315",
                      feederID: "PD_10000100_86817",
                      graphID: "PD_30700002_2532914",
                      extra: null,
                      psrType: null,
                      equipmentContainer: null,
                      terminals: [],
                      baseVoltage: null,
                      normalOpen: null,
                      open: null,
                      compositeSwitch: null,
                      connectedEquipments: [],
                      mrid: "PD_30600001_30700002@2532914@2"
                    },
                    {
                      rdfID: "PD_32000000_9916469",
                      clazz: "Junction",
                      name: "111",
                      serial: null,
                      modelFile:
                        "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.xml",
                      svgFile:
                        "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.svg",
                      clazzName: null,
                      substationName: "双湖变",
                      switchStationName: "碧桂园#2变电所",
                      feederName: "10kV碧桂园#1线146",
                      substationID: "PD_30000000_3146591",
                      switchStationID: "PD_30000005_3213315",
                      feederID: "PD_10000100_86817",
                      graphID: "PD_32000000_9916469",
                      extra: null,
                      psrType: null,
                      equipmentContainer: null,
                      terminals: [],
                      baseVoltage: null,
                      connectedEquipments: [],
                      mrid: "32000000_9916469"
                    },
                    {
                      rdfID: "PD_30700000_30700002@2532914@1",
                      clazz: "LoadBreakSwitch",
                      name: "111碧桂园2#变电所1#主变进线负荷开关_1",
                      serial: null,
                      modelFile:
                        "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.xml",
                      svgFile:
                        "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.svg",
                      clazzName: "负荷开关",
                      substationName: "双湖变",
                      switchStationName: "碧桂园#2变电所",
                      feederName: "10kV碧桂园#1线146",
                      substationID: "PD_30000000_3146591",
                      switchStationID: "PD_30000005_3213315",
                      feederID: "PD_10000100_86817",
                      graphID: "PD_30700002_2532914",
                      extra: null,
                      psrType: null,
                      equipmentContainer: null,
                      terminals: [],
                      baseVoltage: null,
                      normalOpen: null,
                      open: null,
                      compositeSwitch: null,
                      connectedEquipments: [],
                      mrid: "PD_30700000_30700002@2532914@1"
                    }
                  ],
                  connectedEquipments2: [
                    {
                      rdfID: "PD_30200002_665133",
                      clazz: "PowerTransformer",
                      name: "碧桂园#3变电所#2变",
                      serial: null,
                      modelFile:
                        "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.xml",
                      svgFile:
                        "/Users/zhangyun/Downloads/njgc/城北变/10kV碧桂园#2线212单线图(新)-20180702095745.svg",
                      clazzName: "变压器",
                      substationName: "双湖变",
                      switchStationName: "碧桂园#3变电所",
                      feederName: "10kV碧桂园#1线146",
                      substationID: "PD_30000000_3146591",
                      switchStationID: "PD_30000005_3213761",
                      feederID: "PD_10000100_86817",
                      graphID: "PD_30200002_665133",
                      extra: null,
                      psrType: null,
                      equipmentContainer: null,
                      terminals: [],
                      baseVoltage: null,
                      powerTransformerEnds: [],
                      connectedEquipments: [],
                      mrid: "30200002_665133"
                    }
                  ]
                }
              ],
              psrType: null,
              connectivityNodes: [],
              equipments: [],
              normalEnergizingSubstation: null,
              normalHeadTerminals: [],
              substations: [],
              interconnections: [],
              breaker: null,
              mrid: "10000100_86817"
            }
          ],
          mrid: "30000000_3146591"
        }
      ],
      mrid: null
    }
  ]
}