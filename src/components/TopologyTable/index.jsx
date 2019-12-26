import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Table } from "antd"
import VTable from "../VTable"

const { Column } = Table

const TopologyTable = props => {
  const { dataSource } = props
  console.log(dataSource)
  const [columns] = useState([
    { key: "rdfID", title: "rdfID" },
    { key: "name", title: "设备名称" },
    { key: "clazzName", title: "设备类型" },
    { key: "substationName", title: "变电站" },
    { key: "switchStationName", title: "配电站" },
    { key: "feederName", title: "馈线" },
    { key: "feederID", title: "馈线ID" }
  ])
  return (
    <VTable dataSource={dataSource} rowKey="rdfID">
      {columns.map(node => {
        return <Column dataIndex={node.key} key={node.key} title={node.title} width={100} />
      })}
    </VTable>
  )
}

TopologyTable.propTypes = {
  dataSource: PropTypes.array.isRequired
}

export default TopologyTable

// width={["rdfID", "feederID"].includes(node.key) ? 120 : "auto"}
