import React, { Component } from 'react'
import { Result } from 'antd'
import './sign-up-result.less'

export default class SignUpResult extends Component {
  render() {
    return (
      <Result
        title="You have been registered!"
        subTitle="Confirm your email with message we have sent to you"
        status="success"
      />
    )
  }
}
