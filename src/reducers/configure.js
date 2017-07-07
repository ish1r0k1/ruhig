import {
  ENABLE_DOUJIN_MODE,
  DISABLE_DOUJIN_MODE,
  UPDATE_DATA,
  UPDATE_JACKET_DATA
} from '../constants/ActionTypes'

export default function configure(state = {
  modeDoujin: false,
  data: {}
}, action) {
  let data

  switch (action.type) {
    case ENABLE_DOUJIN_MODE:
      return Object.assign({}, state, {
        modeDoujin: true
      })
    case DISABLE_DOUJIN_MODE:
      return Object.assign({}, state, {
        modeDoujin: false
      })
    case UPDATE_DATA:
      const { releaseStatus, releaseDate, artistName, title, notes } = action.dataObject
      data = Object.assign({}, state.data, { releaseStatus, releaseDate, artistName, title, notes })

      return Object.assign({}, state, { data })
    case UPDATE_JACKET_DATA:
      const { imageSrc } = action
      data = Object.assign({}, state.data, { imageSrc })

      return Object.assign({}, state, { data })
    default:
      return state
  }
}
