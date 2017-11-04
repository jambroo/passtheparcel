import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import { fetchNodeState } from './actions'

const loggerMiddleware = createLogger()

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

store
  .dispatch(fetchNodeState('eu-west-1'))
  .then(() => {
    return store.dispatch(fetchNodeState('us-east-1'))
  })
  .then(() => {
    return store.dispatch(fetchNodeState('ap-southeast-2'))
  })

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
