import React, { Component } from 'react'
import TweenOne from 'rc-tween-one'
import { Row, Col, Typography } from 'antd'
import DefaultButton from '../../../widgets/buttons/default-button'
import LinkButton from '../../../widgets/buttons/link-button'
import './user-appbar.less'

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
                <Typography.Title level={3}>Tic-tac-toe</Typography.Title>
              </Col>
              <Col xs={24} md={18}>
                <Row gutter={40}>
                  <Col md={{ span: 3, offset: 18 }} lg={{ span: 2, offset: 20 }}>
                    <LinkButton onClick={goTo('/app/play')}>Play</LinkButton>
                  </Col>
                  <Col md={3} lg={2}>
                    <DefaultButton onClick={goTo('/app')}>Dashboard</DefaultButton>
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
