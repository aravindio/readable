import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import Post from './post'
import { sortPosts } from '../actions'

class PostsList extends Component {
  render() {
    const { comments, defaultSort, sortPosts, match } = this.props
    const { category } = match.params
    let { posts } = this.props

    if (posts) {
      if (category)
        posts = posts.filter(p => p.category === category)
      if (defaultSort)
        posts = posts.sort(sortBy(`-${defaultSort}`))

      return (
        <div className='container'>
          <div className='posts-list'>
            <Link
              to={`${category ? `/new/post/${category}` : '/new/post' }`}
              className='btn btn-primary btn-sm'
            >
              Add new post
            </Link>
            <span className='sort-control'>
              <label>Sort by:</label>
              <select
                value={defaultSort}
                onChange={e => sortPosts(e.target.value)}
                disabled={posts.length > 0 ? false : true}
              >
                <option value='voteScore'>voteScore</option>
                <option value='timestamp'>timestamp</option>
              </select>
            </span>
            <ul>
              {posts.length > 0
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
    return null
  }
}

function mapStateToProps ({ posts, comments }) {
  return {
    posts: posts.posts,
    comments: comments.comments,
    defaultSort: posts.defaultSort
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sortPosts: option => dispatch(sortPosts(option))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)