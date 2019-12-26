import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Public from '../public'
import App from '../app'

export default () => (
  <Switch>
    <Route path="/app" render={App} />
    <Route path="/" render={Public} />
  </Switch>
)
