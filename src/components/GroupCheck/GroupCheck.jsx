import React, { useState, useEffect, useCallback } from 'react'
import { Icon } from 'antd'

export default props => {
  const { list = [], handleCheck } = props
  const [isExpand, setExpand] = useState(false)
  const [isCheckAll, setCheckAll] = useState(false)
  const [substations, setSubstations] = useState([])

  // 处理全选和取消全选的操作
  const handleCheckAll = useCallback(() => {
    console.log("全选", substations)
    substations.forEach(substation => {
      substation.checked = !isCheckAll
    })
    setCheckAll(!isCheckAll)
    console.log(isCheckAll)
    setSubstations([...substations])
    handleCheck(!isCheckAll)
  }, [substations, isCheckAll, handleCheck])

  // 处理单选和取消单选
  const handleCheckCurrent = useCallback(id => {
    const substation = substations.find(item => item.rdfID === id)
    substation.checked = !substation.checked
    console.log("current check state: ", substation.checked)
    const isCheckAll = substations.every(item => item.checked)
    setCheckAll(isCheckAll)
    setSubstations([...substations])
    handleCheck(substation.checked, id)
  }, [substations, handleCheck])

  // toggle 展开 收起
  const handleFoldGroups = useCallback(e => {
    e.preventDefault()
    setExpand(!isExpand)
  }, [isExpand])

  useEffect(() => {
    console.log(list)
    setSubstations(list)
  }, [list])

  return (
    <div className='group-checks'>
      <ul className={isExpand ? 'expand' : ''}>
        <li className={isCheckAll ? 'active' : ''} onClick={handleCheckAll}>全部</li>
        {
          substations.length
            ? substations.map(substation => {
              return (
                <li
                  key={substation.rdfID}
                  className={substation.checked ? 'active' : ''}
                  onClick={() => handleCheckCurrent(substation.rdfID)}
                >
                  {substation.name}
                </li>
              )
            })
            : "加载中..."
        }
      </ul>
      <a className='fold' href='#2' onClick={handleFoldGroups}>
        {isExpand ? '收起' : '展开'}&nbsp;
          <Icon type={isExpand ? 'up' : 'down'} />
      </a>
    </div>
  )
}