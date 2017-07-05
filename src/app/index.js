import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import '../stylesheets/style.scss'

import configureStore from './store/configureStore'
import App from './components/App'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
