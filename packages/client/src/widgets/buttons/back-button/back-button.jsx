import React from 'react'
import classnames from 'classnames'
import { Button } from 'antd'
import './back-button.less'

export default props => (
  <Button
    {...props}
    className={classnames(['back-button', props.inline ? 'inline-back-button' : '', props.className])}
    type="link"
    icon="arrow-left"
  >
    {props.children}
  </Button>
)
