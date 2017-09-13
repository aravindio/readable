import * as API from '../utils/api'

export const SET_COMMENTS = 'SET_COMMENTS'
export const SET_DEFAULT_COMMENTS_SORT = 'SET_DEFAULT_COMMENTS_SORT'

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