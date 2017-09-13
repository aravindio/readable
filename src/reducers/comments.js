import {
  SET_COMMENTS,
  SET_DEFAULT_COMMENTS_SORT,
  SORT_COMMENTS,
  VOTE_COMMENT
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
    case SORT_COMMENTS:
      return {
        ...state,
        defaultSort: action.option
      }
    case VOTE_COMMENT:
      const { vCommentid, vParentId, vOption } = action
      return {
        ...state,
        comments: {
          ...state.comments,
          [vParentId]: [ ...state.comments[vParentId] ].map(c => {
            if (c.id === vCommentid) {
              if (vOption === 'upVote') {
                return { ...c, voteScore: c.voteScore + 1}
              } else if (vOption === 'downVote') {
                return { ...c, voteScore: c.voteScore - 1}
              }
            }
            return c
          })
        }
      }
    default:
      return state
  }
}