import React, { Component } from 'react'
import TweenOne from 'rc-tween-one'
import { Row, Col, Typography } from 'antd'
import DefaultButton from '../../../widgets/buttons/default-button'
import LinkButton from '../../../widgets/buttons/link-button'
import './public-appbar.less'

export default class PublicAppbar extends Component {
  componentDidMount() {
    console.log('mounted')
  }

  render() {
    const { history } = this.props
    const goTo = path => () => {
      history.push(path)
    }
    return (
      <div>
        <TweenOne
          animation={[
            {
              y: -44,
              opacity: 0,
              duration: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 500
            }
          ]}
          component={() => (
            <Row className='public-appbar' justify='space-between'>
              <Col xs={24} md={4}>
                <Typography.Title level={3} className='app-title'>
                  Tic-tac-toe
                </Typography.Title>
              </Col>
              <Col xs={24} md={20}>
                <Row gutter={40}>
                  <Col md={{ span: 4, offset: 16 }} lg={{ span: 4, offset: 18 }}>
                    <LinkButton onClick={goTo('/play-anonymously')}>Play anonymously</LinkButton>
                  </Col>
                  <Col md={4} lg={2}>
                    <DefaultButton onClick={goTo('/sign-in')}>Sign In</DefaultButton>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        />
      </div>
    )
  }
}
