import React, { Component } from "react"
import { Card, Layout, Tabs, Icon, Descriptions, Empty } from "antd"
import VTree from "@/components/VTree"
import SimpleTable from "@/components/SimpleTable"
import { getNoPower } from "@/api/topology"
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
        feederID,
        equipments
      } = node.feeder
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

class NoPower extends Component {
  state = {
    list: [],
    treeData: []
  }

  getData = () => {
    getNoPower().then(res => {
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
                  <>
                    <Icon type="bar-chart" /> 图形
                  </>
                }
                key="chart"
              >
                Tab 1
              </TabPane>
              <TabPane
                tab={
                  <>
                    <Icon type="table" /> 列表
                  </>
                }
                key="table"
              >
                {list.length > 1 ? (
                  <SimpleTable dataSource={list} />
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

export default NoPower
