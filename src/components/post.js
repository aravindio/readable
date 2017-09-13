import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import { sendPostVote } from '../actions'
import Up from 'react-icons/lib/go/arrow-up'
import Down from 'react-icons/lib/go/arrow-down'
import User from 'react-icons/lib/fa/user'
import Clock from 'react-icons/lib/fa/clock-o'
import Pencil from 'react-icons/lib/fa/pencil'
import Trash from 'react-icons/lib/fa/trash'

class Post extends Component {
  render() {
    const { post, commentCount, sendPostVote } = this.props
    const commentCountString = `(${commentCount} comment` +
                               `${commentCount === 1 ? '' : 's'})`
    return (
      <li className='post'>
        <div className='vote-score'>
          <div>
            <button onClick={e => sendPostVote(post.id, 'upVote')}>
              <Up />
            </button>
          </div>
          <div>{post.voteScore}</div>
          <div>
            <button onClick={e => sendPostVote(post.id, 'downVote')}>
              <Down />
            </button>
          </div>
        </div>
        <div>
          <Link to={`/${post.category + '/' + post.id}`}>
            <h5>
              <b>{post.title}</b>
              <small> {commentCountString}</small>
            </h5>
          </Link>
        </div>
        <span className='meta'>
          <User /> <b>{post.author}</b>{' | '}
          <Clock /> <TimeAgo date={post.timestamp} />{' | '}
          <Pencil />&nbsp;
          <Link to={`/edit/post/${post.id}`}>Edit</Link>{' | '}
          <Trash />&nbsp;
          <Link to={`/delete/post/${post.id}`}>Delete</Link>
        </span>
      </li>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sendPostVote: (id, option) => dispatch(sendPostVote(id, option))
  }
}

export default connect(null, mapDispatchToProps)(Post)