import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FullPost from './full-post'
import Up from 'react-icons/lib/go/arrow-up'
import Down from 'react-icons/lib/go/arrow-down'
import User from 'react-icons/lib/fa/user'
import Clock from 'react-icons/lib/fa/clock-o'
import Pencil from 'react-icons/lib/fa/pencil'
import Trash from 'react-icons/lib/fa/trash'

class PostView extends Component {
  render() {
    const { post, comments } = this.props
    return (
      <div className='container'>
        <FullPost post={post} />
        <div className='comments-list'>
          <h5>
            <b>
              {
                comments &&
                `${comments.length} comment` +
                `${comments.length === 1 ? '' : 's'}`
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
            {comments && comments.length > 0
              ? comments.map(comment => (
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
    )
  }
}

function mapStateToProps ({ posts, comments }, { match }) {
  posts = posts.posts
  comments = comments.comments
  const { id } = match.params
  return {
    post: posts && posts.find(p => p.id === id),
    comments: comments && comments[id]
  }
}

export default connect(mapStateToProps)(PostView)