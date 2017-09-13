import {
  SET_POSTS
} from '../actions'

export default function posts (state = {}, action) {
  switch (action.type) {
    case SET_POSTS:
      const { posts } = action
      return {
        ...state,
        posts: posts.filter(p => !p.deleted)
      }
    default:
      return state
  }
}