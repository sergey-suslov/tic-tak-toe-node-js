import React, { Component } from 'react'
import { Spin } from 'antd'

import './user-profile-service.less'

export default class RefreshTokenService extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fetched: !!props.profile
    }
  }

  componentDidMount() {
    const { getProfile } = this.props
    const { fetched } = this.state
    console.log('profile', fetched)
    if (!fetched) {
      getProfile()
    }
  }

  render() {
    const { children, profile } = this.props
    const { fetched } = this.state
    return (
      fetched || profile ? children : <Spin spinning size="large" className="spin-absolute-center" />
    )
  }
}
