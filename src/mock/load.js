import Mock from 'mockjs'

Mock.mock(RegExp('/mock/model/verifiesResults.*'), 'get', rs => {
  return Mock.mock({
    statusCode: 200,
    result: 0,
    results: {
      'list|10': [
        {
          time: '@datetime',
          data: [
            {
              type: 'properties',
              name: '属性校验',
              children: [
                {
                  type: '变电站馈线数量',
                  typeName: 'FeederCount',
                  count: '@integer(10,26)'
                },
                {
                  type: '同名设备校验',
                  typeName: 'DuplicateName',
                  count: '@integer(80,187)'
                },
                {
                  type: '同编号设备校验',
                  typeName: 'DuplicateSerial',
                  count: '@integer(0,45)'
                },
                {
                  type: '空电压等级设备校验',
                  typeName: 'VoidVoltageLevel',
                  count: '@integer(80,132)'
                },
                {
                  type: '端子悬空校验',
                  typeName: 'TerminalHang',
                  count: '@integer(20,72)'
                }
              ]
            },
            {
              type: 'simpleTopo',
              name: '简单拓扑校验',
              children: [
                {
                  type: '未与母线相连的设备',
                  typeName: 'NotConnectToBus',
                  count: '@integer(100,212)'
                },
                {
                  type: '未拼接配电网设备的主网负荷',
                  typeName: 'NoFeederBreaker',
                  count: '@integer(2,67)'
                },
                {
                  type: '一端连接设备>2的设备',
                  typeName: 'MultiConnect',
                  count: '@integer(1,31)'
                },
                {
                  type: '线路末端的开关',
                  typeName: 'FeederEndSwitch',
                  count: '@integer(100,326)'
                },
                {
                  type: '两端都连接设备的配变',
                  typeName: 'DualConnectTransformer',
                  count: '@integer(1,16)'
                }
              ]
            },
            {
              type: 'topo',
              name: '拓扑校验',
              children: [
                {
                  type: '同馈线下不同电压等级设备校验',
                  typeName: 'DifferentVoltageLevel',
                  count: '@integer(5,32)'
                },
                {
                  type: '形成环网的出线开关对',
                  typeName: 'LoopNetwork',
                  count: '@integer(1,24)'
                },


                {
                  type: '无电源点的设备',
                  typeName: 'NoPower',
                  count: '@integer(32,108)'
                }
              ]
            }
          ]
        }
      ]
    }
  })
})
