import React, {Fragment} from 'react'
import { Route, Switch } from 'react-router-dom'
import SignIn from '../sign-in'
import SignUp from '../sign-up'
import SignUpResult from '../sign-up-result'
import ServerIsUnavailable from '../500'
import Landing from '../landing'
import PublicAppbar from '../appbars/public-appbar'

export default () => (
  <Fragment>
    <PublicAppbar />
    <Switch>
      <Route path="/500" render={ServerIsUnavailable} />
      <Route path="/sign-up" render={SignUp} />
      <Route path="/sign-in" render={SignIn} />
      <Route path="/sign-up-result" render={SignUpResult} />
      <Route render={Landing} />
    </Switch>
  </Fragment>
)
