import React, { PureComponent } from "react"
import { getSubstations } from "@/api/common"
import { Tree, Input, Modal } from "antd"
const { TreeNode } = Tree
const { Search } = Input

const dataList = []

// 展开所有数据
const generateList = data => {
  data.forEach(node => {
    const { children } = node
    dataList.push({ ...node })
    if (children && children.length) {
      generateList(children)
    }
  })
}

const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children && node.children.length) {
      // console.log(node)
      if (node.children.some(item => item.id === key)) {
        parentKey = node.id
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(parentKey, node.children)
        // console.log("获取到直接父级的parentKey", parentKey)
      }
    }
  }
  return parentKey
}

const regenerateSubstations = data => {
  return data.map(node => {
    const { rdfID, name, substations, subRegions } = node
    const children = ((subRegions && subRegions.length) ? subRegions : substations) || []
    return {
      id: rdfID,
      title: name,
      children: regenerateSubstations(children)
    }
  })
}

export default class TreeSubstations extends PureComponent {
  state = {
    expandedKeys: [],
    searchValue: "",
    autoExpandParent: true,
    substations: []
  }

  getSubstations = () => {
    getSubstations().then(res => {
      const substations = regenerateSubstations([res])
      this.setState({ substations, expandedKeys: [res.rdfID] })
      generateList(substations)
      console.log("初始化数据", dataList)
    })
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
          this.props.onGetConnections(checkedKeys)
          console.log("确认继续选择变电站")
        }
      })
    } else {
      this.props.onGetConnections(checkedKeys)
    }
  }

  // 树节点搜索框输入渲染
  onSearch = value => {
    const { id } = dataList[0]
    if (value === "") {
      this.setState({
        expandedKeys: [id],
        searchValue: value,
        autoExpandParent: true
      })
      return
    }

    // 非搜索关键词的最终解决方案，但是适合当前的应用
    const expandedKeys = dataList.map(item => {
      let { title } = item
      if (title.indexOf(value) > -1) {
        return getParentKey(item.id, dataList)
      }
      return null
    }).filter((item, i, self) => item && self.indexOf(item) === i)
    this.setState({
      expandedKeys: [id, ...expandedKeys],
      searchValue: value,
      autoExpandParent: true
    })
  }

  componentDidMount () {
    this.getSubstations()
  }

  // 树节点渲染
  renderTreeNode = treeData => {
    const { searchValue } = this.state
    return treeData.map(item => {
      const index = item.title.indexOf(searchValue)
      const beforeStr = item.title.substr(0, index)
      const afterStr = item.title.substr(index + searchValue.length)
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
            <span>{item.title}</span>
          )
      if (item.children && item.children.length) {
        return (
          <TreeNode key={item.id} title={title} disabled>
            {this.renderTreeNode(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.id} title={title} />
    })


    // return treeData.map(node => {
    //   if (!node.children || !node.children.length) {
    //     return <TreeNode title={node.title} key={node.id}></TreeNode>
    //   }
    //   return <TreeNode title={node.title} key={node.id} disabled>
    //     {
    //       this.renderTreeNode(node.children)
    //     }
    //   </TreeNode>
    // })
  }

  render () {
    const { substations, expandedKeys, autoExpandParent } = this.state
    return (
      <>
        <Search
          style={{ marginBottom: 8 }}
          placeholder="请输入变电站名称"
          onSearch={this.onSearch}
          allowClear
        />
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
      </>
    )
  }
}