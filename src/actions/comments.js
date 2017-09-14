import * as API from '../utils/api'

export const SET_COMMENTS = 'SET_COMMENTS'
export const SET_DEFAULT_COMMENTS_SORT = 'SET_DEFAULT_COMMENTS_SORT'
export const SORT_COMMENTS = 'SORT_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const NEW_COMMENT = 'NEW_COMMENT'
export const SET_COMMENT_TO_EDIT = 'SET_COMMENT_TO_EDIT'
export const CLEAR_COMMENT_TO_EDIT = 'CLEAR_COMMENT_TO_EDIT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

export const setComments = (postId, comments) => ({
  type: SET_COMMENTS,
  postId,
  comments
})

export const fetchComments = postIds => dispatch => (
  postIds.forEach(id =>
    API
      .getComments(id)
      .then(comments => dispatch(setComments(id, comments)))
  )
)

export const setDefaultCommentsSort = () => ({
  type: SET_DEFAULT_COMMENTS_SORT
})

export const sortComments = option => ({
  type: SORT_COMMENTS,
  option
})

export const voteComment = (vCommentid, vParentId, vOption) => ({
  type: VOTE_COMMENT,
  vCommentid,
  vParentId,
  vOption
})

export const sendCommentVote = (id, option) => dispatch => (
  API
    .voteComment(id, option)
    .then(comment => dispatch(voteComment(id, comment.parentId, option)))
)

export const newComment = (nParentId, nComment) => ({
  type: NEW_COMMENT,
  nParentId,
  nComment
})

export const submitComment = data => dispatch => (
  API
    .setComment(data)
    .then(comment => dispatch(newComment(comment.parentId, comment)))
)

export const setCommentToEdit = comment => ({
  type: SET_COMMENT_TO_EDIT,
  comment
})

export const fetchComment = id => dispatch => (
  API
    .getComment(id)
    .then(comment => dispatch(setCommentToEdit(comment)))
)

export const clearCommentToEdit = () => ({
  type: CLEAR_COMMENT_TO_EDIT
})

export const updateComment = (uParentId, uComment) => ({
  type: UPDATE_COMMENT,
  uParentId,
  uComment
})

export const editComment = (id, data) => dispatch => (
  API
    .editComment(id, data)
    .then(comment => dispatch(updateComment(comment.parentId, comment)))
)