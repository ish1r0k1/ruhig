import {
  UPDATE_TEXT,
  UPDATE_JACKET
} from '../constants/ActionTypes'

const initialState = {}

const information = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TEXT: {
      const { releaseStatus, releaseDate, artistName, title, notes } = action

      return Object.assign({}, state, { releaseStatus, releaseDate, artistName, title, notes })
    }
    case UPDATE_JACKET: {
      const { jacketSrc } = action

      return Object.assign({}, state, { jacketSrc })
    }
    default:
      return state
  }
}

export default information
