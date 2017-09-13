import * as API from '../utils/api'
import { fetchComments, setDefaultCommentsSort } from './comments'

export const SET_POSTS = 'SET_POSTS'
export const SET_DEFAULT_POSTS_SORT = 'SET_DEFAULT_POSTS_SORT'
export const SORT_POSTS = 'SORT_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const NEW_POST = 'NEW_POST'
export const SET_POST_TO_EDIT = 'SET_POST_TO_EDIT'
export const CLEAR_POST_TO_EDIT = 'CLEAR_POST_TO_EDIT'
export const UPDATE_POST = 'UPDATE_POST'

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

export const votePost = (vId, vOption) => ({
  type: VOTE_POST,
  vId,
  vOption
})

export const sendPostVote = (id, option) => dispatch => (
  API
    .votePost(id, option)
    .then(post => dispatch(votePost(id, option)))
)

export const newPost = post => ({
  type: NEW_POST,
  post
})

export const submitPost = data => dispatch => (
  API
    .setPost(data)
    .then(post => {
      dispatch(newPost(post))
      dispatch(fetchComments([ post.id ]))
    })
)

export const setPostToEdit = post => ({
  type: SET_POST_TO_EDIT,
  post
})

export const fetchPost = id => dispatch => (
  API
    .getPost(id)
    .then(post => dispatch(setPostToEdit(post)))
)

export const clearPostToEdit = () => ({
  type: CLEAR_POST_TO_EDIT
})

export const updatePost = uPost => ({
  type: UPDATE_POST,
  uPost
})

export const editPost = (id, data) => dispatch => (
  API
    .editPost(id, data)
    .then(post => dispatch(updatePost(post)))
)