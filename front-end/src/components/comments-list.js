import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import Comment from './comment'
import { sortComments } from '../actions'

class CommentsList extends Component {
  render() {
    const { defaultSort, sortComments, scrollToBottom } = this.props
    let { comments } = this.props
    if (comments) {
      const commentsCount = `${comments.length} comment` +
                            `${comments.length === 1 ? '' : 's'}`
      if (defaultSort)
        comments = comments.sort(sortBy(`-${defaultSort}`))
      return (
        <div className='comments-list'>
          <h5>
            <b>{commentsCount}</b>
          </h5>
          <span className='sort-control'>
            <label>Sort by:</label>
            <select
              value={defaultSort}
              onChange={e => sortComments(e.target.value)}
              disabled={comments.length > 0 ? false : true}
            >
              <option value='voteScore'>voteScore</option>
              <option value='timestamp'>timestamp</option>
            </select>
          </span>
          <ul>
            {comments.length > 0
              ? comments.map(comment => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    scrollToBottom={scrollToBottom}
                  />
                ))
              : <li className='comment empty-list'>
                  <b>Oops! No comments available for this post.</b>
                </li>
            }
          </ul>
        </div>
      )
    }
    return null
  }
}

function mapStateToProps ({ comments }) {
  return {
    defaultSort: comments.defaultSort
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sortComments: option => dispatch(sortComments(option))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList)