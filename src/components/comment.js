import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import { sendCommentVote } from '../actions'
import Up from 'react-icons/lib/go/arrow-up'
import Down from 'react-icons/lib/go/arrow-down'
import User from 'react-icons/lib/fa/user'
import Clock from 'react-icons/lib/fa/clock-o'
import Pencil from 'react-icons/lib/fa/pencil'
import Trash from 'react-icons/lib/fa/trash'

class Comment extends Component {
  render() {
    const { comment, sendCommentVote } = this.props
    return (
      <li key={comment.id} className='comment'>
        <div className='vote-score'>
          <div>
            <button onClick={() => sendCommentVote(comment.id, 'upVote')}>
              <Up />
            </button>
          </div>
          <div>{comment.voteScore}</div>
          <div>
            <button onClick={() => sendCommentVote(comment.id, 'downVote')}>
              <Down />
            </button>
          </div>
        </div>
        <span className='meta'>
          <User /> <b>{comment.author}</b>{' | '}
          <Clock /> <TimeAgo date={comment.timestamp} />
        </span>
        <div className='comment-body'>
          <p>{comment.body}</p>
        </div>
        <span className='meta'>
          <Pencil />{' '}
          <button>Edit</button>{' | '}
          <Trash />&nbsp;
          <Link to={`/delete/comment/${comment.id}`}>Delete</Link>
        </span>
      </li>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sendCommentVote: (id, option) => dispatch(sendCommentVote(id, option))
  }
}

export default connect(null, mapDispatchToProps)(Comment)