import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
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
        <Navbar inverse collapseOnSelect={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Readable</Link>
            </Navbar.Brand>
            {categories && <Navbar.Toggle />}
          </Navbar.Header>
          {categories && (
            <Navbar.Collapse>
              <Nav pullRight>
                {categories.map(c => (
                  <LinkContainer exact key={c.path} to={`/${c.path}`}>
                    <NavItem>{c.name}</NavItem>
                  </LinkContainer>
                ))}
              </Nav>
            </Navbar.Collapse>
          )}
        </Navbar>
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