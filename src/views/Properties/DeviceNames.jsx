import React, { Component } from "react"
import { Card, Layout, Table, Divider } from "antd"
import ListTree from "@/components/ListTree"
import { getPropertySameNamesDevices } from "@/api/properties"
const { Content } = Layout
const { Column } = Table

class DevicesSameName extends Component {
  state = {
    feeders: [],
    list: []
  }

  allData = []

  handleListItemChange = item => {
    const feeders = this.allData.find(i => i.name === item.name)["equipments"]
    this.setState({ feeders })
  }

  getData = () => {
    getPropertySameNamesDevices().then(res => {
      if (res.result === 0) {
        const list = res.results
          .filter(i => i.type === "同名设备校验")
          .map(device => ({ name: device.name, id: device.name }))
        this.allData = res.results
        this.setState({ list })
      }
    })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { feeders, list } = this.state
    return (
      <Card bodyStyle={{ padding: 20 }}>
        <Layout>
          <ListTree onHandleItemChange={this.handleListItemChange} devices={list} />
          <Content style={{ paddingLeft: 20, background: "#fff" }}>
            <Table
              dataSource={feeders}
              rowKey="rdfID"
              bordered
              expandedRowRender={record => (
                <div>
                  rdfID : {record.rdfID} <Divider type="vertical" /> 馈线ID : {record.mrid}
                </div>
              )}
              pagination={{ hideOnSinglePage: true }}
            >
              <Column title="设备类型" dataIndex="clazzName" key="clazzName" />
              <Column title="变电站" dataIndex="substationName" key="substationName" />
              <Column title="配电站" dataIndex="name" key="name" />
              <Column title="馈线" key="feederName" dataIndex="feederName" />
            </Table>
          </Content>
        </Layout>
      </Card>
    )
  }
}

export default DevicesSameName
