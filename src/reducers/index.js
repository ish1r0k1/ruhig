import { combineReducers } from 'redux'
import configure from './configure'
import information from './information'

const rootReducer = combineReducers({
  configure,
  information
})

export default rootReducer
