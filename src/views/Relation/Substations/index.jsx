/* eslint-disable template-curly-spacing */
import React, { Component, createRef } from "react"
import { Card, Layout, Divider, Spin } from "antd"
import ReactEcharts from "echarts-for-react"
import TreeSubstations from "@/components/TreeSubstations"
import { getSubstationsConnections } from "@/api/relations"

const { Sider, Content } = Layout

export default class Substations extends Component {
  state = {
    option: {
      tooltip: {},
      legend: { data: [] },
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
          curveness: 0.5
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

  echartsRef = createRef()
  echartsInstance = null

  getSubstationsConnections = params => {
    this.setState({ loading: true })
    const { option } = this.state
    getSubstationsConnections(params)
      .then(res => {
        // console.log(res)
        const {
          series: [series]
        } = res
        const { categories = [], nodes = [], links = [] } = series
        option.series = { ...option.series, categories, nodes, links }
        option.legend.data = categories.map(a => a.name)
        if (params.length > 2) {
          option.series.zoom = 3
        }
        this.setState({ option })
        this.echartsInstance.setOption(option)
      })
      .finally(() => this.setState({ loading: false }))
  }

  resetSubstations = substations => {}

  componentDidMount() {
    // this.getSubstations()
    this.echartsInstance = this.echartsRef.getEchartsInstance()
  }

  render() {
    const { option, loading } = this.state
    return (
      <Card bodyStyle={{ padding: 0 }}>
        <Spin spinning={loading}>
          <Layout style={{ background: "#fff" }}>
            <Sider
              style={{ background: "#fff", padding: "10px", height: "calc(100vh - 154px)", overflowY: "auto" }}
            >
              <TreeSubstations onGetConnections={this.getSubstationsConnections} />
            </Sider>
            <Divider type="vertical" style={{ height: "auto", display: "block", margin: 0 }} />
            <Content style={{ background: "#fff", padding: "10px", height: "calc(100vh - 154px)" }}>
              <ReactEcharts
                option={option}
                style={{ height: "100%", width: "100%" }}
                ref={node => (this.echartsRef = node)}
              />
            </Content>
          </Layout>
        </Spin>
      </Card>
    )
  }
}
