import React, { useState, useEffect, useCallback } from "react"
import { List, Layout, Icon } from "antd"
const { Sider } = Layout

export default ({ devices, onHandleItemChange }) => {
  const [list, setList] = useState([])

  const handleListItemCheck = useCallback(
    item => {
      onHandleItemChange(item)
      // 需要rerender树组件，所以生成新的list
      const list = devices.map(el => ({ ...el, checked: el.id === item.id }))
      setList(list)
      // onHandleItemChange(item)
    },
    [devices, onHandleItemChange]
  )

  useEffect(() => {
    // if (devices && devices.length) {
    setList(devices)
    // }
  }, [devices])

  return (
    <Sider
      style={{
        background: "#fff",
        maxHeight: "calc(100vh - 195px)",
        overflow: "auto"
      }}
      width={200}
    >
      <List
        header={
          <div>
            <Icon type="unordered-list" /> 选择设备
          </div>
        }
        footer={<div />}
        dataSource={list}
        className="list-tree"
        renderItem={item => (
          <List.Item className={item.checked ? "active" : ""} onClick={() => handleListItemCheck(item)}>
            {item.name}
          </List.Item>
        )}
      />
    </Sider>
  )
}
