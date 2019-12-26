import React, { Component } from "react"
import { Row, Col, Avatar } from "antd"
import CountUp from "react-countup"
import { Bar, Pie, Line } from "@/components/ECharts"
import { getHomeStatistics, getHomeFeeders } from "@/api/home"

export default class Home extends Component {
  state = {
    feederData: { data: [], title: "" },
    abnormalData: [
      { x: "未拼接主网设备", y: 212 },
      { x: "变电站馈线", y: 23 },
      { x: "同名设备", y: 47 },
      { x: "同编号设备", y: 286 },
      { x: "空电压设备", y: 123 },
      { x: "端子悬空设备", y: 147 },
      { x: "同名设备1", y: 47 },
      { x: "同编号设备2", y: 286 },
      { x: "空电压设备3", y: 123 },
      { x: "端子悬空设备4", y: 147 },
      { x: "同名设备5", y: 47 },
      { x: "同编号设备6", y: 286 },
      { x: "空电压设备7", y: 123 },
      { x: "端子悬空设备8", y: 147 }
    ],
    chartData: [],
    barData: [
      { name: "南京直属", 主变容量: 32, 主变浴度: 43 },
      { name: "高淳", 主变容量: 23, 主变浴度: 32 },
      { name: "溧水", 主变容量: 19, 主变浴度: 28 }
    ],
    statistics: { substations: 0, feeders: 0, connections: 0, rings: 0 }
  }

  getStatistics = () => {
    // 基本信息请求
    getHomeStatistics().then(res => {
      if (res) {
        const statistics = {
          substations: res["变电站数量"],
          feeders: res["馈线数量"],
          connections: res["联络数量"],
          rings: res["环网数量"]
        }
        this.setState({ statistics })
      }
    })
    // 馈线电压等级信息统计
    getHomeFeeders().then(res => {
      // console.log(res)
      const series = res.series[0] || {}
      const xAxis = res.xAxis[0].data || []
      const { name = "", data = [] } = series
      console.log(res)
      const feederData = xAxis.map((item, index) => {
        return {
          电压等级: item,
          数量: data[index]
        }
      })
      this.setState({ feederData: { data: feederData, title: name } })
    })
  }

  handleChangeBarData = () => {
    this.setState({
      barData: [
        { name: "南京直属", 主变容量: 12, 主变浴度: 21 },
        { name: "高淳", 主变容量: 22, 主变浴度: 14 },
        { name: "溧水", 主变容量: 24, 主变浴度: 25 }
      ]
    })
  }

  componentDidMount () {
    this.getStatistics()
  }

  render () {
    const { statistics: { substations = 0, feeders = 0, connections = 0, rings = 0 }, feederData } = this.state
    const lineData = [
      { name: "周一", 环网柜校验: 12, 异常: 21 },
      { name: "周二", 环网柜校验: 22, 异常: 14 },
      { name: "周三", 环网柜校验: 24, 异常: 25 },
      { name: "周四", 环网柜校验: 16, 异常: 17 },
      { name: "周五", 环网柜校验: 22, 异常: 15 }
    ]
    return (
      <Row gutter={16}>
        <Col span={6}>
          <div className="statistics-item" onClick={this.handleChangeBarData}>
            <div className="statistics-item-inner">
              <Avatar
                src={require("@/assets/images/icon-substation.jpg")}
                shape="square"
                size="large"
              />
              <div className="statistics">
                <p>变电站</p>
                <CountUp end={substations} />
              </div>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="statistics-item">
            <div className="statistics-item-inner">
              <Avatar
                src={require("@/assets/images/icon-feeder.jpg")}
                shape="square"
                size="large"
              />
              <div className="statistics">
                <p>馈线</p>
                <CountUp end={feeders} />
              </div>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="statistics-item">
            <div className="statistics-item-inner">
              <Avatar
                src={require("@/assets/images/icon-connection.jpg")}
                shape="square"
                size="large"
              />
              <div className="statistics">
                <p>联络</p>
                <CountUp end={connections} />
              </div>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="statistics-item">
            <div className="statistics-item-inner">
              <Avatar
                src={require("@/assets/images/icon-ring.jpg")}
                shape="square"
              />
              <div className="statistics">
                <p>环网</p>
                <CountUp end={rings} />
              </div>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="bg-wihte">
            <Bar dataset={feederData.data} height={320} title={feederData.title} unit="条" />
          </div>
        </Col>
        <Col span={12}>
          <div className="bg-wihte">
            <Pie
              dataset={feederData.data}
              height={320}
            />
          </div>
        </Col>
        <Col span={24}>
          <div className="bg-wihte">
            <Line dataset={lineData} height={320} />
          </div>
        </Col>
      </Row>
    )
  }
}
