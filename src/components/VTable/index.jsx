import React from "react"
import { Table } from "antd"
import PropTypes from "prop-types"

const VTable = props => {
  const { dataSource, children, rowKey } = props
  // const [list, setList] = useState([])

  // useEffect(() => {}, [dataSource])

  return (
    <Table dataSource={dataSource} bordered rowKey={rowKey} pagination={{ hideOnSinglePage: true }}>
      {children}
    </Table>
  )
}

VTable.propTypes = {
  children: PropTypes.node,
  dataSource: PropTypes.array.isRequired,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
}

export default VTable
