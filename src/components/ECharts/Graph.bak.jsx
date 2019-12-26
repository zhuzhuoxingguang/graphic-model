import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import ReactEchartsCore from "echarts-for-react/lib/core"
import echarts from "echarts/lib/echarts"
import "echarts/lib/chart/graph"
import "echarts/lib/component/legend"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/title"
import "zrender/lib/svg/svg"

let myCharts = null

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
/* const optionInitial = {
  tooltip: {},
  legend: {
    data: []
  },
  grid: {
    top: 30
  },
  animationDuration: 1500,
  animationEasingUpdate: "quinticInOut",
  series: {
    type: "graph",
    layout: "force",
    roam: true,
    zoom: 5,
    focusNodeAdjacency: true,
    itemStyle: {
      normal: {
        borderColor: "#fff",
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.3)"
      }
    },
    label: {
      position: "right",
      formatter: "{b}"
    },
    lineStyle: {
      color: "source",
      width: 3,
      curveness: 0.5
    },
    force: {
      repulsion: 30
    },
    emphasis: {
      lineStyle: {
        width: 8
      }
    },
    links: [
      {
        source: "PD_30000000_3144681",
        target: "PD_10000100_159009"
      },
      {
        source: "PD_10000100_159009",
        target: "PD_30700002_3122793",
        label: "102东镇线前置#1环网柜102联络"
      },
      {
        source: "PD_30700002_3122793",
        target: "PD_10000100_165905",
        label: "10kV东镇线135"
      },
      {
        source: "PD_30000000_3144681",
        target: "PD_10000100_160481"
      },
      {
        source: "PD_30000000_3144681",
        target: "PD_10000100_161137"
      },
      {
        source: "PD_30000000_3144681",
        target: "PD_10000100_602337"
      },
      {
        source: "PD_30000000_3144681",
        target: "PD_10000100_161985"
      },
      {
        source: "PD_30000000_3144681",
        target: "PD_10000100_40097"
      }
    ],
    nodes: [
      {
        attributes: {
          modularity_class: 0
        },
        category: 0,
        draggable: true,
        id: "PD_30000000_3144681",
        itemStyle: null,
        name: "淳东变",
        symbolSize: 50,
        label: {
          normal: {
            show: true
          }
        }
      },
      {
        attributes: {
          modularity_class: 1
        },
        category: 1,
        draggable: true,
        id: "PD_10000100_159009",
        itemStyle: null,
        name: "东游线131",
        symbolSize: 30
      },
      {
        attributes: {
          modularity_class: 2
        },
        category: 2,
        draggable: true,
        id: "PD_30700002_3122793",
        itemStyle: null,
        name: "102东镇线前置#1环网柜102联络",
        symbolSize: 10
      },
      {
        attributes: {
          modularity_class: 1
        },
        category: 1,
        draggable: true,
        id: "PD_10000100_160481",
        itemStyle: null,
        name: "老庄山线122",
        symbolSize: 30
      },
      {
        attributes: {
          modularity_class: 1
        },
        category: 1,
        draggable: true,
        id: "PD_10000100_161137",
        itemStyle: null,
        name: "沛桥线123",
        symbolSize: 30
      },
      {
        attributes: {
          modularity_class: 1
        },
        category: 1,
        draggable: true,
        id: "PD_10000100_602337",
        itemStyle: null,
        name: "童家线113",
        symbolSize: 30
      },
      {
        attributes: {
          modularity_class: 1
        },
        category: 1,
        draggable: true,
        id: "PD_10000100_161985",
        itemStyle: null,
        name: "双望线121",
        symbolSize: 30
      },
      {
        attributes: {
          modularity_class: 1
        },
        category: 1,
        draggable: true,
        id: "PD_10000100_40097",
        itemStyle: null,
        name: "银杏线116",
        symbolSize: 30
      }
    ]
  }
} */

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
          allLink[
            `${inter.equipment.rdfID}-${inter.interconnectionFeeder.rdfID}`
          ] == null &&
          feeder.rdfID !== inter.interconnectionFeeder.rdfID
        ) {
          links.push({
            source: inter.equipment.rdfID,
            target: inter.interconnectionFeeder.rdfID,
            label: inter.interconnectionFeeder.name
          })

          allLink[
            `${inter.interconnectionFeeder.rdfID}-${inter.equipment.rdfID}`
          ] = 1
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
  const { dataSource } = props

  const [options, setOptions] = useState(optionInitial)
  useEffect(() => {
    const { links, nodes } = handleData(dataSource)
    console.log(refEcharts)
    if (!myCharts) {
      myCharts = echarts.init(refEcharts.current, null, { renderer: "svg" })
    }
    options.series.links = links
    options.series.data = nodes
    myCharts.setOption({ ...options }, true, true)
    console.log("------", options)
    setOptions(options)
    return () => {
      myCharts.clear()
      myCharts = null
    }
  }, [dataSource, options])
  return <div ref={refEcharts} style={{ height: 400 }}></div>
}
