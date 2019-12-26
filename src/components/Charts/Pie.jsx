import React, { Component } from "react"
import { Chart, Geom, Axis, Tooltip, Legend, Label, Coord, Guide } from "bizcharts"
import DataSet from "@antv/data-set"
const { DataView } = DataSet
const { Html } = Guide

// 定义度量
const cols = {
  sales: {
    tickInterval: 20
  }
}

class Bar extends Component {
  handlePlotClick = (ev, item) => {
    // console.log(ev, item)
  }

  render() {
    const { data = [], height = 320 } = this.props
    // console.log(data)
    const dv = new DataView()
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    })
    return (
      <Chart
        height={height - 30}
        data={dv}
        scale={cols}
        forceFit
        padding="auto"
        onPlotClick={this.handlePlotClick}
      >
        <Coord type="theta" radius={0.75} innerRadius={0.6} />
        <Axis name="percent" />
        <Legend position="top" dy={-20} />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Guide>
          <Html
            position={["50%", "50%"]}
            html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">主机<br><span style="color:#262626;font-size:2.5em">200</span>台</div>'
            alignX="middle"
            alignY="middle"
          />
        </Guide>
        <Geom
          type="intervalStack"
          position="percent"
          color="item"
          tooltip={[
            "item*percent",
            (item, percent) => {
              percent = percent * 100 + "%"
              return {
                name: item,
                value: percent
              }
            }
          ]}
          style={{
            lineWidth: 1,
            stroke: "#fff"
          }}
        >
          <Label
            content="percent"
            formatter={(val, item) => {
              return item.point.item + ": " + val * 100 + "%"
            }}
          />
        </Geom>
      </Chart>
    )
  }
}

export default Bar
