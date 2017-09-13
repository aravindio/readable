import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts } from '../actions'

class App extends Component {
  componentWillMount() {
    const { fetchCategories, fetchPosts } = this.props
    fetchCategories()
    fetchPosts()
  }

  render() {
    return (
      <div className='app'>
        <h1 className='text-center'>Yo</h1>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(null, mapDispatchToProps)(App)