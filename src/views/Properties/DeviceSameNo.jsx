import React, { Component } from "react"
import { Card, Layout, Table, Divider } from "antd"
import ListTree from "@/components/ListTree"
import { getPropertySameSeriesDevices } from "@/api/properties"
const { Content } = Layout
const { Column } = Table

class DevicesSameNO extends Component {
  state = {
    tableData: [],
    list: []
  }

  sameSerials = []

  getData = () => {
    getPropertySameSeriesDevices().then(res => {
      console.log(res)
      if (res.result === 0) {
        const sameSerials = res.results.filter(item => item.type === "同编号设备校验")
        const list = sameSerials.map(item => ({ name: item.serial, id: item.serial }))
        this.allDevices = sameSerials
        this.setState({ list })
      }
    })
  }

  handleListItemChange = item => {
    console.log(item)
    let currentSerial = this.allDevices.find(device => device.serial === item.id)
    const list = currentSerial && currentSerial.equipments ? currentSerial.equipments : []
    this.setState({ tableData: list })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { tableData, list } = this.state
    console.log(tableData)
    return (
      <Card bodyStyle={{ padding: 20 }}>
        <Layout>
          <ListTree onHandleItemChange={this.handleListItemChange} devices={list} />
          <Content style={{ paddingLeft: 20, background: "#fff" }}>
            <Table
              rowKey="rdfID"
              dataSource={tableData}
              bordered
              expandedRowRender={record => (
                <div>
                  rdfID : {record.rdfID} <Divider type="vertical" /> 馈线ID : {record.mrid}
                </div>
              )}
              pagination={{ hideOnSinglePage: true }}
            >
              <Column title="设备名称" dataIndex="name" key="name" />
              <Column title="设备类型" dataIndex="clazzName" key="clazzName" />
              <Column title="变电站" dataIndex="substationName" key="substationName" />
              <Column title="配电站" dataIndex="switchStationName" key="switchStationName" />
              <Column title="配电站" dataIndex="feederName" key="feederName" />
            </Table>
          </Content>
        </Layout>
      </Card>
    )
  }
}

export default DevicesSameNO
