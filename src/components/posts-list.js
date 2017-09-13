import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Up from 'react-icons/lib/go/arrow-up'
import Down from 'react-icons/lib/go/arrow-down'
import User from 'react-icons/lib/fa/user'
import Clock from 'react-icons/lib/fa/clock-o'
import Pencil from 'react-icons/lib/fa/pencil'
import Trash from 'react-icons/lib/fa/trash'

class PostsList extends Component {
  render() {
    const { posts, comments } = this.props
    return (
      <div className='container'>
        <div className='posts-list'>
          <Link to='/new/post' className='btn btn-primary btn-sm'>
            Add new post
          </Link>
          <span className='sort-control'>
            <label>Sort by:</label>
            <select>
              <option value='voteScore'>voteScore</option>
              <option value='timestamp'>timestamp</option>
            </select>
          </span>
          <ul>
            {posts && posts.length > 0
              ? posts.map(post => (
                  <li key={post.id} className='post'>
                    <div className='vote-score'>
                      <div>
                        <button><Up /></button>
                      </div>
                      <div>{post.voteScore}</div>
                      <div>
                        <button><Down /></button>
                      </div>
                    </div>
                    <div>
                      <Link to={`/${post.category + '/' + post.id}`}>
                        <h5>
                          <b>{post.title}</b>
                          <small>
                            &nbsp;
                            {
                              comments && comments[post.id]
                              && `(${comments[post.id].length} comment` +
                              `${comments[post.id].length === 1 ? '' : 's'})`
                            }
                          </small>
                        </h5>
                      </Link>
                    </div>
                    <span className='meta'>
                      <User /> <b>{post.author}</b>{' | '}
                      <Clock /> <span>{post.timestamp}</span>{' | '}
                      <Pencil />&nbsp;
                      <Link to={`/edit/post/${post.id}`}>Edit</Link>{' | '}
                      <Trash />&nbsp;
                      <Link to={`/delete/post/${post.id}`}>Delete</Link>
                    </span>
                  </li>
                ))
              : <li className='post empty-list'>
                  <b>Oops! There are no posts here.</b>
                </li>
            }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments }) {
  return {
    posts: posts.posts,
    comments: comments.comments
  }
}

export default connect(mapStateToProps)(PostsList)