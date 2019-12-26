import React, { Component } from "react"
import { Card, Layout, Tabs, Icon } from "antd"
import VTree from "@/components/VTree"
import SimpleTable from "@/components/SimpleTable"
import { getBothConnect } from "@/api/topologySimple"

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
      } = node.powerTransformer
      const { connectedEquipments2 = [], powerTransformer = {}, connectedEquipments = [] } = node
      return {
        label: name,
        key: graphID,
        rdfID,
        clazzName,
        substationName,
        switchStationName,
        feederName,
        feederID,
        equipments: [powerTransformer, ...connectedEquipments, ...connectedEquipments2]
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
    treeData: [],
    tableData: []
  }

  getData = () => {
    // console.log("两端连接")
    getBothConnect().then(res => {
      // console.log("------------", res)
      if (res.result === 0 && res.hierarchyResults && res.hierarchyResults.length) {
        this.setState({ treeData: resetTreeData(res.hierarchyResults) })
      }
    })
  }

  handleMenuChange = node => {
    // console.log(node)
    const { equipments = [] } = node
    this.setState({ tableData: equipments })
    // this.setState({ currentNode: node })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { tableData, treeData } = this.state
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
                <SimpleTable dataSource={tableData} />
                {/* <Table dataSource={data}> */}
                {/* <Column title="rdfID" dataIndex="firstName" key="firstName" />
                  <Column title="设备名称" dataIndex="firstName" key="firstName" />
                  <Column title="设备类型" dataIndex="age" key="age" />
                  <Column title="变电站" dataIndex="lastName" key="lastName" />
                  <Column title="配电站" dataIndex="address" key="address" />
                  <Column
                    title="馈线"
                    key="action"
                    render={(text, record) => (
                      <span>
                        <span>Invite {record.lastName}</span>
                      </span>
                    )}
                  />
                  <Column title="馈线ID" dataIndex="address" key="address" /> */}
                {/* </Table> */}
              </TabPane>
            </Tabs>
          </Content>
        </Layout>
      </Card>
    )
  }
}

export default NoCollectBus
