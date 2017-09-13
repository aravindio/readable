import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './header'
import PostsList from './posts-list'
import { fetchCategories, fetchPostsAndComments } from '../actions'

class App extends Component {
  componentWillMount() {
    const { fetchCategories, fetchPostsAndComments } = this.props
    fetchCategories()
    fetchPostsAndComments()
  }

  render() {
    const { categories } = this.props
    return (
      <div className='app'>
        <Header categories={categories} />
        <PostsList />
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories, comments }) {
  return { categories }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPostsAndComments: () => dispatch(fetchPostsAndComments())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)