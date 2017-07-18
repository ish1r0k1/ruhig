import * as types from '../constants/ActionTypes'

export const enableDoujinMode = () => ({
  type: types.ENABLE_DOUJIN_MODE
})

export const disableDoujinMode = () => ({
  type: types.DISABLE_DOUJIN_MODE
})

export const updateText = (releaseStatus, releaseDate, artistName, title, notes) => ({
  type: types.UPDATE_TEXT,
  releaseStatus, releaseDate, artistName, title, notes
})

export const updateJacket = (jacketSrc) => ({
  type: types.UPDATE_JACKET,
  jacketSrc
})
