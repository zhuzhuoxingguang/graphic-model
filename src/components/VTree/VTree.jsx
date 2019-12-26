import React, { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import { Layout, Menu, Icon } from "antd"

const { Sider } = Layout
const { SubMenu } = Menu

const expandTreeData = (vNodes, targets) => {
  if (!targets) targets = []
  vNodes.forEach(vnode => {
    if (targets.some(target => target.key === vnode.key)) return false
    targets.push(vnode)
    if (vnode.children && vnode.children.length) {
      expandTreeData(vnode.children, targets)
    }
  })
  return targets
}

const VTree = props => {
  const { width = 220, treeData } = props

  // 初始化tree的子节点
  const initTreeNode = useCallback(vnodes => {
    if (!vnodes || !vnodes.length) return null
    return vnodes.map(vnode => {
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
          {initTreeNode(vnode.children)}
        </SubMenu>
      ) : (
        <Menu.Item key={vnode.key}>
          {vnode.icon ? <Icon type={vnode.icon} /> : null} {vnode.label}
        </Menu.Item>
      )
    })
  }, [])

  // 初始化传递过来的数据treeData
  const [trees, setTrees] = useState([])

  useEffect(() => {
    setTrees(treeData)
  }, [treeData])

  // 展开树节点数据
  const [flatTrees, setFlatTrees] = useState([])
  useEffect(() => {
    const trees = expandTreeData(treeData)
      .filter(item => item.children && item.children.length)
      .map(item => item.key)
    setFlatTrees(trees)
  }, [treeData])

  // 节点点击事件
  const handleClick = useCallback(({ key }) => {
    // console.log(key)
  }, [])

  // 设置默认展开项
  const [openKeys, setOpenKeys] = useState([])

  useEffect(() => {}, [])

  // 设置SubMenu展开折叠事件
  const onOpenChange = useCallback(
    keys => {
      // console.log("latestOpenKey:", keys, openKeys)
      const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
      if (flatTrees.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys)
      } else {
        // console.log("keys:", keys, latestOpenKey)

        const list = latestOpenKey ? [latestOpenKey] : []
        setOpenKeys(list)
      }
    },
    [openKeys, flatTrees]
  )

  return (
    <Sider width={width}>
      <Menu
        onClick={handleClick}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        className="v-tree"
        style={{ height: "100%" }}
        inlineIndent={12}
      >
        {initTreeNode(trees)}
      </Menu>
    </Sider>
  )
}

VTree.propTypes = {
  width: PropTypes.number,
  treeData: PropTypes.array
}

export default VTree
