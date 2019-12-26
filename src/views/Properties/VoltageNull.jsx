import React, { Component } from "react"
import { Card, Layout, Tabs, Icon, Descriptions, Empty } from "antd"
import VTree from "@/components/VTree"
import { getPropertyVoltageNull } from "../../api/properties"

const { TabPane } = Tabs
const { Content } = Layout

const resetTreeData = trees => {
  return trees.map(node => {
    const children =
      (node.substations && node.substations.length && node.substations) ||
      (node.feeders && node.feeders.length && node.feeders) ||
      (node.extra && node.extra.length && node.extra)

    if (!children || !children.length) {
      const {
        name,
        graphID,
        rdfID,
        clazzName,
        substationName,
        switchStationName,
        feederName,
        feederID
      } = node.equipment
      return {
        label: name,
        key: graphID,
        rdfID,
        clazzName,
        substationName,
        switchStationName,
        feederName,
        feederID
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

class VoltageNull extends Component {
  state = {
    data: [
      {
        key: "1",
        firstName: "John",
        lastName: "Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"]
      },
      {
        key: "2",
        firstName: "Jim",
        lastName: "Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"]
      },
      {
        key: "3",
        firstName: "Joe",
        lastName: "Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"]
      }
    ],
    treeData: [],
    currentNode: {}
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    getPropertyVoltageNull().then(res => {
      if (res.result === 0 && res.hierarchyResults && res.hierarchyResults.length) {
        this.setState({ treeData: resetTreeData(res.hierarchyResults) })
      }
    })
  }

  // menu点击事件
  handleMenuChange = node => {
    // console.log(node)
    this.setState({ currentNode: node })
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
                key="descriptions"
              >
                {currentNode.rdfID ? (
                  <Descriptions title={currentNode.label} layout="vertical" bordered>
                    <Descriptions.Item label="rdfID">{currentNode.rdfID}</Descriptions.Item>
                    <Descriptions.Item label="设备名称">{currentNode.label}</Descriptions.Item>
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

export default VoltageNull
