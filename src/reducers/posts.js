import {
  SET_POSTS,
  SET_DEFAULT_POSTS_SORT,
  SORT_POSTS,
  VOTE_POST,
  NEW_POST,
  SET_POST_TO_EDIT,
  CLEAR_POST_TO_EDIT,
  UPDATE_POST
} from '../actions'

export default function posts (state = {}, action) {
  switch (action.type) {
    case SET_POSTS:
      const { posts } = action
      return {
        ...state,
        posts: posts.filter(p => !p.deleted)
      }
    case SET_DEFAULT_POSTS_SORT:
      return { ...state, defaultSort: 'voteScore' }
    case SORT_POSTS:
      return {
        ...state,
        defaultSort: action.option
      }
    case VOTE_POST:
      const { vId, vOption } = action
      return {
        ...state,
        posts: [ ...state.posts ].map(p => {
          if (p.id === vId) {
            if (vOption === 'upVote') {
              return { ...p, voteScore: p.voteScore + 1}
            } else if (vOption === 'downVote') {
              return { ...p, voteScore: p.voteScore - 1}
            }
          }
          return p
        })
      }
    case NEW_POST:
      const { post } = action
      return {
        ...state,
        posts: [ ...state.posts ].concat([ post ])
      }
    case SET_POST_TO_EDIT:
      const postToEdit = action.post
      return { ...state, postToEdit }
    case CLEAR_POST_TO_EDIT:
      return { ...state, postToEdit: null }
    case UPDATE_POST:
      const { uPost } = action
      return {
        ...state,
        posts: [ ...state.posts ].map(p => p.id === uPost.id ? uPost : p )
      }
    default:
      return state
  }
}