import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Up from 'react-icons/lib/go/arrow-up'
import Down from 'react-icons/lib/go/arrow-down'
import User from 'react-icons/lib/fa/user'
import Clock from 'react-icons/lib/fa/clock-o'
import Pencil from 'react-icons/lib/fa/pencil'
import Trash from 'react-icons/lib/fa/trash'

class FullPost extends Component {
  render() {
    const { post } = this.props
    if (post)
      return (
        <div className='full-post'>
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
            <h3><b>{post.title}</b></h3>
            <p>{post.body}</p>
          </div>
          <span className='meta'>
            <User /> <b>{post.author}</b>{' | '}
            <Clock /> <span>{post.timestamp}</span>{' | '}
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

export default FullPost