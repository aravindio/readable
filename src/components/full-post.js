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

class FullPost extends Component {
  render() {
    const { post, sendPostVote } = this.props
    if (post)
      return (
        <div className='full-post'>
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
            <h3><b>{post.title}</b></h3>
            <p>{post.body}</p>
          </div>
          <span className='meta'>
            <User /> <b>{post.author}</b>{' | '}
            <Clock /> <TimeAgo date={post.timestamp} />{' | '}
            <Pencil />&nbsp;
            <Link to={`/edit/post/${post.id}`}>Edit</Link>{' | '}
            <Trash />&nbsp;
            <Link to={`/delete/post/${post.id}`}>Delete</Link>
          </span>
        </div>
      )
    else
      return null
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sendPostVote: (id, option) => dispatch(sendPostVote(id, option))
  }
}

export default connect(null, mapDispatchToProps)(FullPost)