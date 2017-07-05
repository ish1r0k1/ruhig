import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const middleware = [promiseMiddleware]

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )

  return store
}
