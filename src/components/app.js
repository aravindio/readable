import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Header from './header'
import PostsList from './posts-list'
import PostView from './post-view'
import PostForm from './post-form'
import { fetchCategories, fetchPostsAndComments } from '../actions'

class App extends Component {
  componentWillMount() {
    const { fetchCategories, fetchPostsAndComments } = this.props
    fetchCategories()
    fetchPostsAndComments()
  }

  render() {
    return (
      <div className='app'>
        <Header categories={this.props.categories} />
        <Switch>
          <Route exact path='/' component={PostsList} />
          <Route exact path='/new/post' component={PostForm} />
          <Route exact path='/edit/post/:id' component={PostForm} />
          <Route exact path='/:category/:id' component={PostView} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPostsAndComments: () => dispatch(fetchPostsAndComments())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)