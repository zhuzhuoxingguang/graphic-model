/* eslint-disable template-curly-spacing */
import React, { Component } from 'react'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend
} from 'bizcharts'
import DataSet from '@antv/data-set'

class Curved extends Component {
  render () {
    let { data = [], x = [] } = this.props
    data = data.map(item => {
      const obj = { name: item.name }
      x.forEach((y, i) => {
        obj[y] = item.values[i]
      })
      return obj
    })
    // console.log('========', data)
    const ds = new DataSet()
    const dv = ds.createView().source(data)
    dv.transform({
      type: 'fold',
      fields: [...x],
      // 展开字段集
      key: 'x',
      // key字段
      value: 'y' // value字段
    })
    return (
      <div>
        <Chart height={400} data={dv} forceFit scale={{ x: { range: [0, 1] } }} padding='auto'>
          <Axis name='x' />
          <Axis name='y' />
          <Legend position='top' marker='bowtie' />
          <Tooltip
            crosshairs={{
              type: 'y'
            }}
          />
          <Geom
            type='line'
            shape='smooth'
            position='x*y'
            color='name'
          />
          <Geom
            position='x*y'
            color='name'
            type='point'
            size={4}
            shape='circle'
            style={{
              stroke: '#fff',
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    )
  }
}
export default Curved
