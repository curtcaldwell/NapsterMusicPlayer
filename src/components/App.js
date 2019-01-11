import React from 'react'
import { Router } from '@reach/router'
import { Provider } from 'react-redux'
import { Map as IMap } from 'immutable'

import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import './App.css'

import { isBrowser } from '../utils/isbrowser'

import Home from './Home'

import reducers from '../reducers'

import { AppContext } from '../context/app'

const composeEnhancers = (
  process.env.NODE_ENV === 'development' &&
  isBrowser &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose

const configureStore = (initialState = new IMap()) => {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  )

  return store
}

const store = configureStore()

const App = () => (
  <Provider
    store={store}
    context={AppContext}
  >
    <Router>
      <Home path='/' />
    </Router>
  </Provider>
)

export default App
