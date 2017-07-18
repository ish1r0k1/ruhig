import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const middleware = [promiseMiddleware]

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )

  return store
}
