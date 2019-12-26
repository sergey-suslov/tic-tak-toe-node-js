import React, { Component } from 'react'
import { Typography, Form, Spin } from 'antd'
import LinkButton from '../../../widgets/buttons/link-button'
import DefaultInput from '../../../widgets/inputs/default-input'
import PasswordInput from '../../../widgets/inputs/password-input'
import DefaultButton from '../../../widgets/buttons/default-button'
import './sign-in-form.less'

class SignUpForm extends Component {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signIn({
          email: values.email,
          password: values.password
        })
      }
    })
  }

  render() {
    const { history, isSigningIn } = this.props
    const { handleSubmit } = this
    const { getFieldDecorator } = this.props.form
    const goTo = path => () => {history.push(path)}
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please input your email',
                whitespace: true
              },
              {
                message: 'Enter valid email',
                type: 'email'
              }
            ]
          })(<DefaultInput placeholder="Email" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, min: 4, message: 'Please input your password', whitespace: true }]
          })(<PasswordInput placeholder="Password" />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }} className="text-align-center">
          <Spin spinning={isSigningIn}>
            <DefaultButton type="primary" htmlType="submit">
              Sign In
            </DefaultButton>
          </Spin>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }} className="text-align-center">
          <Typography.Text>Don't have an account?</Typography.Text>
          &#160;
          <LinkButton className="primary-color" onClick={goTo('/sign-up')}>
            Sign up
          </LinkButton>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedSignUpForm = Form.create({ name: 'sign_up' })(SignUpForm)

export default WrappedSignUpForm
