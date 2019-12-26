import React from 'react'
import { Button } from 'antd'
import './default-button.less'

export default props => <Button className="default-button" shape="round" type="primary" { ...props }>
  {props.children}
</Button>