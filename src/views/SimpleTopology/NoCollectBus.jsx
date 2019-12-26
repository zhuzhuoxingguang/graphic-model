import React, { Component } from "react"
import { Card, Layout, Table, Tabs, Icon, Descriptions, Empty } from "antd"
import VTree from "@/components/VTree"
import { getNotConnectBus } from "../../api/topologySimple"
const { TabPane } = Tabs
const { Content } = Layout
const { Column } = Table

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
      } = node.substation
      return {
        label: name,
        key: graphID,
        rdfID,
        clazzName,
        substationName,
        switchStationName,
        feederName,
        feederID,
        equipments: node.equipments
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
    list: [],
    treeData: []
  }

  getData = () => {
    getNotConnectBus().then(res => {
      console.log("====", res)
      if (res.result === 0 && res.hierarchyResults && res.hierarchyResults.length) {
        this.setState({ treeData: resetTreeData(res.hierarchyResults) })
      }
    })
  }
  handleMenuChange = node => {
    const { equipments = [] } = node
    console.log("equipments:", equipments)
    this.setState({ list: equipments })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { list, treeData } = this.state
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
                {list.length > 1 ? (
                  <Table dataSource={list} bordered pagination={{ hideOnSinglePage: true }}>
                    <Column title="rdfID" dataIndex="rdfID" key="rdfID" />
                    <Column title="设备名称" dataIndex="name" key="name" />
                    <Column title="设备类型" dataIndex="clazzName" key="clazzName" />
                    <Column title="变电站" dataIndex="substationName" key="substationName" />
                    <Column title="配电站" dataIndex="switchStationName" key="switchStationName" />
                    <Column title="馈线" key="feederName" dataIndex="feederName" />
                    <Column title="馈线ID" dataIndex="feederID" key="feederID" />
                  </Table>
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
              </TabPane>
            </Tabs>
          </Content>
        </Layout>
      </Card>
    )
  }
}

export default NoCollectBus
