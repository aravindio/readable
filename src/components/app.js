import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import Header from './header'
import PostsList from './posts-list'
import Up from 'react-icons/lib/go/arrow-up'
import Down from 'react-icons/lib/go/arrow-down'
import User from 'react-icons/lib/fa/user'
import Clock from 'react-icons/lib/fa/clock-o'
import Pencil from 'react-icons/lib/fa/pencil'
import Trash from 'react-icons/lib/fa/trash'
import { fetchCategories, fetchPostsAndComments } from '../actions'

class App extends Component {
  componentWillMount() {
    const { fetchCategories, fetchPostsAndComments } = this.props
    fetchCategories()
    fetchPostsAndComments()
  }

  render() {
    const { categories, posts, comments } = this.props
    return (
      <div className='app'>
        <Header categories={categories} />
        <Switch>
          <Route exact path='/' component={PostsList} />
          <Route exact path='/:category/:id' render={({ match }) => {
            let post;
            if (posts)
              post = posts.find(p => p.id === match.params.id)
            return <div className='container'>
              <div className='full-post'>
                <div className='vote-score'>
                  <div>
                    <button><Up /></button>
                  </div>
                  <div>{post && post.voteScore}</div>
                  <div>
                    <button><Down /></button>
                  </div>
                </div>
                <div>
                  <h3><b>{post && post.title}</b></h3>
                  <p>{post && post.body}</p>
                </div>
                <span className='meta'>
                  <User /> <b>{post && post.author}</b>{' | '}
                  <Clock /> <span>{post && post.timestamp}</span>{' | '}
                  <Pencil />&nbsp;
                  <Link to={`/edit/post/${post && post.id}`}>Edit</Link>{' | '}
                  <Trash />&nbsp;
                  <Link to={`/delete/post/${post && post.id}`}>Delete</Link>
                </span>
              </div>
              <div className='comments-list'>
                <h5>
                  <b>
                    {
                        comments && comments[post.id] &&
                      `${comments[post.id].length} comment` +
                      `${comments[post.id].length === 1 ? '' : 's'}`
                    }
                  </b>
                </h5>
                <span className='sort-control'>
                  <label>Sort by:</label>
                  <select>
                    <option value='voteScore'>voteScore</option>
                    <option value='timestamp'>timestamp</option>
                  </select>
                </span>
                <ul>
                  {comments && comments[post.id]
                    && comments[post.id].length > 0
                    ? comments[post.id].map(comment => (
                        <li key={comment.id} className='comment'>
                          <div className='vote-score'>
                            <div>
                              <button><Up /></button>
                            </div>
                            <div>{comment.voteScore}</div>
                            <div>
                              <button><Down /></button>
                            </div>
                          </div>
                          <span className='meta'>
                            <User /> <b>{comment.author}</b>{' | '}
                            <Clock /> <span>{comment.timestamp}</span>
                          </span>
                          <div className='comment-body'>
                            <p>{comment.body}</p>
                          </div>
                          <span className='meta'>
                            <Pencil />{' '}
                            <button>Edit</button>{' | '}
                            <Trash />&nbsp;
                            <Link
                              to={`/delete/comment/${comment.id}`}
                            >
                              Delete
                            </Link>
                          </span>
                        </li>
                      ))
                    : <li className='comment empty-list'>
                        <b>Oops! No comments available for this post.</b>
                      </li>
                  }
                </ul>
              </div>
              <div className='inner-container'>
                <h4>
                  <b>Add comment</b>
                </h4>
                <form>
                  <label>Name</label>
                  <input
                    className='form-control'
                    type='text'
                    name='author'
                  />
                  <label>Comment</label>
                  <textarea
                    className='form-control'
                    name='body'
                  >
                  </textarea>
                  <button className='btn btn-primary' type='submit'>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          }} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories, comments }) {
  return {
    categories,
    posts: posts.posts,
    comments: comments.comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPostsAndComments: () => dispatch(fetchPostsAndComments())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)