import React, { Component } from "react"
import { Card, Layout, Descriptions, Empty } from "antd"
import VTree from "@/components/VTree/VTree"
import { getPropertyTerminalHang } from "@/api/properties"

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
        rdfID,
        clazzName,
        substationName,
        switchStationName,
        feederName,
        feederID
      } = node.terminal.conductingEquipment
      return {
        label: name,
        key: rdfID,
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

class TerminalHang extends Component {
  state = {
    treeData: [],
    currentNode: null
  }

  getData = () => {
    getPropertyTerminalHang().then(res => {
      // console.log(res)
      if (res.result === 0 && res.hierarchyResults && res.hierarchyResults.length) {
        this.setState({ treeData: resetTreeData(res.hierarchyResults) })
      }
    })
  }

  // menu点击事件
  handleMenuChange = node => {
    this.setState({ currentNode: node })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { treeData, currentNode } = this.state
    return (
      <Card bodyStyle={{ padding: 0 }}>
        <Layout>
          <VTree treeData={treeData} onClick={this.handleMenuChange} />
          <Content style={{ background: "#fff", padding: 20 }}>
            {currentNode && currentNode.rdfID ? (
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
          </Content>
        </Layout>
      </Card>
    )
  }
}

export default TerminalHang
