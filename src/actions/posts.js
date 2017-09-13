import * as API from '../utils/api'

export const SET_POSTS = 'SET_POSTS'

export const setPosts = posts => ({
  type: SET_POSTS,
  posts
})

export const fetchPosts = () => dispatch => (
  API
    .getPosts()
    .then(posts => dispatch(setPosts(posts)))
)