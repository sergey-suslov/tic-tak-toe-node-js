import React, { Component } from 'react'
import { Row, Col, Typography } from 'antd'
import TweenOne from 'rc-tween-one'
import SignUpForm from './sign-in-form'
import './sign-in.less'

export default class SignUp extends Component {
  render() {
    return (
      <div className="sign-in-container">
        <Row justify="center" align="middle">
          <Col xs={{ span: 22, offset: 1 }} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }}>
            <TweenOne
              animation={[
                {
                  y: -20,
                  opacity: 0,
                  duration: 0
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 550
                }
              ]}
              component={() => (
                <Typography.Title className="sign-in-title" level={1}>
                  Sign In
                </Typography.Title>
              )}
            />
          </Col>
        </Row>
        <Row justify="center" align="middle">
          <Col xs={{ span: 22, offset: 1 }} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }}>
            <TweenOne
              animation={[
                {
                  y: 44,
                  opacity: 0,
                  duration: 0
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 550
                }
              ]}
              component={SignUpForm}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
