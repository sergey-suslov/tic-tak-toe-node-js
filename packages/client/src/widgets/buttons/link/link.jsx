import React from 'react'
import classnames from 'classnames'
import { Button } from 'antd'
import './link.less'

export default props => <Button { ...props } className={classnames(['link-button', props.inline ? 'inline-link-button' : '', props.className])} type="link">
  {props.children}
</Button>