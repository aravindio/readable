import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Header from './header'
import PostsList from './posts-list'
import PostView from './post-view'
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
          <Route exact path='/new/post' render={() => (
            <div className='container'>
              <div className='inner-container'>
                <h3><b>Add post</b></h3>
                <form>
                  <label>Title</label>
                  <input
                    className='form-control'
                    type='text'
                    name='title'
                  />
                  <label>Author</label>
                  <input
                    className='form-control'
                    type='text'
                    name='author'
                  />
                  <label>Category</label><br/>
                  <select name='category'>
                    {this.props.categories && this.props.categories.map(c => (
                      <option
                        key={c.path}
                        value={c.path}
                      >
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <br/>
                  <label>Post</label>
                  <textarea
                    className='form-control'
                    name='body'
                  >
                  </textarea>
                  <button className='btn btn-primary' type='submit'>Submit</button>
                </form>
              </div>
            </div>
          )} />
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