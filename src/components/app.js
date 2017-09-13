import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './header'
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
    const { categories } = this.props
    return (
      <div className='app'>
        <Header categories={categories} />
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }) {
  return {
    posts: posts.posts,
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchComments: postIds => dispatch(fetchComments(postIds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)