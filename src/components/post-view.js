import React, { Component } from 'react'
import { connect } from 'react-redux'
import FullPost from './full-post'
import CommentsList from './comments-list'

class PostView extends Component {
  render() {
    const { post, comments } = this.props
    return (
      <div className='container'>
        <FullPost post={post} />
        <CommentsList comments={comments} />
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