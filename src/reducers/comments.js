import {
  SET_COMMENTS,
  SET_DEFAULT_COMMENTS_SORT
} from '../actions'

export default function comments (state = {}, action) {
  switch (action.type) {
    case SET_COMMENTS:
      const { postId, comments } = action
      const stateComments = Object.assign({}, {
        [postId]: comments.filter(c => !c.deleted)
      })
      return {
        ...state,
        comments: Object.assign({}, { ...state.comments }, stateComments)
      }
    case SET_DEFAULT_COMMENTS_SORT:
      return { ...state, defaultSort: 'voteScore' }
    default:
      return state
  }
}