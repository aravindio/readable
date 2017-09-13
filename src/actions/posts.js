import * as API from '../utils/api'
import { fetchComments } from './comments'

export const SET_POSTS = 'SET_POSTS'

export const setPosts = posts => ({
  type: SET_POSTS,
  posts
})

export const fetchPostsAndComments = () => dispatch => (
  API
    .getPosts()
    .then(posts => {
      dispatch(setPosts(posts))
      dispatch(fetchComments(posts.map(p => p.id)))
    })
)