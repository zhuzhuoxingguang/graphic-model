import React, { Component } from "react"
import { Card, Layout, Tabs, Icon, Descriptions, Empty } from "antd"
import VTree from "@/components/VTree"
import { getFeederEndSwitch } from "@/api/topologySimple"

const { TabPane } = Tabs
const { Content } = Layout

const resetTreeData = trees => {
  return trees.map(node => {
    const children =
      (node.substations && node.substations.length && node.substations) ||
      (node.feeders && node.feeders.length && node.feeders) ||
      (node.extra && node.extra.length && node.extra)

    if (!children || !children.length) {
      const { name, rdfID, clazzName, substationName, switchStationName, feederName, feederID } = node.equipment
      return {
        label: name,
        key: rdfID,
        rdfID,
        clazzName,
        substationName,
        switchStationName,
        feederName,
        feederID,
        equipments: node.equipment
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

class NoCollectBus extends Component {
  state = {
    currentNode: null,
    treeData: []
  }

  getData = () => {
    getFeederEndSwitch().then(res => {
      if (res.result === 0 && res.hierarchyResults && res.hierarchyResults.length) {
        this.setState({ treeData: resetTreeData(res.hierarchyResults) })
      }
    })
  }

  handleMenuChange = node => {
    this.setState({ currentNode: node.equipments })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { treeData, currentNode } = this.state
    return (
      <Card bodyStyle={{ padding: 20 }}>
        <Layout>
          <VTree treeData={treeData} onClick={this.handleMenuChange} />
          <Content style={{ paddingLeft: 20, background: "#fff" }}>
            <Tabs defaultActiveKey="table">
              <TabPane
                tab={
                  <span>
                    <Icon type="bar-chart" /> 图形
                  </span>
                }
                key="chart"
              >
                Tab 1
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type="table" /> 列表
                  </span>
                }
                key="table"
              >
                {currentNode && currentNode.rdfID ? (
                  <Descriptions title={currentNode.label} layout="vertical" bordered>
                    <Descriptions.Item label="rdfID">{currentNode.rdfID}</Descriptions.Item>
                    <Descriptions.Item label="设备名称">{currentNode.name}</Descriptions.Item>
                    <Descriptions.Item label="设备类型">{currentNode.clazzName}</Descriptions.Item>
                    <Descriptions.Item label="变电站">{currentNode.substationName}</Descriptions.Item>
                    <Descriptions.Item label="配电站">{currentNode.switchStationName}</Descriptions.Item>
                    <Descriptions.Item label="馈线">{currentNode.feederName}</Descriptions.Item>
                    <Descriptions.Item label="馈线ID">{currentNode.feederID}</Descriptions.Item>
                  </Descriptions>
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </TabPane>
            </Tabs>
          </Content>
        </Layout>
      </Card>
    )
  }
}

export default NoCollectBus
