import * as API from '../utils/api'
import { fetchComments, setDefaultCommentsSort } from './comments'

export const SET_POSTS = 'SET_POSTS'
export const SET_DEFAULT_POSTS_SORT = 'SET_DEFAULT_POSTS_SORT'
export const SORT_POSTS = 'SORT_POSTS'

export const setPosts = posts => ({
  type: SET_POSTS,
  posts
})

export const fetchPostsAndComments = () => dispatch => (
  API
    .getPosts()
    .then(posts => {
      dispatch(setPosts(posts))
      dispatch(setDefaultPostsSort())
      dispatch(fetchComments(posts.map(p => p.id)))
      dispatch(setDefaultCommentsSort())
    })
)

export const setDefaultPostsSort = () => ({
  type: SET_DEFAULT_POSTS_SORT
})

export const sortPosts = option => ({
  type: SORT_POSTS,
  option
})