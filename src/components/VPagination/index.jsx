/* eslint-disable space-before-function-paren */
import React, { Component } from 'react'
import { Pagination } from 'antd'

class VPagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1
    }
  }

  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize)
    // this.setState({ current: 1 })
    this.props.onPaginationChange(current, pageSize)
  }

  handlePageChange = (page, pageSize) => {
    console.log(page, pageSize)
    this.props.onPaginationChange(page, pageSize)
  }

  render () {
    const { align = 'left', total = 100 } = this.props
    return (
      <div className='v-pagination' align={align}>
        <Pagination
          showQuickJumper
          showSizeChanger
          onShowSizeChange={this.props.onPaginationChange}
          onChange={this.props.onPaginationChange}
          total={total}
        />
      </div>
    )
  }
}

export default VPagination
