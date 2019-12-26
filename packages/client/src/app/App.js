import React, { Component } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import Routing from '../views/routing'
import history from '../services/history'
import './App.css'
import './App.less'

class App extends Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={ store }>
        <ConnectedRouter history={history}>
          <div className="App">
            <Routing />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App