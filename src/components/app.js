import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts, fetchComments } from '../actions'

class App extends Component {
  componentWillMount() {
    const { fetchCategories, fetchPosts } = this.props
    fetchCategories()
    fetchPosts()
  }

  componentWillReceiveProps(nextProps) {
    const { posts } = nextProps
    const { fetchComments } = this.props
    if (posts) {
      const postIds = posts.map(p => p.id)
      fetchComments(postIds)
    }
  }

  render() {
    return (
      <div className='app'>
        <h1 className='text-center'>Yo</h1>
      </div>
    )
  }
}

function mapStateToProps ({ posts }) {
  return { posts: posts.posts }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchComments: postIds => dispatch(fetchComments(postIds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)