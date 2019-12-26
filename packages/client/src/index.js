import React from 'react'
import ReactDOM from 'react-dom'
import './app/index.css'
import store from './store'
import App from './app/App'
import * as serviceWorker from './app/serviceWorker'

ReactDOM.render(<App store={store} />, document.getElementById('root'))

serviceWorker.unregister()
