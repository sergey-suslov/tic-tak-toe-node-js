import React, { Component } from 'react'
import { Result } from 'antd'
import './500.less'

export default class SignUpConfirm extends Component {
  render() {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, server is unavaileable. Try again later"
      />
    )
  }
}
