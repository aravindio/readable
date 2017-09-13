import React, { Component } from 'react'
import Comment from './comment'

class CommentsList extends Component {
  render() {
    const { comments } = this.props
    if (comments) {
      const commentsCount = `${comments.length} comment` +
                            `${comments.length === 1 ? '' : 's'}`
      return (
        <div className='comments-list'>
          <h5>
            <b>{commentsCount}</b>
          </h5>
          <span className='sort-control'>
            <label>Sort by:</label>
            <select>
              <option value='voteScore'>voteScore</option>
              <option value='timestamp'>timestamp</option>
            </select>
          </span>
          <ul>
            {comments.length > 0
              ? comments.map(comment => (
                  <Comment key={comment.id} comment={comment}/>
                ))
              : <li className='comment empty-list'>
                  <b>Oops! No comments available for this post.</b>
                </li>
            }
          </ul>
        </div>
      )
    }
    else
      return null
  }
}

export default CommentsList