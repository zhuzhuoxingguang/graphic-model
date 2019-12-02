import React, { Component } from 'react'
import PropTypes from 'prop-types'

class VText extends Component {
  static propTypes = {
    type: PropTypes.string
  }

  render () {
    const { type = 'primary' } = this.props
    return (
      <span type={type} className='v-text'>
        {this.props.children}
      </span>
    )
  }
}

class VTextGroup extends Component {
  render () {
    return (
      <div className='v-text-group'>
        {
          this.props.children
        }
      </div>
    )
  }
}
VText.VTextGroup = VTextGroup
export default VText
