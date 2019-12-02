/* eslint-disable template-curly-spacing */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Breadcrumb } from 'antd'
import { collapseNavMenu } from '@/store/actions/constant'

class PageHeader extends Component {
  handleFoldMenu = () => {
    this.props.collapseNavMenu()
  }

  render () {
    const { isCollapse, breads } = this.props
    return (
      <header className='page-header'>
        <Icon type={`menu-${ isCollapse ? 'un' : '' }fold`} onClick={this.handleFoldMenu} style={{ color: '#fff' }} />
        <Breadcrumb className='breadcrumb'>
          {
            breads.map(item => {
              return (<Breadcrumb.Item key='item.name'>{item.name}</Breadcrumb.Item>)
            })
          }
        </Breadcrumb>
      </header>
    )
  }
}
function mapStateToProps ({ constant }) {
  return {
    breads: constant.breads,
    isCollapse: constant.isCollapse
  }
}
export default connect(mapStateToProps, { collapseNavMenu })(PageHeader)
