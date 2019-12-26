/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'

// middleware
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import history from '../services/history'

import reducer from './rootReducer'
import rootSaga from './rootSaga'


const saga = createSagaMiddleware()

/* eslint-disable-next-line */
const middleware = process.env.NODE_ENV === 'development'
  ? applyMiddleware(saga, routerMiddleware(history), logger)
  : applyMiddleware(saga, routerMiddleware(history))

/* eslint-disable-next-line */
const store = process.env.NODE_ENV !== 'development' ? createStore(
  reducer,
  compose(middleware),
) : createStore(
  reducer,
  compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
)

saga.run(rootSaga)

/* eslint-disable-next-line */
if (process.env.NODE_ENV === 'development') {
  window.store = store
}

export default store
