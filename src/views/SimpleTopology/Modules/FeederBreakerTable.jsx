import React from "react"
import { Table } from "antd"
const { Column } = Table

export default props => {
  const { data = [] } = props
  return (
    <Table dataSource={data} pagination={false}>
      <Column title="区域" dataIndex="name" key="name" />
      <Column title="变电站" dataIndex="substation" key="substation" />
      <Column title="设备" dataIndex="device" key="device" />
    </Table>
  )
}
