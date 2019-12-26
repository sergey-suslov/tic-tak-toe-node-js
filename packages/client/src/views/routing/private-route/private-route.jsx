import React from 'react'
import { Route, Redirect } from 'react-router-dom'


export default ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        rest.isSignedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}