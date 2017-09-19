import {
  SET_COMMENTS,
  SET_DEFAULT_COMMENTS_SORT,
  SORT_COMMENTS,
  VOTE_COMMENT,
  NEW_COMMENT,
  SET_COMMENT_TO_EDIT,
  CLEAR_COMMENT_TO_EDIT,
  UPDATE_COMMENT,
  REMOVE_COMMENT
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
    case NEW_COMMENT:
      const { nParentId, nComment } = action
      return {
        ...state,
        comments: {
          ...state.comments,
          [nParentId]: [ ...state.comments[nParentId] ].concat([ nComment ])
        }
      }
    case SET_COMMENT_TO_EDIT:
      const { comment } = action
      return { ...state, commentToEdit: comment }
    case CLEAR_COMMENT_TO_EDIT:
      return { ...state, commentToEdit: null }
    case UPDATE_COMMENT:
      const { uParentId, uComment } = action
      return {
        ...state,
        comments: {
          ...state.comments,
          [uParentId]: [ ...state.comments[uParentId] ].map(c =>
            c.id !== uComment.id ? c : uComment
          )
        }
      }
    case REMOVE_COMMENT:
      const { rCommentId, rParentId } = action
      return {
        ...state,
        comments: {
          ...state.comments,
          [rParentId]: [ ...state.comments[rParentId] ].filter(c =>
            c.id !== rCommentId
          )
        }
      }
    default:
      return state
  }
}