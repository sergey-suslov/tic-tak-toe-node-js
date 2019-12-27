import React from 'react'
import './box.less'
import {Icon} from 'antd'

export default function (props) {
  const {onClick, value} = props
  return (
    <div className="game-box" onClick={onClick}>
      {value === 1 ? <Icon type="close" style={{fontSize: 24}} /> : null}
      {value === 2 ? <Icon type="desktop" style={{fontSize: 24}} /> : null}
    </div>
  )
}
