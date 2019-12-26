import React, { Component } from "react"
import { Card, Icon } from "antd"
import FeederBreakerTable from "./Modules/FeederBreakerTable"
import { getNoFeederBreaker } from "../../api/topologySimple"

class PropSubstation2Feeder extends Component {
  state = {
    list: [],
    noTitleKey: "table"
  }

  contentListNoTitle = {
    chart: <p>chart content</p>,
    table: <FeederBreakerTable data={this.state.list} />
  }

  getData = () => {
    getNoFeederBreaker().then(res => {
      console.log("=====", res)
      const tableData = []
      if (res.result === 0 && res.hierarchyResults && res.hierarchyResults.length) {
        res.hierarchyResults.forEach(substation => {
          substation.substations.forEach(feeder => {
            feeder.extra.forEach(extra => {
              tableData.push({
                name: substation.name,
                substation: feeder.name,
                breaker: extra.breaker.name,
                id: extra.breaker.rdfID
              })
            })
          })
        })
      }

      this.setState({ list: tableData }, () => {
        console.log(this.state.list)
      })
    })
  }

  onTabChange = (key, type) => {
    console.log(key, type)
    this.setState({ [type]: key })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    console.log(this.state.list)
    return (
      <Card
        style={{ width: "100%" }}
        tabList={[
          {
            key: "chart",
            tab: (
              <span>
                <Icon type="bar-chart" />
                图表
              </span>
            )
          },
          {
            key: "table",
            tab: (
              <span>
                <Icon type="table" />
                表格
              </span>
            )
          }
        ]}
        activeTabKey={this.state.noTitleKey}
        onTabChange={key => {
          this.onTabChange(key, "noTitleKey")
        }}
        bodyStyle={{ padding: 0 }}
      >
        {this.contentListNoTitle[this.state.noTitleKey]}
      </Card>
    )
  }
}

export default PropSubstation2Feeder
