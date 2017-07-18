import {
  ENABLE_DOUJIN_MODE,
  DISABLE_DOUJIN_MODE
} from '../constants/ActionTypes'

const initialState = {
  doujinMode: false
}

const configure = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_DOUJIN_MODE:
      return Object.assign({}, state, {
        doujinMode: true
      })
    case DISABLE_DOUJIN_MODE:
      return Object.assign({}, state, {
        doujinMode: false
      })
    default:
      return state
  }
}

export default configure
