import {
  SET_CATEGORIES
} from '../actions'

export default function categories (state = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}