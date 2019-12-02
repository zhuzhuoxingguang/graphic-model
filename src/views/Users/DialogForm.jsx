import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

class ModalUser extends Component {
  static propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
  }

  render () {
    const { title = '提示', visible = false, onOk = () => { }, onCancel = () => { } } = this.props
    return (
      <Modal
        centered
        title={title}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        {this.props.children}
      </Modal>
    )
  }
}
export default ModalUser
