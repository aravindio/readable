import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import FullPost from './full-post'
import CommentsList from './comments-list'
import CommentForm from './comment-form'

class PostView extends Component {
  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.commentForm)
    node.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const { post, comments } = this.props
    return (
      <div className='container'>
        <FullPost post={post} />
        <CommentsList
          comments={comments}
          scrollToBottom={this.scrollToBottom}
        />
        <CommentForm
          postId={post && post.id}
          ref={f => this.commentForm = f}
        />
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