import React, { Component } from 'react'
import { List, Layout, Icon } from 'antd'
const { Sider } = Layout

class ListTree extends Component {
  state = {
    list: [
      { id: 1, name: '金地康城12#箱变', checked: true },
      { id: 2, name: '110母联开关' },
      { id: 3, name: '110母联开关负荷开关' },
      { id: 4, name: '101由明丰线供' },
      { id: 11, name: '金地康城12#箱变' },
      { id: 12, name: '110母联开关' },
      { id: 13, name: '110母联开关负荷开关' },
      { id: 14, name: '101由明丰线供' },
      { id: 21, name: '金地康城12#箱变' },
      { id: 22, name: '110母联开关' },
      { id: 23, name: '110母联开关负荷开关' },
      { id: 24, name: '101由明丰线供' },
      { id: 15, name: '金地康城17#箱变' }
    ]
  }

  // list选择设备点击事件
  handleListItemCheck = item => {
    const { list } = this.state
    list.forEach(el => {
      el.checked = false
      if (el.id === item.id) el.checked = true
    })
    this.setState({ list })
  }

  render () {
    const { list } = this.state
    return (
      <Sider style={{ background: '#fff', maxHeight: 'calc(100vh - 195px)', overflow: 'auto' }} width={200}>
        <List
          header={<div><Icon type='unordered-list' /> 选择设备</div>}
          footer={<div />}
          dataSource={list}
          className='list-tree'
          renderItem={item => (
            <List.Item className={item.checked ? 'active' : ''} onClick={() => this.handleListItemCheck(item)}>
              {item.name}
            </List.Item>
          )}
        />
      </Sider>
    )
  }
}
export default ListTree
