import React, { useState, useEffect, useRef } from "react"
import ReactEchartsCore from "echarts-for-react/lib/core"
import echarts from "echarts/lib/echarts"
import "echarts/lib/chart/graph"
import "echarts/lib/component/legend"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/title"

const optionInitial = {
  legend: [{ data: ["变电站", "馈线", "联络开关"] }],
  tooltip: {},
  animationDuration: 1500,
  animationEasingUpdate: "quinticInOut",
  series: {
    name: "",
    type: "graph",
    layout: "force",
    data: [
      {
        attributes: { modularity_class: 0 },
        category: 0,
        draggable: true,
        id: "PD_30000000_3146331",
        itemStyle: null,
        name: "桠溪变",
        symbolSize: 50,
        label: { normal: { show: true } }
      },
      {
        attributes: { modularity_class: 1 },
        category: 1,
        draggable: true,
        id: "PD_10000100_106769",
        itemStyle: null,
        name: "桠漆线234",
        symbolSize: 30
      }
    ],
    links: [{ source: "PD_30000000_3146331", target: "PD_10000100_106769" }],
    categories: [{ name: "变电站" }, { name: "馈线" }, { name: "联络开关" }],
    roam: true,
    focusNodeAdjacency: true,
    itemStyle: {
      normal: {
        borderColor: "#fff",
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.3)"
      }
    },
    label: { position: "right", formatter: "{b}" },
    lineStyle: { color: "source", width: 3, curveness: 0.3 },
    force: { repulsion: 100 },
    emphasis: { lineStyle: { width: 10 } }
  }
}

// 数据处理，处理传递过来的数据
const handleData = list => {
  const nodes = [],
    links = [],
    allLink = {},
    equipment = {}

  list.forEach(item => {
    nodes.push({
      attributes: { modularity_class: 0 },
      category: 0,
      draggable: true,
      id: item.rdfID,
      itemStyle: null,
      name: item.name,
      symbolSize: 50,
      label: {
        normal: {
          show: true
        }
      }
    })
    const { feeders = {} } = item
    feeders.forEach(feeder => {
      nodes.push({
        attributes: { modularity_class: 1 },
        category: 1,
        draggable: true,
        id: feeder.rdfID,
        itemStyle: null,
        name: feeder.name.replace("10kV", ""),
        symbolSize: 30
      })

      links.push({
        source: item.rdfID,
        target: feeder.rdfID
      })

      const { interconnections = [] } = feeder
      interconnections.forEach(inter => {
        if (
          equipment[`${inter.equipment.rdfID}`] == null &&
          feeder.rdfID !== inter.interconnectionFeeder.rdfID
        ) {
          nodes.push({
            attributes: { modularity_class: 2 },
            category: 2,
            draggable: true,
            id: inter.equipment.rdfID,
            itemStyle: null,
            name: inter.equipment.name,
            symbolSize: 10
          })
          equipment[`${inter.equipment.rdfID}`] = 1
        }

        if (
          allLink[`${feeder.rdfID}-${inter.equipment.rdfID}`] == null &&
          feeder.rdfID !== inter.interconnectionFeeder.rdfID
        ) {
          links.push({
            source: feeder.rdfID,
            target: inter.equipment.rdfID,
            label: inter.equipment.name
          })
          allLink[`${inter.equipment.rdfID}-${feeder.rdfID}`] = 1
        }

        if (
          allLink[`${inter.equipment.rdfID}-${inter.interconnectionFeeder.rdfID}`] == null &&
          feeder.rdfID !== inter.interconnectionFeeder.rdfID
        ) {
          links.push({
            source: inter.equipment.rdfID,
            target: inter.interconnectionFeeder.rdfID,
            label: inter.interconnectionFeeder.name
          })

          allLink[`${inter.interconnectionFeeder.rdfID}-${inter.equipment.rdfID}`] = 1
        }
      })
    })
  })

  return {
    nodes,
    links
  }
}

export default props => {
  const refEcharts = useRef()
  const { dataSource, height } = props

  const [option, setOption] = useState(optionInitial)

  const [minHeight, setHeight] = useState("calc(100vh - 280px)")
  console.log("datasource", dataSource)
  useEffect(() => {
    const { nodes, links } = handleData(dataSource)
    option.series.data = nodes
    option.series.links = links
    const echartsInstance = refEcharts.current.getEchartsInstance()
    echartsInstance.setOption(option)
    setOption(option)
  }, [dataSource, option])

  useEffect(() => {
    if (height) {
      setHeight(height)
    }
  }, [height])

  return (
    <ReactEchartsCore echarts={echarts} option={option} ref={refEcharts} style={{ minHeight: minHeight }} />
  )
}
