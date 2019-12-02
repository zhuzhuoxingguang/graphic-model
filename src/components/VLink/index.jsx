import React, { Component } from 'react'
import PropTypes from 'prop-types'

class VLink extends Component {
  static propTypes = {
    type: PropTypes.string
  }

  handleLinkClick = e => {
    e.preventDefault()
    const { onClick = () => { } } = this.props
    onClick()
  }

  render () {
    const { type = 'primary' } = this.props

    return (
      <a type={type} href='#1' className='v-link' onClick={this.handleLinkClick}>
        {this.props.children}
      </a>
    )
  }
}

class VLinkGroup extends Component {
  render () {
    return (
      <div className='v-link-group'>
        {
          this.props.children
        }
      </div>
    )
  }
}
VLink.VLinkGroup = VLinkGroup
export default VLink
