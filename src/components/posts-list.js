import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Post from './post'

class PostsList extends Component {
  render() {
    const { posts, comments } = this.props
    return (
      <div className='container'>
        <div className='posts-list'>
          <Link to='/new/post' className='btn btn-primary btn-sm'>
            Add new post
          </Link>
          <span className='sort-control'>
            <label>Sort by:</label>
            <select>
              <option value='voteScore'>voteScore</option>
              <option value='timestamp'>timestamp</option>
            </select>
          </span>
          <ul>
            {posts && posts.length > 0
              ? posts.map(post => {
                  let postProps = { post, key: post.id }
                  if (comments && comments[post.id])
                    postProps.commentCount = comments[post.id].length
                  return <Post { ...postProps }/>
                })
              : <li className='post empty-list'>
                  <b>Oops! There are no posts here.</b>
                </li>
            }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments }) {
  return {
    posts: posts.posts,
    comments: comments.comments
  }
}

export default connect(mapStateToProps)(PostsList)