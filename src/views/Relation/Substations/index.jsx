/* eslint-disable template-curly-spacing */
import React, { Component, createRef } from "react"
import { Card, Layout, Tree, Input, Divider, Spin, Modal } from "antd"
import ReactEcharts from 'echarts-for-react'
import { getSubstations } from "@/api/common"
import { getSubstationsConnections } from "@/api/relations"

const { Sider, Content } = Layout
const { TreeNode } = Tree
const { Search } = Input

const gData = []

const dataList = []
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    const { id, name } = node
    dataList.push({ id, title: name })
    if (node.subRegions && node.subRegions.length) {
      generateList(node.subRegions)
    } else if (node.substations && node.substations.length) {
      generateList(node.substations)
    }
  }
}
// generateList(gData)

const getParentKey = (key, tree) => {
  console.log("-----------", tree)
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.subRegions && node.subRegions.length) {
      if (node.subRegions.some(item => item.id === key)) {
        parentKey = node.id
      } else if (getParentKey(key, node.subRegions)) {
        parentKey = getParentKey(key, node.subRegions)
      }
    } else if (node.substations && node.substations.length) {
      if (node.substations.some(item => item.id === key)) {
        parentKey = node.id
      } else if (getParentKey(key, node.substations)) {
        parentKey = getParentKey(key, node.substations)
      }
    }
  }
  return parentKey
}

export default class Substations extends Component {
  state = {
    expandedKeys: [],
    searchValue: "",
    autoExpandParent: true,
    substations: [],
    option: {
      tooltip: {},
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
          curveness: .5
        },
        force: {
          repulsion: 30
        },
        emphasis: {
          lineStyle: {
            width: 8
          }
        }
      }
    },
    loading: false
  }

  echartsRef = createRef()
  echartsInstance = null


  getSubstationsConnections = params => {
    this.setState({ loading: true })
    const { option } = this.state
    getSubstationsConnections(params).then(res => {

      // console.log(res, this.echartsInstance)
      const { series: [series] } = res
      const { categories = [], nodes = [], links = [] } = series

      console.log(series)
      option.series = { ...option.series, categories, nodes, links }
      if (params.length > 2) {
        option.series.zoom = 3
      }
      this.setState({ option })
      this.echartsInstance.setOption(option)
    }).finally(() => this.setState({ loading: false }))
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  onSelect = (selectedKeys, info) => {
    console.log("-----selected", selectedKeys, info)
  }
  // 变电站选择 超过两个 给予提示 页面展示不下
  onCheck = (checkedKeys, info) => {
    // console.log("onCheck", checkedKeys, info)
    if (checkedKeys.length > 4) {
      Modal.confirm({
        title: "确认",
        content: '变电站选择过多，会导致页面绘图溢出，且布局拥挤，是否确认继续选择变电站？',
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          this.getSubstationsConnections(checkedKeys)
          console.log("确认继续选择变电站")
        }
      })
    } else {
      this.getSubstationsConnections(checkedKeys)
    }
  }

  onChange = e => {
    const { value } = e.target
    const expandedKeys = dataList
      .map(item => {
        console.log(item)
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.id, this.state.substations)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i)

    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    })
  }

  resetSubstations = substations => {

  }

  getSubstations = () => {
    getSubstations().then(res => {
      console.log("regions:", res)
      this.setState({ substations: [res], expandedKeys: [res.rdfID] })
      generateList([res])
      console.log(dataList)
    })
  }

  renderTreeNode = treeData => {
    return treeData.map(node => {
      if ((!node.subRegions || !node.subRegions.length) && (!node.substations || !node.substations.length)) {
        return <TreeNode title={node.name} key={node.rdfID}></TreeNode>
      }
      return <TreeNode title={node.name} key={node.rdfID} disabled>
        {
          node.substations.length
            ? this.renderTreeNode(node.substations)
            : this.renderTreeNode(node.subRegions)
        }
      </TreeNode>
    })
  }

  componentDidMount () {
    this.getSubstations()
    this.echartsInstance = this.echartsRef.getEchartsInstance()
  }

  render () {
    const { option, substations, expandedKeys, autoExpandParent, loading } = this.state
    return (
      <Card bodyStyle={{ padding: 0 }}>
        <Spin spinning={loading}>
          <Layout style={{ background: "#fff" }}>
            <Sider style={{ background: "#fff", padding: "10px" }}>
              <Search style={{ marginBottom: 8 }} placeholder="请输入变电站名称" onChange={this.onChange} />
              <Tree
                checkable
                expandedKeys={expandedKeys}
                onExpand={this.onExpand}
                autoExpandParent={autoExpandParent}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
              >
                {this.renderTreeNode(substations)}
              </Tree>
            </Sider>
            <Divider
              type="vertical"
              style={{ height: "auto", display: "block", margin: 0 }}
            />
            <Content style={{ background: "#fff", padding: "10px", height: "calc(100vh - 104px)" }}>
              <ReactEcharts
                option={option}
                style={{ height: '100%', width: '100%' }}
                ref={node => this.echartsRef = node}
              />
            </Content>
          </Layout>
        </Spin>
      </Card>
    )
  }
}
