import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import Routing from '../routing'
import history from '../../services/history'

const Root = (props) => {
  const { store } = props
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="App">
          <Routing />
        </div>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
