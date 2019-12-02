import React, { Component } from 'react'
import { Card } from 'antd'

class Feeders extends Component {
  state = {
    name: 'test'
  }

  render () {
    const { name } = this.state
    return (
      <Card bodyStyle={{ minHeight: 'calc(100vh - 152px)' }}>
        {`馈线联络${ name }`}
      </Card>
    )
  }
}
export default Feeders
