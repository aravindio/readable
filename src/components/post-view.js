import React, { Component } from 'react'
import { connect } from 'react-redux'
import FullPost from './full-post'
import CommentsList from './comments-list'
import CommentForm from './comment-form'

class PostView extends Component {
  render() {
    const { post, comments } = this.props
    return (
      <div className='container'>
        <FullPost post={post} />
        <CommentsList comments={comments} />
        <CommentForm postId={post && post.id} />
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