import React, { Component } from 'react'
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts'

// 定义度量
const cols = {
  sales: {
    tickInterval: 20
  }
}

class Bar extends Component {
  handlePlotClick = (ev, item) => {
    console.log(ev, item)
  }

  render () {
    const { data = [], height = 320 } = this.props
    return (
      <Chart
        height={height - 30}
        data={data}
        scale={cols}
        forceFit
        padding='auto'
        onPlotClick={this.handlePlotClick}
      >
        <Axis title />
        <Axis title />
        <Legend position='top' dy={-20} />
        <Tooltip />
        <Geom type='interval' position='genre*sold' color='genre' />
      </Chart>
    )
  }
}

export default Bar
