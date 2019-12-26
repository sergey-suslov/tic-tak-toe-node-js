import React, { Component } from 'react'
import { Spin } from 'antd'

import config from '../../../config'
import './refresh-token-service.less'

export default class RefreshTokenService extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshed: false
    }
  }

  componentDidMount() {
    const { setUserSignedIn } = this.props
    const lastRefreshed = localStorage.getItem('refreshedAt')
    if (!lastRefreshed)
      return this.refreshToken()
    const refreshedAtDate = new Date(lastRefreshed)
    if (Date.now() - refreshedAtDate.getTime() > config.defaultTime.maxRefreshTokenDelay)
      return this.refreshToken()
    setUserSignedIn()
    this.setState({
      refreshed: true
    })
  }

  refreshToken() {
    this.props.refreshToken()
  }

  render() {
    const { children, isSignedIn } = this.props
    const { refreshed } = this.state
    return (
      refreshed || isSignedIn ? children : <Spin spinning size="large" className="spin-absolute-center" />
    )
  }
}
