import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Table } from "antd"
import VTable from "../VTable"

const { Column } = Table
const a = [
  { key: "rdfID", title: "rdfID" },
  { key: "name", title: "设备名称" },
  { key: "clazzName", title: "设备类型" },
  { key: "substationName", title: "变电站" },
  { key: "switchStationName", title: "配电站" },
  { key: "feederName", title: "馈线" },
  { key: "feederID", title: "馈线ID" }
]
const SimpleTable = props => {
  const { dataSource, extra } = props
  const [columns, setColumns] = useState([])

  useEffect(() => {
    setColumns(a)
    if (extra) {
      let b = [...a]
      extra.forEach((item, i) => {
        const { index } = item
        b.splice(index + i, 0, item)
      })
      setColumns(b)
    }
  }, [extra])

  // console.log("columns", columns)

  return (
    <VTable dataSource={dataSource} rowKey={record => record.rdfID + record.voltage + record.name}>
      {columns.map(node => {
        return <Column dataIndex={node.key} key={node.key} title={node.title} width={100} />
      })}
    </VTable>
  )
}

SimpleTable.propTypes = {
  dataSource: PropTypes.array.isRequired
}

export default SimpleTable

// width={["rdfID", "feederID"].includes(node.key) ? 120 : "auto"}
