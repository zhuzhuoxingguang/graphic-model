import React, { Component } from "react"
import { Layout, Menu, Icon } from "antd"
const { Sider } = Layout
const { SubMenu } = Menu

const flatTrees = []

const flatTreeData = arr => {
  arr.forEach(item => {
    if (flatTrees.some(t => t.key === item.key)) return
    if (!item.children || !item.children.length) return flatTrees.push(item)
    flatTreeData(item.children)
  })
}

class VTree extends Component {
  state = {
    openKeys: []
  }

  rootSubmenuKeys = []

  // 只保持一个菜单项展开
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  }

  // 递归调用传过来的数据结构，生成树形图
  initTreeNode = arr => {
    if (!arr || !arr.length) return null
    return arr.map(vnode => {
      // ? 放在行头 报close tag的错误
      // eslint-disable-next-line operator-linebreak
      return vnode.children && vnode.children.length ? (
        <SubMenu
          key={vnode.key}
          title={
            <span>
              {vnode.icon ? <Icon type={vnode.icon} /> : null}
              <span>{vnode.label}</span>
            </span>
          }
        >
          {this.initTreeNode(vnode.children)}
        </SubMenu>
      ) : (
        <Menu.Item key={vnode.key}>
          {vnode.icon ? <Icon type={vnode.icon} /> : null} {vnode.label}
        </Menu.Item>
      )
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { treeData } = nextProps
    if (JSON.stringify(treeData) !== JSON.stringify(prevState.treeData)) {
      // console.log(treeData)
      flatTreeData(treeData)
      return {
        ...prevState,
        treeData: flatTrees
      }
    }
    return null
  }

  componentDidUpdate() {
    // const list = this.handleTreeData(this.state.treeData)
    // console.log("====", this.rootSubmenuKeys)
  }

  handleClick = ({ keyPath, key }) => {
    // console.log(this.state)
    const { onClick = () => {} } = this.props
    const { treeData } = this.state
    const target = treeData.find(node => node.key === key)
    // console.log("target", target)
    onClick(target)
  }

  render() {
    const { width = 220, treeData = [] } = this.props
    // this.rootSubmenuKeys = flatTrees.map(item => item.key)
    return (
      <Sider width={width}>
        <Menu
          onClick={this.handleClick}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          mode="inline"
          className="v-tree"
          style={{ height: "100%" }}
          inlineIndent={12}
        >
          {this.initTreeNode(treeData)}
        </Menu>
      </Sider>
    )
  }
}

export default VTree
