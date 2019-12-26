import React, { Component } from "react"
import { Card, Layout, Tabs, Icon, Descriptions, Empty } from "antd"
import VTree from "@/components/VTree"
import SimpleTable from "@/components/SimpleTable"
import { getLoop } from "@/api/topology"
const { TabPane } = Tabs
const { Content } = Layout

// eslint-disable-next-line
const resetTreeData = trees => {
  return trees.map(node => {
    const children = node.breakers && node.breakers.length && node.breakers

    if (!children || !children.length) {
      const { name, graphID, rdfID, clazzName, substationName, switchStationName, feederName, feederID } = node

      const { diffVoltages } = node
      // console.log("currentNode:", diffVoltages)
      const equipments = []
      Object.keys(diffVoltages).forEach(item => {
        equipments.push(...diffVoltages[item].map(e => ({ ...e, voltage: item })))
      })
      // console.log("current", equipments)
      return {
        label: name,
        key: graphID,
        rdfID,
        clazzName,
        substationName,
        switchStationName,
        feederName,
        feederID,
        equipments
      }
    }
    let { name, rdfID } = node
    return {
      label: name,
      key: rdfID,
      children: resetTreeData(children)
    }
  })
}

class Loop extends Component {
  state = {
    list: [],
    treeData: []
  }

  getData = () => {
    getLoop().then(res => {
      // console.log("====", res)
      if (res.result === 0 && res.results && res.results.length) {
        this.setState({ treeData: [] })
      }
    })
  }
  handleMenuChange = node => {
    const { equipments = [] } = node
    // console.log("equipments:", equipments)
    this.setState({ list: equipments })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { list, treeData } = this.state
    // console.log("list:", list)
    return (
      <Card bodyStyle={{ padding: 20 }}>
        <Tabs defaultActiveKey="table">
          <TabPane
            tab={
              <>
                <Icon type="table" /> 列表
              </>
            }
            key="table"
          >
            <Layout>
              <VTree treeData={treeData} onClick={this.handleMenuChange} />
              <Content style={{ paddingLeft: 20, background: "#fff" }}>
                {list.length > 1 ? (
                  <SimpleTable dataSource={list} extra={[{ key: "voltage", title: "电压等级", index: 2 }]} />
                ) : list.length === 1 ? (
                  <Descriptions title={list[0].label} layout="vertical" bordered>
                    <Descriptions.Item label="rdfID">{list[0].rdfID}</Descriptions.Item>
                    <Descriptions.Item label="设备名称">{list[0].label}</Descriptions.Item>
                    <Descriptions.Item label="设备类型">{list[0].clazzName}</Descriptions.Item>
                    <Descriptions.Item label="变电站">{list[0].substationName}</Descriptions.Item>
                    <Descriptions.Item label="配电站">{list[0].switchStationName}</Descriptions.Item>
                    <Descriptions.Item label="馈线">{list[0].feederName}</Descriptions.Item>
                    <Descriptions.Item label="馈线ID">{list[0].feederID}</Descriptions.Item>
                  </Descriptions>
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </Content>
            </Layout>
          </TabPane>
          <TabPane
            tab={
              <>
                <Icon type="bar-chart" /> 图形
              </>
            }
            key="chart"
          >
            Tab 1
          </TabPane>
        </Tabs>
      </Card>
    )
  }
}

export default Loop
