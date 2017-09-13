import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Up from 'react-icons/lib/go/arrow-up'
import Down from 'react-icons/lib/go/arrow-down'
import User from 'react-icons/lib/fa/user'
import Clock from 'react-icons/lib/fa/clock-o'
import Pencil from 'react-icons/lib/fa/pencil'
import Trash from 'react-icons/lib/fa/trash'

class Comment extends Component {
  render() {
    const { comment } = this.props
    return (
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
          <Link to={`/delete/comment/${comment.id}`}>Delete</Link>
        </span>
      </li>
    )
  }
}

export default Comment