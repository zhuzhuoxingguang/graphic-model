import React, { Component } from "react"
import { Card, Layout, Tabs, Icon } from "antd"
import VTree from "@/components/VTree"
import SimpleTable from "../../components/SimpleTable"
import { getMultiConnect } from "../../api/topologySimple"

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
      } = node.conductingEquipment
      return {
        label: name,
        key: graphID,
        rdfID,
        clazzName,
        substationName,
        switchStationName,
        feederName,
        feederID,
        equipments: node.connectedConductingEquipments
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
    tableData: [],
    treeData: []
  }

  getData = () => {
    getMultiConnect().then(res => {
      if (res.result === 0 && res.hierarchyResults && res.hierarchyResults.length) {
        this.setState({ treeData: resetTreeData(res.hierarchyResults) })
      }
    })
  }

  handleTreeChange = node => {
    this.setState({ tableData: node.equipments || [] })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { tableData, treeData } = this.state
    return (
      <Card bodyStyle={{ padding: 20 }}>
        <Layout>
          <VTree treeData={treeData} onClick={this.handleTreeChange} />
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
                <SimpleTable dataSource={tableData} />
                {/* <Table dataSource={tableData} rowKey="rdfID" bordered>
                  <Column title="rdfID" dataIndex="rdfID" key="rdfID" />
                  <Column title="设备名称" dataIndex="name" key="name" />
                  <Column title="设备类型" dataIndex="clazzName" key="clazzName" />
                  <Column title="变电站" dataIndex="substationName" key="substationName" />
                  <Column title="配电站" dataIndex="switchStationName" key="switchStationName" />
                  <Column title="馈线" key="feederName" dataIndex="feederName" />
                  <Column title="馈线ID" dataIndex="feederID" key="feederID" />
                </Table> */}
              </TabPane>
            </Tabs>
          </Content>
        </Layout>
      </Card>
    )
  }
}

export default NoCollectBus
