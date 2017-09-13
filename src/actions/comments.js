import * as API from '../utils/api'

export const SET_COMMENTS = 'SET_COMMENTS'

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