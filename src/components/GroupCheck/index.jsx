import React, { Component } from 'react'
import { Icon } from 'antd'

class GroupCheck extends Component {
  state = {
    substations: [
      { name: '淳东变', id: 100001 },
      { name: '双湖变', id: 100002 },
      { name: '高淳变', id: 100003 },
      { name: '城北变', id: 100004 },
      { name: '城东变', id: 100005 },
      { name: '桠溪变', id: 100006 },
      { name: '游子山变', id: 100007 },
      { name: '东坝变', id: 100008 },
      { name: '薛城变', id: 100009 },
      { name: '秀山变', id: 100010 },
      { name: '西舍变', id: 100011 },
      { name: '双牌石变', id: 100012 },
      { name: '沧溪变', id: 100013 },
      { name: '凤山变', id: 100014 },
      { name: '定埠变', id: 100015 },
      { name: '松园变', id: 100016 },
      { name: '秦仙变', id: 100017 },
      { name: '狮树变', id: 100018 },
      { name: '松溪变', id: 100019 }
    ],
    isExpand: false,
    isCheckAll: false
  }

  handleFoldGroups = e => {
    e.preventDefault()
    this.setState({ isExpand: !this.state.isExpand })
  }

  // 全部 选择事件
  handleCheckAll = () => {
    const { isCheckAll, substations } = this.state
    substations.forEach(substation => {
      substation.checked = !isCheckAll
    })
    this.setState({ isCheckAll: !isCheckAll, substations })
  }

  // toggle当前选项
  handleCheckCurrent = id => {
    const { substations } = this.state
    const substation = substations.find(item => item.id === id)
    substation.checked = !substation.checked
    const isCheckAll = substations.every(item => item.checked)
    this.setState({ isCheckAll, substations })
  }

  render () {
    const { substations, isExpand, isCheckAll } = this.state
    return (
      <div className='group-checks'>
        <ul className={isExpand ? 'expand' : ''}>
          <li className={isCheckAll ? 'active' : ''} onClick={this.handleCheckAll}>全部</li>
          {
            substations.map(substation => {
              return (
                <li
                  key={substation.id}
                  className={substation.checked ? 'active' : ''}
                  onClick={() => this.handleCheckCurrent(substation.id)}
                >
                  {substation.name}
                </li>
              )
            })
          }
        </ul>
        <a className='fold' href='#2' onClick={this.handleFoldGroups}>
          {isExpand ? '收起' : '展开'}&nbsp;
          <Icon type={isExpand ? 'up' : 'down'} />
        </a>
      </div>
    )
  }
}

export default GroupCheck
