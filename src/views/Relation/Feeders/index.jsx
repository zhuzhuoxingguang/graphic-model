/* eslint-disable template-curly-spacing */
import React, { Component, createRef } from "react"
import { Card, Layout, Divider, Spin } from "antd"
import ReactEcharts from 'echarts-for-react'
import TreeSubstations from "@/components/TreeSubstations"
import { getFeedersConnections } from "@/api/relations"

const { Sider, Content } = Layout

export default class Feeders extends Component {
  state = {
    option: {
      tooltip: {},
      legend: { data: [] },
      grid: {
        top: 30
      },
      animationDuration: 1500,
      animationEasingUpdate: "quinticInOut",
      series: {
        type: "graph",
        layout: "force",
        roam: true,
        zoom: 5,
        focusNodeAdjacency: true,
        itemStyle: {
          normal: {
            borderColor: "#fff",
            borderWidth: 1,
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.3)"
          }
        },
        label: {
          position: "right",
          formatter: "{b}"
        },
        lineStyle: {
          color: "source",
          width: 3,
          curveness: .5
        },
        force: {
          repulsion: 30
        },
        emphasis: {
          lineStyle: {
            width: 8
          }
        }
      }
    },
    loading: false
  }

  echartsFeedersRef = createRef()
  echartsInstance = null

  getFeedersConnections = params => {
    this.setState({ loading: true })
    const { option } = this.state
    getFeedersConnections(params).then(res => {
      const { series: [series] } = res
      const { categories = [], nodes = [], links = [] } = series
      option.series = { ...option.series, categories, nodes, links }
      option.legend.data = categories.map(a => a.name)
      if (params.length > 2) {
        option.series.zoom = 3
      }
      this.setState({ option })
      // 部分变电站的数据  应该是缺少内容 导致绘制图表时报错
      this.echartsInstance.setOption(option)
    }).finally(() => this.setState({ loading: false }))
  }

  resetSubstations = substations => {

  }

  componentDidMount () {
    // this.getSubstations()
    this.echartsInstance = this.echartsFeedersRef.getEchartsInstance()
  }

  render () {
    const { option, loading } = this.state
    return (
      <Card bodyStyle={{ padding: 0 }}>
        <Spin spinning={loading}>
          <Layout style={{ background: "#fff" }}>
            <Sider style={{ background: "#fff", padding: "10px", height: 'calc(100vh - 154px)', overflowY: 'auto' }}>
              <TreeSubstations onGetConnections={this.getFeedersConnections} />
            </Sider>
            <Divider
              type="vertical"
              style={{ height: "auto", display: "block", margin: 0 }}
            />
            <Content style={{ background: "#fff", padding: "10px", height: "calc(100vh - 154px)" }}>
              <ReactEcharts
                option={option}
                style={{ height: '100%', width: '100%' }}
                ref={node => this.echartsFeedersRef = node}
              />
            </Content>
          </Layout>
        </Spin>
      </Card>
    )
  }
}
