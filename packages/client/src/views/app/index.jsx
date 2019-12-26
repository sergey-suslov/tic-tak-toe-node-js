import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Dashboard from '../dashboard'
import Game from '../game'
import Profile from '../profile'
import RefreshTokenService from '../wrappers/refresh-token-service'
import UserProfileService from '../wrappers/user-profile-service'
import PrivateRoute from '../routing/private-route'
import UserAppbar from '../../views/appbars/user-appbar'

export default () => (
  <RefreshTokenService>
    <UserProfileService>
      <DndProvider backend={HTML5Backend}>
        <UserAppbar />
        <PrivateRoute
          component={() => (
            <Switch>
              <Route path="/app/profile/:profileId" render={Profile} />
              <Route path="/app/play" render={Game} />
              <Route path="/app" render={Dashboard} />
            </Switch>
          )}
        />
      </DndProvider>
    </UserProfileService>
  </RefreshTokenService>
)
