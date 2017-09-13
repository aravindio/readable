import {
  SET_POSTS,
  SET_DEFAULT_POSTS_SORT
} from '../actions'

export default function posts (state = {}, action) {
  switch (action.type) {
    case SET_POSTS:
      const { posts } = action
      return {
        ...state,
        posts: posts.filter(p => !p.deleted)
      }
    case SET_DEFAULT_POSTS_SORT:
      return { ...state, defaultSort: 'voteScore' }
    default:
      return state
  }
}