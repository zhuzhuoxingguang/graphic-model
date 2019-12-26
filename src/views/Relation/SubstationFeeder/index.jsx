/* eslint-disable space-before-function-paren */
import React, { Component } from "react"
import { Input, Table, Card, Divider, Typography } from "antd"
import { connect } from "react-redux"
import { getSubstationsFeeders } from "@/api/relation"
import SearchForm from "@/components/SearchForm"
import VPagination from "@/components/VPagination"
import { changeLoading } from "@/store/actions/constant"

const { Column } = Table
const { Text } = Typography

class Substations2Feeders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      total: 0,
      substationName: ""
    }
  }

  data = {
    substationName: ""
  }

  handleSearch = val => {
    const { substationName } = val
    if (substationName !== this.data.substationName) {
      // console.log(val)
      this.data.substationName = substationName
      this.getData(substationName, 1, 10)
    }
  }

  handlePaginationChange = (page, pageSize) => {
    const { substationName } = this.state
    this.getData(substationName, page, pageSize)
  }

  getData = (substationName, page, pageSize) => {
    this.props.changeLoading(true)
    getSubstationsFeeders(page, pageSize).then(res => {
      // console.log(res)
      const { list = [], total = 0 } = res
      this.setState({ list, total })
      setTimeout(() => {
        this.props.changeLoading()
      }, 3000)
    })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { list, total } = this.state
    return (
      <div>
        <SearchForm search={this.handleSearch}>
          <Input placeholder="请输入变电站名称" key="substationName" formType="Input" />
        </SearchForm>
        <Card bodyStyle={{ padding: 0 }} style={{ marginTop: 20 }}>
          <Table dataSource={list} pagination={false}>
            <Column width={120} title="变电站名称" dataIndex="substationName" key="substationName" />
            <Column
              title="线路数量"
              key="sum"
              align="center"
              width={120}
              render={({ lines }) => lines.length}
            />
            <Column
              title="线路名称"
              key="lines"
              render={({ lines }) => {
                return lines.map((line, index) => {
                  return (
                    <>
                      {index > 0 && <Divider type="vertical" key={total} />}
                      <Text key={line + index}>{line}</Text>
                    </>
                  )
                })
              }}
            />
          </Table>
          <VPagination align="right" onPaginationChange={this.handlePaginationChange} total={total} />
        </Card>
      </div>
    )
  }
}

export default connect(null, { changeLoading })(Substations2Feeders)
