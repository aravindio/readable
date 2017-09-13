import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'

class App extends Component {
  componentWillMount() {
    const { fetchCategories } = this.props
    fetchCategories()
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
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(null, mapDispatchToProps)(App)