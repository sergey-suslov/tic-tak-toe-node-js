import React, { Component } from 'react'
import { Typography } from 'antd'
import './dashboard.less'
import History from './history'

export default class Dashboard extends Component {

  render() {
    return (
      <div className='dashboard-container'>
        <Typography.Title>
          History
        </Typography.Title>
        <History />
      </div>
    )
  }
}
