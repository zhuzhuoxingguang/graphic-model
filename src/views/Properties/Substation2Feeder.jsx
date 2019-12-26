import React, { Component } from "react"
import { Card, Tabs, Icon, Table, Divider, Empty } from "antd"
import GroupCheck from "@/components/GroupCheck/GroupCheck"
import { getSubstations } from "@/api/common"
import { getPropertySubstationFeeders } from "@/api/properties"
import Graph from "@/components/ECharts/Graph"

const { TabPane } = Tabs
const { Column } = Table

class PropSubstation2Feeder extends Component {
  state = {
    substations: [],
    tableSubstations: []
  }

  getData = () => {
    getPropertySubstationFeeders().then(res => {
      if (res.result === 0 && res.results.length) {
        const substations = res.results
          .filter(i => i.type === "变电站馈线数量")
          .map(substation => substation.substation)
        this.setState({ substations })
        console.log(substations)
      }
    })
  }

  // 变电站选择后，绘制图表和表格
  handleCheck = (bool, id) => {
    let { substations, tableSubstations } = this.state
    // 通过是否存在id 判断是单选 还是全选
    if (id) {
      if (bool) {
        const substation = substations.filter(item => item.rdfID === id)
        tableSubstations = tableSubstations.concat(substation).map(item => ({
          rdfID: item.rdfID,
          feeders: item.feeders,
          name: item.name
        }))
        this.setState({ tableSubstations })
      } else {
        // const index = tableSubstations.findIndex(item => item.rdfID === id)
        tableSubstations = tableSubstations.filter(item => item.rdfID !== id)
        this.setState({ tableSubstations })
      }
    } else {
      this.setState({ tableSubstations: bool ? substations : [] })
    }
  }

  componentDidMount() {
    this.getData()
  }

  getSubstations = () => {
    getSubstations().then(res => {
      console.log(res)
    })
  }

  render() {
    const { substations, tableSubstations } = this.state
    return (
      <Card bodyStyle={{ padding: 20 }}>
        <GroupCheck list={substations} handleCheck={this.handleCheck} />
        <Tabs defaultActiveKey="chart">
          <TabPane
            tab={
              <span>
                <Icon type="deployment-unit" /> 关系图
              </span>
            }
            key="chart"
          >
            {tableSubstations.length ? (
              <Graph dataSource={tableSubstations} />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="table" /> 表格
              </span>
            }
            key="table"
          >
            <Table
              dataSource={tableSubstations}
              size="small"
              bordered
              rowKey="rdfID"
              pagination={{ hideOnSinglePage: true }}
            >
              <Column title="变电站名称" dataIndex="name" key="name" width={96} />
              <Column
                title="馈线数量"
                key="number"
                align="center"
                width={80}
                render={(text, record) => <span>{record.feeders.length} </span>}
              />
              <Column
                title="馈线"
                key="action"
                render={(text, record) => {
                  return (
                    <>
                      {record.feeders.map((feeder, idx) => {
                        return (
                          <span key={idx}>
                            {idx > 0 ? <Divider type="vertical" /> : null}
                            <span>{feeder.name.replace("10kV", "")}</span>
                          </span>
                        )
                      })}
                    </>
                  )
                }}
              />
            </Table>
          </TabPane>
        </Tabs>
      </Card>
    )
  }
}

export default PropSubstation2Feeder
