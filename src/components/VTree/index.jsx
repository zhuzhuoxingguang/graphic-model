import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout
const { SubMenu } = Menu

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
      return (vnode.children && vnode.children.length) ?
        <SubMenu
          key={vnode.key}
          title={
            <span>
              {vnode.icon ? <Icon type={vnode.icon} /> : null}
              <span>{vnode.label}</span>
            </span>
          }
        >
          {
            this.initTreeNode(vnode.children)
          }
        </SubMenu>
        : <Menu.Item key={vnode.key}>{vnode.icon ? <Icon type={vnode.icon} /> : null} {vnode.label}</Menu.Item>
    })
  }

  componentDidMount () {
    // const list = this.handleTreeData(this.state.treeData)
    // console.log(list)
  }

  render () {
    const { width = 220, treeData = [] } = this.props
    this.rootSubmenuKeys = treeData.map(item => item.key)
    return (
      <Sider width={width}>
        <Menu
          onClick={this.handleClick}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          mode='inline'
          className='v-tree'
          style={{ height: '100%' }}
          inlineIndent={12}
        >
          {
            this.initTreeNode(treeData)
          }
        </Menu>
      </Sider>
    )
  }
}

export default VTree
