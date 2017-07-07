import {
  ENABLE_DOUJIN_MODE,
  DISABLE_DOUJIN_MODE,
  UPDATE_DATA,
  UPDATE_JACKET_DATA
} from '../constants/ActionTypes'

export function enableDoujinMode(mode) {
  return {
    type: ENABLE_DOUJIN_MODE
  }
}

export function disableDoujinMode() {
  return {
    type: DISABLE_DOUJIN_MODE
  }
}

export function updateData(dataObject) {
  return {
    type: UPDATE_DATA,
    dataObject
  }
}

export function updateJacketData(imageSrc) {
  return {
    type: UPDATE_JACKET_DATA,
    imageSrc
  }
}
